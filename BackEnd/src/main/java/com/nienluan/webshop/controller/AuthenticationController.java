package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.request.AuthenticationRequest;
import com.nienluan.webshop.dto.request.IntrospectRequest;
import com.nienluan.webshop.dto.request.LogoutRequest;
import com.nienluan.webshop.dto.request.RefreshTokenRequest;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.AuthenticationResponse;
import com.nienluan.webshop.dto.response.IntrospectResponse;
import com.nienluan.webshop.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private static final Logger log = LoggerFactory.getLogger(AuthenticationController.class);
    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ApiResponse<?> login(@RequestBody AuthenticationRequest request) {
        log.info(request.toString());
        return ApiResponse.<AuthenticationResponse>builder()
                .message("Login successful")
                .result(authenticationService.authenticate(request))
                .build();
    }

    @PostMapping("/introspect")
    public ApiResponse<?> introspect(@RequestBody IntrospectRequest request) {
        return ApiResponse.<IntrospectResponse>builder()
                .message("Introspect successful")
                .result(authenticationService.introspect(request))
                .build();
    }

    @PostMapping("/logout")
    public ApiResponse<?> logout(@RequestBody LogoutRequest request) {
        authenticationService.logout(request);
        return ApiResponse.<Void>builder()
                .message("Logout successful")
                .build();
    }

    @PostMapping("/refresh")
    public ApiResponse<?> refresh(@RequestBody RefreshTokenRequest request){
        return ApiResponse.<AuthenticationResponse>builder()
                .message("Refresh token successful")
                .result(authenticationService.refreshToken(request))
                .build();
    }
}
