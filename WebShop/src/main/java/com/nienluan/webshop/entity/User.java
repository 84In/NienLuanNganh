package com.nienluan.webshop.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.boot.autoconfigure.amqp.RabbitConnectionDetails;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

@Entity
@Setter
@Getter
@Table(name = "t_users")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
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
    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "address", nullable = true)
    Address address;
    @OneToMany(mappedBy = "user")
    Set<Order> orders;
    @OneToOne(mappedBy = "user")
    Cart cart;
}
