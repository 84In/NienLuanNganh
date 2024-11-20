package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByUsername(String username);
    boolean existsByPhone(String phone);
    Optional<User> findByUsername(String username);
    @Query("SELECT u FROM User u WHERE " +
            "LOWER(u.username) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            "OR LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            "OR LOWER(u.firstName) LIKE LOWER(CONCAT('%', :keyword, '%'))"+
            "OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            "OR LOWER(u.phone) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<User> searchUserByKeyword(Pageable pageable, @Param("keyword") String keyword);
    @Query("SELECT COUNT(u) FROM User u WHERE u.createdAt >= :sevenDaysAgo")
    long countUsersCreatedInLast7Days(@Param("sevenDaysAgo") LocalDateTime sevenDaysAgo);

}