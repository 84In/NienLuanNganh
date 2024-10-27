package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.Order;
import com.nienluan.webshop.entity.OrderStatus;
import com.nienluan.webshop.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface OrderRepository extends JpaRepository<Order, String> {
    Page<Order> findByUser(User user, Pageable pageable);

    Page<Order> findByUserAndStatus(User user, OrderStatus status, Pageable pageable);

    @Query("SELECT DISTINCT o FROM Order o " +
            "LEFT JOIN FETCH o.orderDetails od " +
            "LEFT JOIN FETCH od.product odp " +
            "LEFT JOIN FETCH o.paymentMethod pm " +
            "LEFT JOIN FETCH o.recipient or " +
            "WHERE o.user = :user " +
            "AND (:status IS NULL OR o.status = :status) " +
            "AND (:search IS NULL OR " +
            "LOWER(o.id) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(CAST(o.totalAmount AS string)) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(CAST(o.createdAt AS string)) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(or.address) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(or.fullName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(or.phone) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(odp.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(pm.name) LIKE LOWER(CONCAT('%', :search, '%'))) ")
    Page<Order> findByUserAndStatusAndSearch(@Param("user") User user,
                                             @Param("status") OrderStatus status,
                                             @Param("search") String search,
                                             Pageable pageable);

    Page<Order> findByStatusCodeName(String codename, Pageable pageable);
    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o WHERE DATE(o.createdAt) = :date")
    BigDecimal findTotalAmountByDate(@Param("date") LocalDate date);
    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o " +
            "WHERE MONTH(o.createdAt) = MONTH(CURRENT_DATE) " +
            "AND YEAR(o.createdAt) = YEAR(CURRENT_DATE)")
    BigDecimal findTotalRevenueForCurrentMonth();
}