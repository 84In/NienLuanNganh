package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.Category;
import com.nienluan.webshop.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    boolean existsByName(String name);
    Page<Product> findByCategory(Pageable pageable, Category category);
}
