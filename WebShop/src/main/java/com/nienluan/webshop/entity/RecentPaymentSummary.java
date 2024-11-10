package com.nienluan.webshop.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Table(name = "t_recent_payment_summary")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RecentPaymentSummary {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String paymentMethodId;
    private LocalDate date;
    private BigDecimal totalAmount;
    private Long totalCount;
    private LocalDateTime createdAt;
}
