package com.nienluan.webshop.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RecentPaymentSummaryResponse {
    String id;
    String paymentMethodId;
    LocalDate date;
    BigDecimal totalAmount;
    Long totalCount;
    LocalDateTime createdAt;
}
