package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.Order;
import com.nienluan.webshop.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
}
