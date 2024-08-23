package com.nienluan.webshop.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApiResponse<T> {
    int code = 0;
    String message;
    T result;
}

