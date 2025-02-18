package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.ReviewRequest;
import com.nienluan.webshop.dto.request.ReviewUpdateRequest;
import com.nienluan.webshop.dto.response.ReviewResponse;
import com.nienluan.webshop.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    Review toReview(ReviewRequest request);

    ReviewResponse toReviewResponse(Review review);

    @Mapping(target = "id", ignore = true)
    void updateReview(@MappingTarget Review review, ReviewUpdateRequest request);
}
