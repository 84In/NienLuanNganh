package com.nienluan.webshop.dto.request;

import jakarta.validation.constraints.Pattern;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChangePasswordRequest {

    String username;

    @Pattern(regexp = "^(?=.*[A-Z])(?=.*\\d).{5,}$", message = "Mật khẩu phải ít nhất 5 ký tự, một chữ hoa, một chữ số")
    String oldPassword;

    @Pattern(regexp = "^(?=.*[A-Z])(?=.*\\d).{5,}$", message = "Mật khẩu phải ít nhất 5 ký tự, một chữ hoa, một chữ số")
    String newPassword;
}
