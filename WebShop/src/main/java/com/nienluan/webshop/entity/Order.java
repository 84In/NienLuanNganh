package com.nienluan.webshop.entity;

import com.nienluan.webshop.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;
import org.hibernate.query.sqm.FetchClauseType;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Setter
@Getter
@Table(name = "t_orders")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Order extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String shippingAddress;
    BigInteger totalAmount;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status_id", nullable = false)
    StatusOrder status;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_method_id", nullable = false)
    PaymentMethod paymentMethod;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_id")
    Payment payment;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    User user;
    @OneToMany(mappedBy = "order")
    Set<OrderDetail> orderDetails = new HashSet<>();

}
