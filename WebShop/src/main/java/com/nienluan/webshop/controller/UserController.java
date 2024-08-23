package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.request.UserCreationRequest;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.UserResponse;
import com.nienluan.webshop.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    UserService userService;

    @PostMapping
    ApiResponse<UserResponse> createUser(@RequestBody UserCreationRequest request) {
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
        apiResponse.setMessage("Success");
        log.info("Create user");
        apiResponse.setResult(userService.createUser(request));
        return apiResponse;
    }
}
