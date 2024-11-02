package com.nienluan.webshop.dto.response;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ZaloResponse {
    String zptranstoken;
    String orderurl;
    int returncode;
    String returnmessage;
}
