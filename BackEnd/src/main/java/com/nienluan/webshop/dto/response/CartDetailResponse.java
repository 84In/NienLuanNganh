package com.nienluan.webshop.dto.response;

import com.nienluan.webshop.entity.Product;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartDetailResponse {
    ProductResponse product;
    BigDecimal quantity;
}
