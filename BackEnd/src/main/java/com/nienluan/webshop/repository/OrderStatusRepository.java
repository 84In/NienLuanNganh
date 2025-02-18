package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderStatusRepository extends JpaRepository<OrderStatus, String> {
    OrderStatus findByCodeName(String name);
}
