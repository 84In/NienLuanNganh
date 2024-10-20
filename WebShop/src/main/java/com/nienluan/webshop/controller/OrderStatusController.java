package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.request.OrderStatusRequest;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.OrderStatusResponse;
import com.nienluan.webshop.service.OrderStatusService;
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
public class OrderStatusController {
    OrderStatusService orderStatusService;

    @PostMapping
    public ApiResponse<?> createStatusOrder(@RequestBody OrderStatusRequest request) {
        return ApiResponse.<OrderStatusResponse>builder()
                .message("Create status order successfully")
                .result(orderStatusService.createStatusOrder(request))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getStatusOrder(@PathVariable String id) {
        return ApiResponse.<OrderStatusResponse>builder()
                .message("Get status order successfully")
                .result(orderStatusService.getStatusOrder(id))
                .build();
    }

    @GetMapping
    public ApiResponse<?> getAllStatusOrder(Pageable pageable) {
        return ApiResponse.<Page<OrderStatusResponse>>builder()
                .message("Get all status order successfully")
                .result(orderStatusService.getAllStatusOrder(pageable))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<?> updateStatusOrder(@PathVariable String id, OrderStatusRequest request) {
        return ApiResponse.<OrderStatusResponse>builder()
                .message("Update status order successfully")
                .result(orderStatusService.updateStatusOrder(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteStatusOrder(@PathVariable String id) {
        orderStatusService.deleteStatusOrder(id);
        return ApiResponse.<Void>builder()
                .message("Delete status order successfully")
                .build();
    }
}
