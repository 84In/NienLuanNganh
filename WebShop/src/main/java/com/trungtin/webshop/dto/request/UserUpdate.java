package com.trungtin.webshop.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdate {
    String id;
    String username;
    String password;
    String firstName;
    String lastName;
    String email;
    String phone;
    String avatar;
    Date dob;

    List<String> roles;
}
