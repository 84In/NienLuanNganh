package com.nienluan.webshop.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.time.LocalDate;

@Entity
@Setter
@Getter
@Table(name = "t_promotions")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String code;
    String name;
    String description;
    Integer discountPercentage;
    LocalDate startDate;
    LocalDate endDate;
    BigDecimal stockQuantity;
}
