package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.DistrictResponse;
import com.nienluan.webshop.service.DistrictService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/districts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DistrictController {

    DistrictService districtService;

    @GetMapping
    public ApiResponse<List<DistrictResponse>> getAllDistricts() {
        return ApiResponse.<List<DistrictResponse>>builder()
                .result(districtService.getAllDistricts())
                .build();
    }

    @GetMapping("/{province}")
    public ApiResponse<List<DistrictResponse>> getDistrictsByProvince(@PathVariable Integer province) {
        return ApiResponse.<List<DistrictResponse>>builder()
                .result(districtService.getDistrictsByProvince(province))
                .build();
    }

}
