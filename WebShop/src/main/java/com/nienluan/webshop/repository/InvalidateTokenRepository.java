package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.InvalidatedToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvalidateTokenRepository extends JpaRepository<InvalidatedToken, String> {
}
