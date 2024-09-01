package com.nienluan.webshop.dto.response;


import com.nienluan.webshop.entity.Category;
import com.nienluan.webshop.entity.Product;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ImageResponse {

    String id;

    String dataImage;

    String mineType;

    Product product;

    Category category;
}
