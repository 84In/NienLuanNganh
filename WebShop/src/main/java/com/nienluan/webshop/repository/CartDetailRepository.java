package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.Cart;
import com.nienluan.webshop.entity.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail, String> {
}
