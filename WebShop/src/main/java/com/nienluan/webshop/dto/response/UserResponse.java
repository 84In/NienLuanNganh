package com.nienluan.webshop.dto.response;

import com.nienluan.webshop.entity.Image;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
    Date dob;
    Set<RoleResponse> roles;
    Image image;
}
