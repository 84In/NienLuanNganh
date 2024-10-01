package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
    boolean existsByName(String name);
    boolean existsByCodeName(String codeName);
    Category findByName(String name);
    Category findByCodeName(String codeName);
}
