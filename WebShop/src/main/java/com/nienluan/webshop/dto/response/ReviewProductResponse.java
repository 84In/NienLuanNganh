package com.nienluan.webshop.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;

import java.util.Map;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewProductResponse {
    Long totalReviews;
    Double averageRating;
    Map<Integer, Long> ratingCount;
    Page<ReviewResponse> reviews;
}
