package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brand, String> {
    boolean existsByName(String name);
}
