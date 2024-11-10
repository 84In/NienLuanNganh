package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BannerRepository extends JpaRepository<Banner, String> {
    boolean existsByTitle(String title);
    Banner findByTitle(String title);
}
