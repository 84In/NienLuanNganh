package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.ReviewRequest;
import com.nienluan.webshop.dto.response.ReviewProductResponse;
import com.nienluan.webshop.dto.response.ReviewResponse;
import com.nienluan.webshop.entity.*;
import com.nienluan.webshop.exception.AppException;
import com.nienluan.webshop.exception.ErrorCode;
import com.nienluan.webshop.mapper.ReviewMapper;
import com.nienluan.webshop.mapper.UserMapper;
import com.nienluan.webshop.repository.OrderRepository;
import com.nienluan.webshop.repository.ProductRepository;
import com.nienluan.webshop.repository.ReviewRepository;
import com.nienluan.webshop.repository.UserRepository;
import com.nienluan.webshop.utils.CommentFilter;
import com.nienluan.webshop.utils.SpamKeywords;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReviewService {

    private static final Logger log = LoggerFactory.getLogger(ReviewService.class);
    ReviewRepository reviewRepository;
    ReviewMapper reviewMapper;
    OrderRepository orderRepository;
    UserRepository userRepository;
    UserMapper userMapper;
    ProductRepository productRepository;


    @Transactional
    public ReviewResponse createReview(ReviewRequest reviewRequest) {
        User user = userRepository.findByUsername(reviewRequest.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Order order = orderRepository.findById(reviewRequest.getOrderId())
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_EXISTED));

        Product product = productRepository.findById(reviewRequest.getProductId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));

        // Ensure the product is part of the order and check if already reviewed
        OrderDetail orderDetail = order.getOrderDetails().stream()
                .filter(od -> od.getProduct().getId().equals(product.getId()))
                .findFirst()
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));

        if (orderDetail.isReviewed()) {
            throw new AppException(ErrorCode.REVIEW_EXISTED);  // Product already reviewed in this order
        }
        orderDetail.setReviewed(true);

        // Check if review already exists in repository
        ReviewId reviewId = new ReviewId(user.getId(), product.getId(), order.getId());
        if (reviewRepository.existsById(reviewId)) {
            throw new AppException(ErrorCode.REVIEW_EXISTED); // Prevent duplicate reviews
        }

        // Create review
        Review review = Review.builder()
                .id(reviewId)
                .rating(reviewRequest.getRating())
                .comment(reviewRequest.getComment())
                .status(true)
                .user(user)
                .product(product)
                .order(order)
                .build();

        // Check sensitive words
        boolean isValidComment = CommentFilter.isCommentValid(review.getComment());
        review.setComment(isValidComment ? review.getComment() : SpamKeywords.messageWarning());
        review.setStatus(isValidComment);

        reviewRepository.save(review);
        orderRepository.save(order);

        return toReviewResponse(review);
    }

//    public Page<ReviewResponse> getAllReviews(Pageable pageable) {
//        return reviewRepository.findAll(pageable).map(reviewMapper::toReviewResponse);
//    }

//    public ReviewResponse getReviewById(String id) {
//        Review review = reviewRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.REVIEW_NOT_EXISTED));
//        return reviewMapper.toReviewResponse(review);
//    }

//    public ReviewResponse updateReview(ReviewUpdateRequest reviewUpdateRequest, String id) {
//        Review review = reviewRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.REVIEW_NOT_EXISTED));
//        reviewMapper.updateReview(review, reviewUpdateRequest);
//        Boolean status = CommentFilter.isCommentValid(review.getComment());
//        if (!status) {
//            review.setComment(SpamKeywords.messageWarning());
//        }
//        review.setStatus(status);
//        reviewRepository.save(review);
//        return reviewMapper.toReviewResponse(review);
//    }
//
//    void deleteReviewById(String id) {
//        reviewRepository.deleteById(id);
//    }

    public ReviewProductResponse getReviewProductResponse(Pageable pageable, String productId) {
        // Get average rating and rating count
        Double averageRating = getAverageRating(productId);
        Map<Integer, Long> ratingCount = getRatingCount(productId);

        // Get paginated reviews as Page<ReviewResponse>
        Page<ReviewResponse> paginatedReviews = getReviewsByProductId(pageable, productId);

        // Build and return ReviewProductResponse
        return ReviewProductResponse.builder()
                .totalReviews(paginatedReviews.getTotalElements())
                .averageRating(averageRating)
                .ratingCount(ratingCount)
                .reviews(paginatedReviews)
                .build();
    }


    public Page<ReviewResponse> getReviewsByProductId(Pageable pageable, String productId) {
        Pageable sortPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("createdAt").descending());
        Page<Review> reviewPage = reviewRepository.findByProductId(sortPageable, productId);

        return reviewPage.map(this::toReviewResponse);
    }

    public Double getAverageRating(String productId) {
        return reviewRepository.findAverageRatingByProductId(productId);
    }

    public Map<Integer, Long> getRatingCount(String productId) {
        List<Object[]> ratingData = reviewRepository.findRatingCountByProductId(productId);
        Map<Integer, Long> ratingCountMap = new HashMap<>();
        for (Object[] obj : ratingData) {
            Integer rating = (Integer) obj[0];
            Long count = (Long) obj[1];
            ratingCountMap.put(rating, count);
        }
        return ratingCountMap;
    }

    public Long getTotalReviews(String productId) {
        return reviewRepository.countByProductId(productId);
    }

    private ReviewResponse toReviewResponse(Review review) {
        return ReviewResponse.builder()
                .createdAt(review.getCreatedAt())
                .updatedAt(review.getUpdatedAt())
                .rating(review.getRating())
                .comment(review.getComment())
                .status(review.getStatus())
                .user(userMapper.toUserResponse(review.getUser()))
                .build();
    }
}
