package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.Payment;
import com.nienluan.webshop.entity.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String> {
}