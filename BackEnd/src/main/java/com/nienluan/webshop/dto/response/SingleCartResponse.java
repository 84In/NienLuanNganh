package com.nienluan.webshop.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SingleCartResponse {
    String id;
    CartDetailResponse cartDetails;
}
