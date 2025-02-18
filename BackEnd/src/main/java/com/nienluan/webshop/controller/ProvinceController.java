package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.ProvinceResponse;
import com.nienluan.webshop.service.ProvinceService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/provinces")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProvinceController {

    ProvinceService provinceService;

    @GetMapping
    public ApiResponse<List<ProvinceResponse>> getProvinces() {
        return ApiResponse.<List<ProvinceResponse>>builder()
                .result(provinceService.getProvinces())
                .build();
    }
}
