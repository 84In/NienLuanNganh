package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.Category;
import com.nienluan.webshop.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
    boolean existsByName(String name);
    boolean existsByCodeName(String codeName);
    Category findByName(String name);
    Category findByCodeName(String codeName);
    @Query("SELECT c FROM Category c WHERE " +
            "LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            "OR LOWER(c.codeName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Category> searchCategoriesByKeyword(Pageable pageable, @Param("keyword") String keyword);


}
