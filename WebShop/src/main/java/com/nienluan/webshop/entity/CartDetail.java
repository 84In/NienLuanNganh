package com.nienluan.webshop.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Entity
@Data
@Table(name = "t_cart_details")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    BigDecimal quantity;
    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    Cart cart;
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    Product product;
}
