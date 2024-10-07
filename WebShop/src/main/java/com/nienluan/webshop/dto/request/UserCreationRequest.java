package com.nienluan.webshop.dto.request;

import com.nienluan.webshop.validator.MinAge;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {

    @NotBlank(message = "Tài khoản là bắt buộc")
    @Size(min = 4, max = 50, message = "Tài khoản phải từ 4-50 ký tự")
    String username;

    @NotBlank(message = "Mật khẩu là bắt buộc")
    @Size(min = 6, message = "Mật khẩu phải ít nhất 6 ký tự")
    String password;

    @NotBlank(message = "Họ là bắt buộc")
    @Size(max = 50, message = "Họ phải tối đa 50 ký tự")
    String firstName;

    @NotBlank(message = "Last name là bắt buộc")
    @Size(max = 50, message = "Tên phải tối đa 50 ký tự")
    String lastName;

    @NotBlank(message = "Email là bắt buộc")
    @Email(message = "Email không hợp lệ")
    String email;

    @NotBlank(message = "Số điện thoại là bắt buộc")
    @Pattern(regexp = "^\\+?[0-9]{10}$", message = "Số điện thoại phải đủ 10 chữ số")
    String phone;

    @NotNull(message = "Ngày sinh là bắt buộc")
    @MinAge(min = 12)
    LocalDate dob;
}
