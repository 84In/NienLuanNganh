package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.Brand;
import com.nienluan.webshop.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BrandRepository extends JpaRepository<Brand, String> {
    boolean existsByName(String name);
    Optional<Brand> findByName(String name);

    @Query("SELECT b FROM Brand b WHERE LOWER(b.name) LIKE LOWER(CONCAT('%',:name,'%'))")
    List<Brand> findByNameContaining(@Param("name") String name);

    @Query("SELECT DISTINCT p.brand FROM Product p WHERE p.category = :category")
    List<Brand> findDistinctBrandsByCategory(@Param("category") Category category);

}
