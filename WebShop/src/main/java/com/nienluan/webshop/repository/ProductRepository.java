package com.nienluan.webshop.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.nienluan.webshop.entity.Brand;
import com.nienluan.webshop.entity.Category;
import com.nienluan.webshop.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    boolean existsByName(String name);

    Page<Product> findByCategory(Pageable pageable, Category category);

    @Query("SELECT DISTINCT p FROM Product p " +
            "LEFT JOIN FETCH p.category pc " +
            "LEFT JOIN FETCH p.brand pb " +
            "WHERE (:search IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(CAST(p.price AS string)) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(pc.name) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(pc.codeName) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(pb.name) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "AND (:min IS NULL OR p.price >= :min) " +
            "AND (:max IS NULL OR p.price <= :max)")
    Page<Product> findBySearchWithFilters(Pageable pageable,
                                          @Param("search") String search,
                                          @Param("min") BigDecimal min,
                                          @Param("max") BigDecimal max);

    @Query("SELECT p FROM Product p WHERE p.category = :category " +
            "AND (:brands IS NULL OR p.brand.id IN :brands) " +
            "AND (:min IS NULL OR p.price >= :min) " +
            "AND (:max IS NULL OR p.price <= :max)")
    Page<Product> findByCategoryWithFilters(Pageable pageable,
                                            @Param("category") Category category,
                                            @Param("brands") List<String> brands,
                                            @Param("min") BigDecimal min,
                                            @Param("max") BigDecimal max);

    @Query(value = "SELECT COUNT(*) FROM t_products WHERE MONTH(created_at) = MONTH(CURRENT_DATE) AND YEAR(created_at) = YEAR(CURRENT_DATE)", nativeQuery = true)
    Long countProductsCurrentMonth();

}
