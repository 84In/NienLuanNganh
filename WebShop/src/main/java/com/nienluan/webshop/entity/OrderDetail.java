package com.nienluan.webshop.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Entity
@Setter
@Getter
@Table(name = "t_order_details")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    BigDecimal quantity;
    BigDecimal priceAtTime;
    @Builder.Default
    boolean reviewed = false;
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    Order order;
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    Product product;
}
