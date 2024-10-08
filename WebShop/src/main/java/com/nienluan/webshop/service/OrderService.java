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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class OrderService {

    StatusOrderRepository statusOrderRepository;
    OrderRepository orderRepository;
    PaymentRepository paymentRepository;
    PaymentMethodRepository paymentMethodRepository;
    ProductRepository productRepository;
    UserRepository userRepository;
    OrderDetailRepository orderDetailRepository;
    StatusOrderMapper statusOrderMapper;
    UserMapper userMapper;
    PaymentMapper paymentMapper;
    PaymentMethodMapper paymentMethodMapper;
    ProductMapper productMapper;

    public OrderResponse createOrder(OrderRequest request) {
        StatusOrder statusOrder = statusOrderRepository.findById(request.getStatus())
                .orElseThrow(() -> new AppException(ErrorCode.STATUS_ORDER_NOT_EXISTED));
        PaymentMethod paymentMethod = paymentMethodRepository.findById(request.getPaymentMethod())
                .orElseThrow(() -> new AppException(ErrorCode.PAYMENT_METHOD_NOT_EXISTED));
        Payment payment = paymentRepository.findById(request.getPayment())
                .orElseThrow(() -> new AppException(ErrorCode.PAYMENT_NOT_EXISTED));
        User user = userRepository.findByUsername(request.getUser())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Order order = Order.builder()
                .shippingAddress(request.getShippingAddress())
                .totalAmount(request.getTotalAmount())
                .status(statusOrder)
                .paymentMethod(paymentMethod)
                .payment(payment)
                .user(user)
                .build();

        //Lưu đơn hàng
        order = orderRepository.save(order);
        List<OrderDetail> products = new ArrayList<>();
        //Tạo và lưu chi tiết đơn hàng
        for (OrderDetailRequest productRequest : request.getOrderDetails()) {
            Product product = productRepository.findById(productRequest.getProduct())
                    .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));

            // Kiểm tra số lượng sản phẩm có đủ tồn kho không
            BigDecimal orderQuantity = productRequest.getQuantity();
            if (product.getStockQuantity().compareTo(orderQuantity) < 0) {
                throw new AppException(ErrorCode.PRODUCT_OUT_OF_STOCK);
            }

            // Cập nhật số lượng tồn kho
            product.setStockQuantity(product.getStockQuantity().subtract(orderQuantity));
            productRepository.save(product);

            // Tạo chi tiết đơn hàng
            OrderDetail orderDetail = OrderDetail.builder()
                    .order(order)
                    .product(product)
                    .quantity(productRequest.getQuantity())
                    .build();

            // Lưu chi tiết đơn hàng
            OrderDetail orderDetailResponse = orderDetailRepository.save(orderDetail);

            products.add(orderDetailResponse);
        }
        //Trả về phản hồi cho người dùng

        return toOrderResponse(order, products);
    }

    public OrderResponse getOrder(String orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_EXISTED));

        List<OrderDetail> orderDetails = orderDetailRepository.findByOrder(order);

        return toOrderResponse(order, orderDetails);
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

    private OrderResponse toOrderResponse(Order order, List<OrderDetail> orderDetails) {
        List<OrderDetailResponse> orderDetailResponses = orderDetails.stream()
                .map(orderDetail -> OrderDetailResponse.builder()
                        .product(productMapper.toProductResponse(orderDetail.getProduct()))
                        .quantity(orderDetail.getQuantity())
                        .build())
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .id(order.getId())
                .shippingAddress(order.getShippingAddress())
                .totalAmount(order.getTotalAmount())
                .status(statusOrderMapper.toStatusOrderResponse(order.getStatus()))
                .payment(paymentMapper.toPaymentResponse(order.getPayment()))
                .paymentMethod(paymentMethodMapper.toPaymentMethodResponse(order.getPaymentMethod()))
                .user(userMapper.toUserResponse(order.getUser()))
                .orderDetails(orderDetailResponses)
                .build();
    }

}

