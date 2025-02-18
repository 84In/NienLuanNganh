package com.nienluan.webshop.dto.request;

import com.nienluan.webshop.validator.MinAge;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChangePersonalInformationRequest {
    String username;

    @NotBlank(message = "Họ là bắt buộc")
    @Size(max = 50, message = "Họ phải tối đa 50 ký tự")
    String firstName;

    @NotBlank(message = "Last name là bắt buộc")
    @Size(max = 50, message = "Tên phải tối đa 50 ký tự")
    String lastName;

    @MinAge(min = 12)
    LocalDate dob;
    String avatar;
}
