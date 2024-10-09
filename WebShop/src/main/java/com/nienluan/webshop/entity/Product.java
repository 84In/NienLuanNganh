package com.nienluan.webshop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "t_products")
@Getter
@Setter
@EqualsAndHashCode
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String name;
    String description;
    BigDecimal price;
    BigDecimal stockQuantity;
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
    Set<OrderDetail> orderDetails = new HashSet<>();

    @OneToMany(mappedBy = "product")
    Set<CartDetail> cartDetails = new HashSet<>();
}
