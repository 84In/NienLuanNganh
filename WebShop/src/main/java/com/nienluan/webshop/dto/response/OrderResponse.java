package com.nienluan.webshop.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigInteger;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {
    String id;
    String shippingAddress;
    BigInteger totalAmount;
    StatusOrderResponse status;
    PaymentMethodResponse paymentMethod;
    PaymentResponse payment;
    UserResponse user;
    Set<OrderDetailResponse> orderDetails;
}
