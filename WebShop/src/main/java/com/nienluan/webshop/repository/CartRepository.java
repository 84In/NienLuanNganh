package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.Cart;
import com.nienluan.webshop.entity.Role;
import com.nienluan.webshop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CartRepository extends JpaRepository<Cart, String> {
    boolean existsByUser(User user);
    Cart findByUser(User user);
}
