package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.Order;
import com.nienluan.webshop.entity.StatusOrder;
import com.nienluan.webshop.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, String> {
    Page<Order> findByUser(User user, Pageable pageable);

    Page<Order> findByUserAndStatus(User user, StatusOrder status, Pageable pageable);
}