package com.nienluan.webshop.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
@Builder
@Getter
@Setter
public class PaymentSummary {
    private String paymentMethodId;
    private LocalDate date;
    private BigDecimal totalAmount;
    private Long totalCount;
    public PaymentSummary(String paymentMethodId, LocalDate date, BigDecimal totalAmount, Long count) {
        this.paymentMethodId = paymentMethodId;
        this.date= date;
        this.totalAmount = totalAmount;
        this.totalCount = count;
    }
}
