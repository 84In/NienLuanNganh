package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.Province;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProvinceRepository extends JpaRepository<Province, Integer> {
    boolean existsByCodeName(String codeName);
}
