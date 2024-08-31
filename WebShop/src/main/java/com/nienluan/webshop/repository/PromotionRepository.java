package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, String> {
    boolean existsByName(String name);
    boolean existsByCode(String code);
}
