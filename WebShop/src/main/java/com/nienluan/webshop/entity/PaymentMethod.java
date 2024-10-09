package com.nienluan.webshop.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@Table(name = "t_payment_methods")
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentMethod {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String name;
    @OneToMany(mappedBy = "paymentMethod", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<Order> orders = new HashSet<>();
}
