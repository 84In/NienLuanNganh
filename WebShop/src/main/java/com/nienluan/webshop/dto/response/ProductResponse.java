package com.nienluan.webshop.dto.response;

import com.nienluan.webshop.common.BaseResponse;
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
public class ProductResponse extends BaseResponse {
    String id;
    String name;
    String description;
    BigDecimal price;
    BigDecimal stockQuantity;
    BigDecimal sold;
    CategoryResponse category;
    BrandResponse brand;
    String images;
    Set<PromotionResponse> promotions;
}
