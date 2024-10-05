package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.Brand;
import com.nienluan.webshop.entity.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, String> {
    boolean existsByName(String name);
    boolean existsByCode(String code);
    @Query("SELECT p FROM Promotion p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%',:name,'%'))")
    List<Promotion> findByNameContaining(@Param("name") String name);
}
