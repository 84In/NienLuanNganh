package com.nienluan.webshop.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nienluan.webshop.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "t_reviews")
@Setter
@Getter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Review extends BaseEntity {

    @EmbeddedId
    private ReviewId id;

    int rating;

    @Column(columnDefinition = "TEXT")
    String comment;

    Boolean status;

    // Associations
    @MapsId("userId")
    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @JsonIgnore
    @MapsId("productId")
    @ManyToOne
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private Product product;

    @JsonIgnore
    @MapsId("orderId")
    @ManyToOne
    @JoinColumn(name = "order_id", insertable = false, updatable = false)
    private Order order;
}
