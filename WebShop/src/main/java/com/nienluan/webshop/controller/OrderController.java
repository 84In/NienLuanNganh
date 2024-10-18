package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.request.OrderRequest;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.OrderResponse;
import com.nienluan.webshop.service.OrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {
    OrderService orderService;

    @PostMapping("/cash")
    public ApiResponse<?> createOrder(@RequestBody OrderRequest request) {
        return ApiResponse.<OrderResponse>builder()
                .message("Create order successfully")
                .result(orderService.createOrderWithCash(request))
                .build();
    }

    @GetMapping
    public ApiResponse<?> getAllOrders(Pageable pageable) {
        return ApiResponse.<Page<OrderResponse>>builder()
                .message("Get all orders successfully")
                .result(orderService.getAllOrders(pageable))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getOrder(@PathVariable("id") String id) {
        return ApiResponse.<OrderResponse>builder()
                .message("Get order successful")
                .result(orderService.getOrder(id))
                .build();
    }

    @GetMapping("/current-user")
    public ApiResponse<?> getOrder(Pageable pageable, @RequestParam(name = "status", required = false) String status) {
        return ApiResponse.<Page<OrderResponse>>builder()
                .message("Get order successful")
                .result(orderService.getOrderCurrentUser(pageable, status))
                .build();
    }

    @PutMapping("/change-status/{id}")
    public ApiResponse<?> changeOrderStatus(@PathVariable("id") String id, @RequestParam(name = "status", required = false) String status) {
        return ApiResponse.<OrderResponse>builder()
                .message("Change order status successfully")
                .result(orderService.changeOrderStatus(id, status))
                .build();
    }
}
