package com.nienluan.webshop.repository;

import com.nienluan.webshop.dto.PaymentSummary;
import com.nienluan.webshop.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String> {
    @Query("SELECT new map(o.paymentMethod.id as paymentMethodId, " +
            "DATE(o.createdAt) as summaryDate, " +
            "SUM(p.amount) as totalAmount, " +
            "COUNT(o) as orderCount) " +
            "FROM Payment p JOIN Order o ON p.id = o.payment.id " +
            "WHERE DATE(o.createdAt) BETWEEN :startDate AND :endDate " +
            "GROUP BY o.paymentMethod.id, DATE(o.createdAt)")
    List<Map<String, Object>> findPaymentSummaryWithOrdersByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
