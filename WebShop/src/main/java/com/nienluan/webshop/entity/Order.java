package com.nienluan.webshop.entity;

import com.nienluan.webshop.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "t_orders")
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Order extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    BigDecimal totalAmount;
    @OneToOne
    @JoinColumn(name = "recipient_id")
    OrderRecipient recipient;
    @ManyToOne
    @JoinColumn(name = "status_id", nullable = false)
    OrderStatus status;
    @ManyToOne
    @JoinColumn(name = "payment_method_id", nullable = false)
    PaymentMethod paymentMethod;
    @OneToOne
    @JoinColumn(name = "payment_id")
    Payment payment;
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
    @OneToMany(mappedBy = "order")
    List<OrderDetail> orderDetails = new ArrayList<>();
}
