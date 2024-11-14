package com.nienluan.webshop.entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "t_banner")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String title;
    String images;
}
