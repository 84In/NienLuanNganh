package com.nienluan.webshop.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PromotionRequest {
    String code;
    String name;
    String description;
    Integer discountPercentage;
    LocalDate startDate;
    LocalDate endDate;
    BigDecimal stockQuantity;
}
