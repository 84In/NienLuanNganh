package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.RecentPaymentSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface RecentPaymentSummaryRepository extends JpaRepository<RecentPaymentSummary, String> {
    List<RecentPaymentSummary> findByDate(LocalDate date);

    // Lấy dữ liệu tổng hợp thanh toán theo phương thức và ngày
    Optional<RecentPaymentSummary> findByPaymentMethodIdAndDate(String paymentMethodId, LocalDate date);
}
