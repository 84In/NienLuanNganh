package com.nienluan.webshop.dto.response;

import com.nienluan.webshop.entity.Brand;
import com.nienluan.webshop.entity.Category;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductResponse {
    String id;
    String name;
    String description;
    BigDecimal price;
    BigDecimal stockQuantity;
    CategoryResponse category;
    BrandResponse brand;
    String images;
    Set<PromotionResponse> promotions;
}
