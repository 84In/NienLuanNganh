package com.nienluan.webshop.dto.response;

import com.nienluan.webshop.common.BaseResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse extends BaseResponse {
    String id;
    String shippingAddress;
    BigDecimal totalAmount;
    StatusOrderResponse status;
    PaymentMethodResponse paymentMethod;
    PaymentResponse payment;
    UserResponse user;
    List<OrderDetailResponse> orderDetails;
}
