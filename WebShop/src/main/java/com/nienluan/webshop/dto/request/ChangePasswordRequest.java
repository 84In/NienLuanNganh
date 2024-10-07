package com.nienluan.webshop.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChangePasswordRequest {

    String username;

    @Size(min = 5, message = "Mật khẩu phải ít nhất 5 ký tự")
    String oldPassword;

    @Size(min = 5, message = "Mật khẩu phải ít nhất 5 ký tự")
    String newPassword;
}
