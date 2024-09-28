package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.Order;
import com.nienluan.webshop.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, String> {
    List<OrderDetail> findByOrder(Order order);
}
