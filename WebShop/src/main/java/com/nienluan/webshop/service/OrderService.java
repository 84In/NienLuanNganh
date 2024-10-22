package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.OrderDetailRequest;
import com.nienluan.webshop.dto.request.OrderRequest;
import com.nienluan.webshop.dto.response.OrderDetailResponse;
import com.nienluan.webshop.dto.response.OrderResponse;
import com.nienluan.webshop.entity.*;
import com.nienluan.webshop.exception.AppException;
import com.nienluan.webshop.exception.ErrorCode;
import com.nienluan.webshop.mapper.*;
import com.nienluan.webshop.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class OrderService {

    OrderStatusRepository statusOrderRepository;
    OrderRepository orderRepository;
    PaymentRepository paymentRepository;
    PaymentMethodRepository paymentMethodRepository;
    ProductRepository productRepository;
    UserRepository userRepository;
    OrderDetailRepository orderDetailRepository;
    OrderStatusMapper orderStatusMapper;
    UserMapper userMapper;
    PaymentMapper paymentMapper;
    PaymentMethodMapper paymentMethodMapper;
    ProductMapper productMapper;
    CartRepository cartRepository;
    OrderRecipientRepository orderRecipientRepository;
    OrderRecipientMapper orderRecipientMapper;
    MailService mailService;

    @Transactional
    public OrderResponse createOrderWithCash(OrderRequest request) {
        String pendingStatusOrder = "pending";

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        OrderStatus orderStatus = statusOrderRepository.findByCodeName(pendingStatusOrder);
        PaymentMethod paymentMethod = paymentMethodRepository.findByCodeName(request.getPaymentMethod());
        OrderRecipient recipient = orderRecipientRepository
                .findByFullNameAndPhoneAndAddress(
                        request.getRecipient().getFullName().trim(),
                        request.getRecipient().getPhone(),
                        request.getRecipient().getAddress().trim()
                )
                .orElseGet(() -> {
                    return orderRecipientRepository.save(orderRecipientMapper.toOrderRecipient(request.getRecipient()));
                });

        //Kiểm tra OrderDetail trước khi thêm Order
        List<OrderDetail> orderDetails = new ArrayList<>();
        for (OrderDetailRequest orderDetailRequest : request.getOrderDetails()) {
            Product product = productRepository.findById(orderDetailRequest.getProductId())
                    .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));

            // Kiểm tra số lượng sản phẩm có đủ tồn kho không
            BigDecimal orderQuantity = orderDetailRequest.getQuantity();
            if (product.getStockQuantity().compareTo(orderQuantity) < 0) {
                throw new AppException(ErrorCode.PRODUCT_OUT_OF_STOCK);
            }

            orderDetails.add(OrderDetail.builder()
                    .product(product)
                    .priceAtTime(orderDetailRequest.getPriceAtTime())
                    .quantity(orderQuantity)
                    .build());
        }

        Order order = Order.builder()
                .totalAmount(request.getTotalAmount())
                .recipient(recipient)
                .status(orderStatus)
                .paymentMethod(paymentMethod)
                .user(user)
                .createdAt(LocalDateTime.now())
                .build();

        //Lưu đơn hàng
        order = orderRepository.save(order);
        var cart = cartRepository.existsByUser(user)
                ? cartRepository.findByUser(user)
                : Cart.builder().user(user).cartDetails(new ArrayList<>()).build();
        for (OrderDetail orderDetail : orderDetails) {
            Product product = orderDetail.getProduct();
            //Cập nhật số lượng trong kho
            product.setStockQuantity(product.getStockQuantity().subtract(orderDetail.getQuantity()));
            productRepository.save(product);

            //Liên kết OrderDetail với Order và lưu vào DB
            orderDetail.setOrder(order);
            orderDetailRepository.save(orderDetail);

            cart.getCartDetails().removeIf(cartDetail ->
                    cartDetail.getProduct().getId().equals(product.getId()) &&
                            cartDetail.getQuantity().compareTo(orderDetail.getQuantity()) == 0
            );
        }
        order.setOrderDetails(orderDetails);
        orderRepository.save(order);
        cartRepository.save(cart);
        //Gửi mail khi tạo thành công đơn hàng
        mailService.sendOrderConfirmationEmail(order.getUser().getEmail(), order);

        return toOrderResponse(order, orderDetails);
    }

    public OrderResponse getOrder(String orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_EXISTED));
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrder(order);
        return toOrderResponse(order, orderDetails);
    }

    public Page<OrderResponse> getOrderCurrentUser(Pageable pageable, String status, String search) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Pageable sortedByDate = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "createdAt"));

        OrderStatus orderStatus = (status != null && !status.isEmpty())
                ? statusOrderRepository.findByCodeName(status)
                : null;
        String searchValue = (search != null && !search.isEmpty()) ? search : null;

        Page<Order> ordersPage = orderRepository.findByUserAndStatusAndSearch(user, orderStatus, searchValue, sortedByDate);

        return ordersPage.map(order -> {
            List<OrderDetail> orderDetails = orderDetailRepository.findByOrder(order);
            return toOrderResponse(order, orderDetails);
        });
    }


    public Page<OrderResponse> getAllOrders(Pageable pageable) {
        List<Order> orders = orderRepository.findAll();

        List<OrderResponse> orderResponses = orders.stream()
                .map(order -> {
                    List<OrderDetail> orderDetails = orderDetailRepository.findByOrder(order);
                    return toOrderResponse(order, orderDetails);
                })
                .collect(Collectors.toList());
        return new PageImpl<>(orderResponses, pageable, orders.size());
    }

    public OrderResponse changeOrderStatus(String id, String statusCodeName) {
        String canceledStatus = "canceled";

        var order = orderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_EXISTED));
        var status = statusOrderRepository.findByCodeName(statusCodeName);
        order.setStatus(status);
        if (status.getCodeName().equals(canceledStatus)) {
            for (OrderDetail orderDetail : order.getOrderDetails()) {
                Product product = orderDetail.getProduct();
                //Cập nhật số lượng trong kho
                product.setStockQuantity(product.getStockQuantity().add(orderDetail.getQuantity()));
                productRepository.save(product);
            }
            //Xử lý refund tiền trên thanh toán điện tử
        }
        orderRepository.save(order);
        return toOrderResponse(order, order.getOrderDetails());
    }

    private OrderResponse toOrderResponse(Order order, List<OrderDetail> orderDetails) {
        List<OrderDetailResponse> orderDetailResponses = orderDetails.stream()
                .map(orderDetail -> OrderDetailResponse.builder()
                        .priceAtTime(orderDetail.getPriceAtTime())
                        .product(productMapper.toProductResponse(orderDetail.getProduct()))
                        .quantity(orderDetail.getQuantity())
                        .build())
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .id(order.getId())
                .totalAmount(order.getTotalAmount())
                .recipient(orderRecipientMapper.toOrderRecipientResponse(order.getRecipient()))
                .status(orderStatusMapper.toOrderStatusResponse(order.getStatus()))
                .payment(paymentMapper.toPaymentResponse(order.getPayment()))
                .paymentMethod(paymentMethodMapper.toPaymentMethodResponse(order.getPaymentMethod()))
                .user(userMapper.toUserResponse(order.getUser()))
                .orderDetails(orderDetailResponses)
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .build();
    }

}

