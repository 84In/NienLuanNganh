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
    ApiResponse<UserResponse> createUser(@RequestBody UserCreation request) {
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
        apiResponse.setMessage("Success");
        apiResponse.setResult(userService.createUser(request));
        return apiResponse;
    }
}
