package com.nienluan.webshop.dto.response;

import com.nienluan.webshop.common.BaseResponse;
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
    int rating;
    String comment;
    Boolean status;
    UserResponse user;
}
