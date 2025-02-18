package com.nienluan.webshop.entity;

import com.nienluan.webshop.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "t_products")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String name;
    String description;
    BigDecimal price;
    BigDecimal stockQuantity;
    @Builder.Default
    BigDecimal sold = BigDecimal.valueOf(0);
    String images;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    Category category;

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    Brand brand;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "t_products_promotions",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "promotion_id")
    )
    Set<Promotion> promotions = new HashSet<>();

    @OneToMany(mappedBy = "product")
    List<OrderDetail> orderDetails = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    List<CartDetail> cartDetails = new ArrayList<>();

    @OneToMany(mappedBy = "product")
    List<Review> reviews = new ArrayList<>();
}
