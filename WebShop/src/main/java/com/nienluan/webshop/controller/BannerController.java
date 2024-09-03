package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.request.BannerRequest;
import com.nienluan.webshop.dto.request.BannerUpdateRequest;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.BannerResponse;
import com.nienluan.webshop.service.BannerService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/banners")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BannerController {

    BannerService bannerService;

    @PostMapping
    public ApiResponse<BannerResponse> createBanner(@RequestBody BannerRequest request) {
        return ApiResponse.<BannerResponse>builder()
                .result(bannerService.createBanner(request))
                .build();
    }

    @GetMapping
    public ApiResponse<Page<BannerResponse>> getAllBanners(Pageable pageable) {
        return ApiResponse.<Page<BannerResponse>>builder()
                .result(bannerService.getAllBanners(pageable))
                .build();
    }

    @GetMapping("/{bannerId}")
    public ApiResponse<BannerResponse> getBannerById(@PathVariable String bannerId) {
        return ApiResponse.<BannerResponse>builder()
                .result(bannerService.getBanner(bannerId))
                .build();
    }

    @PutMapping("/{bannerId}")
    public ApiResponse<BannerResponse> updateBanner(@PathVariable String bannerId, @RequestBody BannerUpdateRequest request) {
        return ApiResponse.<BannerResponse>builder().result(bannerService.updateBanner(bannerId,request)).build();
    }

    @DeleteMapping("/{bannerId}")
    public ApiResponse<Void> deleteBanner(@PathVariable String bannerId) {
        bannerService.deleteBanner(bannerId);
        return ApiResponse.<Void>builder().message("Deleted Banner!").build();
    }

}
