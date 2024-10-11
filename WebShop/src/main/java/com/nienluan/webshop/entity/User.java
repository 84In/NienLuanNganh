package com.nienluan.webshop.entity;

import com.nienluan.webshop.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.boot.autoconfigure.amqp.RabbitConnectionDetails;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@Table(name = "t_users")
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String username;
    String password;
    String firstName;
    String lastName;
    String avatar;
    String email;
    String phone;
    LocalDate dob;
    @ManyToMany
    Set<Role> roles;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address", nullable = true)
    Address address;
    @OneToMany(mappedBy = "user")
    Set<Order> orders = new HashSet<>();
    @OneToOne(mappedBy = "user")
    Cart cart;
}
