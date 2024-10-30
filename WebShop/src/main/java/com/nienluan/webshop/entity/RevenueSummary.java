package com.nienluan.webshop.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "t_revenue_summary")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RevenueSummary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "date_range_type", nullable = false)
    String dateRangeType;

    @Column(name = "summary_date", nullable = false)
    LocalDate summaryDate;

    @Column(name = "total_revenue")
    Long totalRevenue;


}
