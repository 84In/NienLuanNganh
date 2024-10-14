package com.nienluan.webshop.dto.response;

import com.nienluan.webshop.common.BaseResponse;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewResponse extends BaseResponse {
    String id;
    int rating;
    Boolean status;
    String comment;
    String userId;
    String productId;
}
