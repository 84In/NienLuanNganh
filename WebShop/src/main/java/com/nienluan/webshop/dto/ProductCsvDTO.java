package com.nienluan.webshop.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductCsvDTO {

    String name;
    String description;
    BigDecimal price;
    BigDecimal stock_quantity;
    String images;
    String brandName;

}
