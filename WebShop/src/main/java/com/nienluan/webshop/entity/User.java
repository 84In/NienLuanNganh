package com.nienluan.webshop.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
    String email;
    String phone;
    Date dob;

    @ManyToMany
    Set<Role> roles;

    @OneToOne
    @JoinColumn(name = "image_id") // Cột khóa ngoại trong bảng User
    Image image; // Một hình ảnh duy nhất
}
