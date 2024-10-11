package com.nienluan.webshop.dto.response;

import com.nienluan.webshop.entity.Product;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BrandResponse {
    String id;
    String name;
}
