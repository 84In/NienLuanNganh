package com.nienluan.webshop.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@Table(name = "t_roles")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Role {
    @Id
    String name;
    String description;

    @ManyToMany(mappedBy = "roles")
    Set<User> users = new HashSet<>();
}
