package com.nienluan.webshop.dto.request;

import com.nienluan.webshop.validator.MinAge;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {

    @Size(min = 4, max = 50, message = "Tài khoản phải từ 4-50 ký tự")
    String username;

    @Pattern(regexp = "^(?=.*[A-Z])(?=.*\\d).{5,}$", message = "Mật khẩu phải ít nhất 5 ký tự, một chữ hoa, một chữ số")
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

    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Số điện thoại phải đủ từ 10-15 chữ số")
    String phone;

    @MinAge(min = 12)
    LocalDate dob;
}
