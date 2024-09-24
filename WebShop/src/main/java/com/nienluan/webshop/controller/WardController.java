package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.WardResponse;
import com.nienluan.webshop.service.WardService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/wards")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WardController {

    WardService wardService;

    @GetMapping
    public ApiResponse<List<WardResponse>> getAllWards() {
        return ApiResponse.<List<WardResponse>>builder()
                .result(wardService.getAllWards())
                .build();
    }

    @GetMapping("/{district}")
    public ApiResponse<List<WardResponse>> getAllWardsByDistrict(@PathVariable Integer district) {
        return ApiResponse.<List<WardResponse>>builder()
                .result(wardService.getWardsByDistrict(district))
                .build();
    }
}
