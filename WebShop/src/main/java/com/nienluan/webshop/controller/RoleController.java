package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.request.RoleRequest;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.RoleResponse;
import com.nienluan.webshop.service.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleController {

    RoleService roleService;

    @PostMapping
    public ApiResponse<RoleResponse> createRole(@RequestBody RoleRequest role) {
        return ApiResponse.<RoleResponse>builder()
                .message("Success!")
                .result(roleService.createRole(role))
                .build();
    }

    @GetMapping
    public ApiResponse<List<RoleResponse>> getRoles() {
        return ApiResponse.<List<RoleResponse>>builder()
                .message("Success!")
                .result(roleService.getAllRoles())
                .build();
    }

}
