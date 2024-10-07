package com.nienluan.webshop.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nienluan.webshop.entity.Address;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String id;
    String username;
    String firstName;
    String lastName;
    String email;
    String phone;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    LocalDate dob;
    String avatar;

    AddressResponse address;

    Set<RoleResponse> roles;
}
