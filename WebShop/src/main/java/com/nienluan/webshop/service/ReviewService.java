package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.ReviewRequest;
import com.nienluan.webshop.dto.request.ReviewUpdateRequest;
import com.nienluan.webshop.dto.response.ReviewResponse;
import com.nienluan.webshop.entity.Review;
import com.nienluan.webshop.exception.AppException;
import com.nienluan.webshop.exception.ErrorCode;
import com.nienluan.webshop.mapper.ReviewMapper;
import com.nienluan.webshop.repository.ReviewRepository;
import com.nienluan.webshop.utils.CommentFilter;
import com.nienluan.webshop.utils.SpamKeywords;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReviewService {

    ReviewRepository reviewRepository;
    ReviewMapper reviewMapper;

    public ReviewResponse createReview(ReviewRequest reviewRequest) {
        Review review = reviewMapper.toReview(reviewRequest);
        Boolean status = CommentFilter.isCommentValid(review.getComment());
        if(!status) {
            review.setComment(SpamKeywords.messageWarning());
        }
        review.setStatus(status);
        return reviewMapper.toReviewResponse(reviewRepository.save(review));
    }

    public Page<ReviewResponse> getAllReviews(Pageable pageable) {
        return reviewRepository.findAll(pageable).map(reviewMapper::toReviewResponse);
    }

    public ReviewResponse getReviewById(String id) {
        Review review = reviewRepository.findById(id).orElseThrow(()->new AppException(ErrorCode.REVIEW_NOT_EXISTED));
        return reviewMapper.toReviewResponse(review);
    }

    public ReviewResponse updateReview(ReviewUpdateRequest reviewUpdateRequest, String id) {
        Review review = reviewRepository.findById(id).orElseThrow(()->new AppException(ErrorCode.REVIEW_NOT_EXISTED));
        reviewMapper.updateReview(review, reviewUpdateRequest);
        Boolean status = CommentFilter.isCommentValid(review.getComment());
        if(!status) {
            review.setComment(SpamKeywords.messageWarning());
        }
        review.setStatus(status);
        reviewRepository.save(review);
        return reviewMapper.toReviewResponse(review);
    }

    void DeleteReviewById(String id) {
        reviewRepository.deleteById(id);
    }

}
