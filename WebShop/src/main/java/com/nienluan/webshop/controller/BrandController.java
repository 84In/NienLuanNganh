package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.request.BrandRequest;
import com.nienluan.webshop.dto.request.BrandUpdateRequest;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.BrandResponse;
import com.nienluan.webshop.entity.Brand;
import com.nienluan.webshop.service.BrandService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/brands")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BrandController {

    BrandService brandService;

    @PostMapping
    public ApiResponse<BrandResponse> createBrand(@RequestBody BrandRequest request) {
        return ApiResponse.<BrandResponse>builder()
                .result(brandService.createBrand(request))
                .build();
    }

    @GetMapping
    public ApiResponse<Page<BrandResponse>> getAllBrands(Pageable pageable) {
        return ApiResponse.<Page<BrandResponse>>builder()
                .result(brandService.getAllBrands(pageable))
                .build();
    }

    @GetMapping("/{brandId}")
    public ApiResponse<BrandResponse> getBrandById(@PathVariable String brandId) {
        return ApiResponse.<BrandResponse>builder()
                .result(brandService.getBrand(brandId))
                .build();
    }
    @PutMapping("/{brandId}")
    public ApiResponse<BrandResponse> updateBrand(@PathVariable String brandId, @RequestBody BrandUpdateRequest request) {
        return ApiResponse.<BrandResponse>builder()
                .result(brandService.updateBrand(brandId,request))
                .build();
    }

    @DeleteMapping("/{brandId}")
    public ApiResponse<Void> deleteBrand(@PathVariable String brandId) {
        brandService.deleteBrand(brandId);
        return ApiResponse.<Void>builder()
                .message("Deleted brand!")
                .build();
    }



}
