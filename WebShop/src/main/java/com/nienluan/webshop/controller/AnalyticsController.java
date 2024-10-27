package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.AnalyticsDTO;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.service.AnalyticsService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/analytics")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AnalyticsController {

    AnalyticsService analyticsService;

    @GetMapping
    public ApiResponse<AnalyticsDTO> getAnalytics() {
        return ApiResponse.<AnalyticsDTO>builder().result(analyticsService.getAnalytics()).build();
    }
}
