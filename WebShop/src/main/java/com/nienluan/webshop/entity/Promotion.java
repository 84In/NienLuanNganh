package com.nienluan.webshop.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@Table(name = "t_promotions")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String code;
    String name;
    String description;
    Double discountPercentage;
    LocalDateTime startDate;
    LocalDateTime endDate;

    @ManyToMany(mappedBy = "promotions")
    Set<Product> products = new HashSet<>();
}
