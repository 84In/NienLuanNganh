package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.request.StatusOrderRequest;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.StatusOrderResponse;
import com.nienluan.webshop.service.StatusOrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/status-order")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StatusOrderController {
    StatusOrderService statusOrderService;

    @PostMapping
    public ApiResponse<?> createStatusOrder(@RequestBody StatusOrderRequest request) {
        return ApiResponse.<StatusOrderResponse>builder()
                .message("Create status order successfully")
                .result(statusOrderService.createStatusOrder(request))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getStatusOrder(@PathVariable String id) {
        return ApiResponse.<StatusOrderResponse>builder()
                .message("Get status order successfully")
                .result(statusOrderService.getStatusOrder(id))
                .build();
    }

    @GetMapping
    public ApiResponse<?> getAllStatusOrder(Pageable pageable) {
        return ApiResponse.<Page<StatusOrderResponse>>builder()
                .message("Get all status order successfully")
                .result(statusOrderService.getAllStatusOrder(pageable))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<?> updateStatusOrder(@PathVariable String id, StatusOrderRequest request) {
        return ApiResponse.<StatusOrderResponse>builder()
                .message("Update status order successfully")
                .result(statusOrderService.updateStatusOrder(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteStatusOrder(@PathVariable String id) {
        statusOrderService.deleteStatusOrder(id);
        return ApiResponse.<Void>builder()
                .message("Delete status order successfully")
                .build();
    }
}
