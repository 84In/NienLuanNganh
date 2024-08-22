package com.trungtin.webshop.controller;

import com.trungtin.webshop.dto.request.UserCreation;
import com.trungtin.webshop.dto.response.ApiResponse;
import com.trungtin.webshop.dto.response.UserResponse;
import com.trungtin.webshop.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

    UserService userService;

    @PostMapping
    ApiResponse<UserResponse> createUser(@RequestBody UserCreation request){
        return ApiResponse.<UserResponse>builder()
                .message("Successfully created user")
                .result(userService.createUser(request))
                .build();
    }
}
