package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.request.*;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.UserResponse;
import com.nienluan.webshop.service.UserService;
import jakarta.validation.Valid;
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
    ApiResponse<?> createUser(@Valid @RequestBody UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .message("Success")
                .result(userService.createUser(request))
                .build();
    }

    @PostMapping("/admin")
    ApiResponse<?> createUserAdmin(@Valid @RequestBody UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .message("Success")
                .result(userService.createUserByAdmin(request))
                .build();
    }

    @GetMapping
    ApiResponse<?> getAllUser(Pageable pageable) {
        return ApiResponse.<Page<UserResponse>>builder()
                .message("Success")
                .result(userService.getAllUser(pageable))
                .build();
    }
    @GetMapping("/search")
    ApiResponse<?> getAllUserByKeyword(@RequestParam(required = false) String keyword,Pageable pageable) {
        return ApiResponse.<Page<UserResponse>>builder()
                .message("Success")
                .result(userService.getAllUserByKeyword(keyword,pageable))
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

    @GetMapping("/current-user")
    ApiResponse<UserResponse> getCurrentUser() {
        return ApiResponse.<UserResponse>builder()
                .message("Success")
                .result(userService.getCurrentUser())
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

    @PutMapping("/change/password")
    public ApiResponse<UserResponse> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        return ApiResponse.<UserResponse>builder()
                .message("Change Password Successful")
                .result(userService.changePassword(request))
                .build();
    }
    @PutMapping("/change/password-admin")
    public ApiResponse<UserResponse> changePasswordByAdmin(@Valid @RequestBody ChangePasswordByAdminRequest request) {
        return ApiResponse.<UserResponse>builder()
                .message("Change Password Successful")
                .result(userService.changePasswordByAdmin(request))
                .build();
    }

    @PutMapping("/change/personal-information")
    public ApiResponse<UserResponse> changePersonalInformation(@Valid @RequestBody ChangePersonalInformationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .message("Change Personal Information Successful")
                .result(userService.changePersonalInformation(request))
                .build();
    }

    @PutMapping("/change/contact-information")
    public ApiResponse<UserResponse> changeContactInformation(@Valid @RequestBody ChangeContactInformationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .message("Change Contact Information Successful")
                .result(userService.changeContactInformation(request))
                .build();
    }

    @PutMapping("/change/address")
    public ApiResponse<UserResponse> changeAddressInformation(@RequestBody ChangeAddressRequest request) {
        return ApiResponse.<UserResponse>builder()
                .message("Change Address Successful")
                .result(userService.changeAddressInformation(request))
                .build();
    }
}
