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
@RequestMapping("/api/v1/roles")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleController {

    RoleService roleService;

    @PostMapping
    public ApiResponse<RoleResponse> createRole(@RequestBody RoleRequest request) {
        return ApiResponse.<RoleResponse>builder()
                .message("Create success!")
                .result(roleService.createRole(request))
                .build();
    }

    @GetMapping
    public ApiResponse<List<RoleResponse>> getRoles() {
        return ApiResponse.<List<RoleResponse>>builder()
                .message("Success")
                .result(roleService.getAllRoles())
                .build();
    }

    @DeleteMapping("/{roleName}")
    public ApiResponse<Void> deleteRole(@PathVariable String roleName) {
        roleService.deleteRole(roleName);
        return ApiResponse.<Void>builder()
                .message("Delete successful")
                .build();
    }

}
