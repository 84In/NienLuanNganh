package com.nienluan.webshop.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChangeContactInformationRequest {
    String username;

    @Email(message = "Email không hợp lệ")
    String email;

    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Số điện thoại phải đủ từ 10-15 chữ số")
    String phone;
}
