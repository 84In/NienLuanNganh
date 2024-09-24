package com.nienluan.webshop.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DistrictResponse {
    Integer id;
    String name;
    String divisionType;
    String codeName;
}
