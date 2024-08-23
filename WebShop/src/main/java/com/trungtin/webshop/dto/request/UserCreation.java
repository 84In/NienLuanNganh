package com.trungtin.webshop.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreation {
    String username;
    String password;
    String firstName;
    String lastName;
    String email;
    String phoneNumber;
    Date dob;
}
