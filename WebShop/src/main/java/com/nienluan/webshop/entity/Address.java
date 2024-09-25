package com.nienluan.webshop.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Setter
@Getter
@Table(name = "t_addresses")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    @Column(name = "full_name", nullable = false, columnDefinition = "TEXT")
    private String fullName;

    @OneToOne
    @JoinColumn(name = "province", nullable = false)
    private Province province;

    @OneToOne
    @JoinColumn(name = "district", nullable = false)
    private District district;

    @OneToOne
    @JoinColumn(name = "ward")
    private Ward ward;

}
