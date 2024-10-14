package com.nienluan.webshop.entity;


import com.nienluan.webshop.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Table(name = "t_reviews")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Review extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    int rating;

    @Column(columnDefinition = "TEXT")
    String comment;

    Boolean status;

    @Column(name = "user_id", nullable = false)
    String userId;

    @Column(name = "product_id", nullable = false)
    String productId;


}
