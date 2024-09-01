package com.nienluan.webshop.entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "t_images")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String dataImage;
    String mineType;

    @ManyToOne
    @JoinColumn(name = "product_id") // Cột khóa ngoại trong bảng Image
    Product product; // Một sản phẩm duy nhất

    @ManyToOne
    @JoinColumn(name = "category_id") // Cột khóa ngoại trong bảng Image
    Category category; // Một danh mục duy nhất
}
