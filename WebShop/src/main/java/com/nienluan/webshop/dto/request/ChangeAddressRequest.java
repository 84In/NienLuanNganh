package com.nienluan.webshop.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChangeAddressRequest {
    String username;
    String fullName;
    Integer province;
    Integer district;
    Integer ward;
    String street;
}
