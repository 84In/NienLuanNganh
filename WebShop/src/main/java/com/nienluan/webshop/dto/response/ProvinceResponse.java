package com.nienluan.webshop.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProvinceResponse {
    Integer id;
    String codeName;
    String name;
    String divisionType;
}
