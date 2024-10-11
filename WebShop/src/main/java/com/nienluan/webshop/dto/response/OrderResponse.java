package com.nienluan.webshop.dto.response;

import com.nienluan.webshop.common.BaseEntity;
import com.nienluan.webshop.common.BaseResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.math.BigInteger;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse extends BaseResponse {
    String id;
    String shippingAddress;
    BigInteger totalAmount;
    StatusOrderResponse status;
    PaymentMethodResponse paymentMethod;
    PaymentResponse payment;
    UserResponse user;
    Set<OrderDetailResponse> orderDetails;
}
