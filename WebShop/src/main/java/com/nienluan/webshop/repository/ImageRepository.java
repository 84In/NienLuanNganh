package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, String> {
    Optional<Image> findByCategoryId(String categoryId);
    Optional<Image> findByProductId(String productId);
}
