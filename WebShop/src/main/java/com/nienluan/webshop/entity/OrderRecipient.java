package com.nienluan.webshop.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Entity
@Setter
@Getter
@Table(name = "t_order_recipient")
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderRecipient {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String fullName;
    String phone;
    String address;

    @OneToOne(mappedBy = "recipient")
    Order order;
}
