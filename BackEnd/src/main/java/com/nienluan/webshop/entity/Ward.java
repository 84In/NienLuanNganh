package com.nienluan.webshop.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "t_wards")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Ward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String name;
    String divisionType;
    String codeName;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "district_code", nullable = false)
    District district;

}
