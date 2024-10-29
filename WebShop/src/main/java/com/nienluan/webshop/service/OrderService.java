package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.OrderDetailRequest;
import com.nienluan.webshop.dto.request.OrderRequest;
import com.nienluan.webshop.dto.response.OrderDetailResponse;
import com.nienluan.webshop.dto.response.OrderResponse;
import com.nienluan.webshop.dto.response.VNPayResponse;
import com.nienluan.webshop.entity.*;
import com.nienluan.webshop.exception.AppException;
import com.nienluan.webshop.exception.ErrorCode;
import com.nienluan.webshop.mapper.*;
import com.nienluan.webshop.repository.*;
import com.nienluan.webshop.utils.VNPayUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
    VNPayService vnPayService;
    private final OrderStatusRepository orderStatusRepository;

    @Transactional
    public OrderResponse createOrderWithCash(OrderRequest request) {

        Order order = createOrder(request);
        //Gửi mail khi tạo thành công đơn hàng
        mailService.sendOrderConfirmationEmail(order.getUser().getEmail(), order);

        return toOrderResponse(order, order.getOrderDetails());
    }

    public VNPayResponse createVNPayPayment(HttpServletRequest request, OrderRequest orderRequest) {
        Order order = createOrder(orderRequest);

        long amount = Long.parseLong(request.getParameter("amount")) * 100L;
        String bankCode = request.getParameter("bankCode");
        Map<String, String> vnpParamsMap = vnPayService.getVNPayConfig();
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
        vnpParamsMap.put("vnp_TxnRef", order.getId());
        vnpParamsMap.put("vnp_OrderInfo", "Thanh toán đơn hàng:" + order.getId());
        if (bankCode != null && !bankCode.isEmpty()) {
            vnpParamsMap.put("vnp_BankCode", bankCode);
        }
        vnpParamsMap.put("vnp_IpAddr", VNPayUtils.getIpAddress(request));
        //Build query url
        String queryUrl = VNPayUtils.getPaymentURL(vnpParamsMap, true);
        String hashData = VNPayUtils.getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = VNPayUtils.hmacSHA512(vnPayService.getSecretKey(), hashData);
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
        String paymentUrl = vnPayService.getVnp_PayUrl() + "?" + queryUrl;

        return VNPayResponse.builder()
                .paymentUrl(paymentUrl)
                .build();
    }

    @Transactional
    public OrderResponse createOrderWithVNPay(Order order, String status, String paymentStatus) {

        Payment payment = Payment.builder()
                .amount(order.getTotalAmount())
                .paymentDate(order.getCreatedAt())
                .status(paymentStatus)
                .build();
        payment = paymentRepository.save(payment);

        order.setPayment(payment);
        changeOrderStatus(order.getId(), status);

        orderRepository.save(order);
        //Gửi mail khi tạo thành công đơn hàng
        if (paymentStatus.equals("Success")) {
            mailService.sendOrderConfirmationEmail(order.getUser().getEmail(), order);
        }
        return toOrderResponse(order, order.getOrderDetails());
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


    public Page<OrderResponse> getAllOrders(String codeName, Pageable pageable) {
        Page<Order> orderPage;

        if (codeName == null || codeName.isEmpty()) {
            // Trả về tất cả nếu codename trống hoặc null
            orderPage = orderRepository.findAll(pageable);
        } else {
            orderPage = orderRepository.findByStatusCodeName(codeName, pageable);
        }

        List<OrderResponse> orderResponses = orderPage.getContent().stream()
                .map(order -> {
                    List<OrderDetail> orderDetails = orderDetailRepository.findByOrder(order);
                    return toOrderResponse(order, orderDetails);
                })
                .collect(Collectors.toList());

        return new PageImpl<>(orderResponses, pageable, orderPage.getTotalElements());
    }


    public OrderResponse changeOrderStatus(String id, String statusCodeName) {
        String cancelledStatus = "cancelled";
        String completedStatus = "completed";

        var order = orderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_EXISTED));
        var status = statusOrderRepository.findByCodeName(statusCodeName);
        order.setStatus(status);
        if (status.getCodeName().equals(cancelledStatus)) {
            for (OrderDetail orderDetail : order.getOrderDetails()) {
                Product product = orderDetail.getProduct();
                //Cập nhật số lượng trong kho
                product.setStockQuantity(product.getStockQuantity().add(orderDetail.getQuantity()));
                productRepository.save(product);
            }
            //Xử lý refund tiền trên thanh toán điện tử
        } else {
            if (status.getCodeName().equals(completedStatus)) {
                //Thêm số lượng đã bán cho sản phẩm nếu đơn hàng hoàn tất
                for (OrderDetail orderDetail : order.getOrderDetails()) {
                    Product product = orderDetail.getProduct();
                    product.setSold(product.getSold().add(orderDetail.getQuantity()));
                    productRepository.save(product);
                }
            }
        }
        orderRepository.save(order);
        return toOrderResponse(order, order.getOrderDetails());
    }

    public OrderResponse toOrderResponse(Order order, List<OrderDetail> orderDetails) {
        List<OrderDetailResponse> orderDetailResponses = orderDetails.stream()
                .map(orderDetail -> OrderDetailResponse.builder()
                        .priceAtTime(orderDetail.getPriceAtTime())
                        .product(productMapper.toProductResponse(orderDetail.getProduct()))
                        .quantity(orderDetail.getQuantity())
                        .reviewed(orderDetail.isReviewed())
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

    @Transactional
    public Order createOrder(OrderRequest request) {
        String pendingOrderStatus = "pending";

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        OrderStatus orderStatus = statusOrderRepository.findByCodeName(pendingOrderStatus);
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
        return order;
    }

    public Long getTotalAmountInDate(LocalDate date) {
        Long totalAmountByDate = orderRepository.findTotalAmountByDate(date).longValue();
        return totalAmountByDate;
    }

    public Long getTotalAmountCurrentMonth() {
        Long totalAmountByMonth = orderRepository.findTotalRevenueForCurrentMonth().longValue();
        return totalAmountByMonth;
    }

}
    
