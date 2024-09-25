package com.nienluan.webshop.dto.response;

import com.nienluan.webshop.entity.District;
import com.nienluan.webshop.entity.Province;
import com.nienluan.webshop.entity.Ward;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddressResponse {
    String id;
   
    String fullName;
    Province province;
    District district;
    Ward ward;
}
