package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.RevenueSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RevenueSummaryRepository extends JpaRepository<RevenueSummary, Long> {
    // Truy vấn theo loại thống kê (ngày, tháng, năm)
    List<RevenueSummary> findByDateRangeType(String dateRangeType);

    // Truy vấn theo loại thống kê và ngày
    Optional<RevenueSummary> findByDateRangeTypeAndSummaryDate(String dateRangeType, LocalDate summaryDate);

    @Query("SELECT r FROM RevenueSummary r WHERE YEAR(r.summaryDate) = YEAR(:date) AND r.dateRangeType = 'monthly' ORDER BY r.summaryDate ASC")
    Optional<List<RevenueSummary>> findAllMonthByDate(@Param("date") LocalDate date);

}
