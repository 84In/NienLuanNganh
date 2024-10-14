package com.nienluan.webshop.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderRequest {
    String shippingAddress;
    BigDecimal totalAmount;
    String paymentMethod;
    String payment;
    List<OrderDetailRequest> orderDetails;
}
