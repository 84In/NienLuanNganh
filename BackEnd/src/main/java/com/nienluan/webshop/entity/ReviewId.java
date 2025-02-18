package com.nienluan.webshop.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class ReviewId implements Serializable {

    @Column(name = "user_id")
    private String userId;

    @Column(name = "product_id")
    private String productId;

    @Column(name = "order_id")
    private String orderId;
}
