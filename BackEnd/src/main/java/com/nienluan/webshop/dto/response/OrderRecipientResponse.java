package com.nienluan.webshop.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderRecipientResponse {
    String id;
    String fullName;
    String phone;
    String address;
}
