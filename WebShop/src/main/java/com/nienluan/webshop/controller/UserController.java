package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.request.ChangePasswordRequest;
import com.nienluan.webshop.dto.request.ChangePersonalInformationRequest;
import com.nienluan.webshop.dto.request.UserCreationRequest;
import com.nienluan.webshop.dto.request.UserUpdateRequest;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.UserResponse;
import com.nienluan.webshop.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    UserService userService;

    @PostMapping
    ApiResponse<?> createUser(@RequestBody UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .message("Success")
                .result(userService.createUser(request))
                .build();
    }

    @GetMapping
    ApiResponse<?> getAllUser(Pageable pageable) {
        return ApiResponse.<Page<UserResponse>>builder()
                .message("Success")
                .result(userService.getAllUser(pageable))
                .build();
    }

    @GetMapping("/id/{userId}")
    ApiResponse<UserResponse> getUser(@PathVariable String userId) {
        return ApiResponse.<UserResponse>builder()
                .message("Success")
                .result(userService.getUserById(userId))
                .build();
    }

    @GetMapping("/{username}")
    ApiResponse<UserResponse> getUserByUsername(@PathVariable String username) {
        return ApiResponse.<UserResponse>builder()
                .message("Success")
                .result(userService.getUserByUsername(username))
                .build();
    }

    @PutMapping("/{userId}")
    ApiResponse<?> updateUser(@PathVariable String userId, @RequestBody UserUpdateRequest request) {
        return ApiResponse.<UserResponse>builder()
                .message("Update Successful")
                .result(userService.updateUser(userId, request))
                .build();
    }

    @DeleteMapping("/{userId}")
    ApiResponse<?> deleteUser(@PathVariable String userId) {
        userService.deleteUserById(userId);
        return ApiResponse.<Void>builder()
                .message("Delete Successful")
                .build();
    }

    @PutMapping("/change-password")
    public ApiResponse<UserResponse> changePassword(@RequestBody ChangePasswordRequest request) {
        return ApiResponse.<UserResponse>builder()
                .message("Change Password Successful")
                .result(userService.changePassword(request))
                .build();
    }

    @PutMapping("/change-personal-information")
    public ApiResponse<UserResponse> changePersonalInformation(@RequestBody ChangePersonalInformationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .message("Change Personal Information Successful")
                .result(userService.changePersonalInformation(request))
                .build();
    }
}
