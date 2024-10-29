package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.request.ReviewRequest;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.ReviewResponse;
import com.nienluan.webshop.service.ReviewService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/reviews")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReviewController {
    ReviewService reviewService;

    @PostMapping
    public ApiResponse<ReviewResponse> createReview(@RequestBody ReviewRequest request) {
        return ApiResponse.<ReviewResponse>builder()
                .result(reviewService.createReview(request))
                .build();
    }

//    @GetMapping
//    public ApiResponse<Page<ReviewResponse>> getReviews(Pageable pageable) {
//        return ApiResponse.<Page<ReviewResponse>>builder()
//                .result(reviewService.getAllReviews(pageable))
//                .build();
//    }

//    @GetMapping("/{id}")
//    public ApiResponse<ReviewResponse> getReview(@PathVariable String id) {
//        return ApiResponse.<ReviewResponse>builder()
//                .result(reviewService.getReviewById(id))
//                .build();
//    }
//
//    @PutMapping("/{id}")
//    public ApiResponse<ReviewResponse> updateReview(@PathVariable String id, ReviewUpdateRequest request) {
//        return ApiResponse.<ReviewResponse>builder()
//                .result(reviewService.updateReview(request,id))
//                .build();
//    }
//
//    @DeleteMapping("/{id}")
//    public ApiResponse<Void> deleteReview(@PathVariable String id) {
//        return ApiResponse.<Void>builder().message("Deleted success!").build();
//    }
}
