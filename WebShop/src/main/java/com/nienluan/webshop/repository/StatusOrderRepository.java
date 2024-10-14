package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.StatusOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusOrderRepository extends JpaRepository<StatusOrder, String> {
    StatusOrder findByName(String name);

    StatusOrder findByNameEquals(String name);
}
