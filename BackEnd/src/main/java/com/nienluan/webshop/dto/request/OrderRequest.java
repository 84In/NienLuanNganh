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
    BigDecimal totalAmount;
    OrderRecipientRequest recipient;
    String paymentMethod;
    String payment;
    List<OrderDetailRequest> orderDetails;
}
