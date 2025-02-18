package com.nienluan.webshop.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentRequest {
    BigDecimal amount;
    Long zpTransId;
    Long refundId;
    String status;
    LocalDateTime paymentDate;
}
