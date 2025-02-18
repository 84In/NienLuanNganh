package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.Review;
import com.nienluan.webshop.entity.ReviewId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, ReviewId> {
    boolean existsById(ReviewId reviewId);

    Page<Review> findByProductId(Pageable pageable, String productId);

    @Query("SELECT ROUND(AVG(r.rating), 1) FROM Review r WHERE r.product.id = :productId")
    Double findAverageRatingByProductId(@Param("productId") String productId);

    @Query("SELECT r.rating, COUNT(r) FROM Review r WHERE r.product.id = :productId GROUP BY r.rating")
    List<Object[]> findRatingCountByProductId(@Param("productId") String productId);

    Long countByProductId(String productId);

    Page<Review> findByUserIdAndProductIdAndRating(
            String userId, String productId, int rating, Pageable pageable);

    Page<Review> findByUserIdAndProductId(String userId, String productId, Pageable pageable);

    Page<Review> findByUserId(String userId, Pageable pageable);

    Page<Review> findByProductId(String productId, Pageable pageable);

    Page<Review> findByRating(int rating, Pageable pageable);

}
