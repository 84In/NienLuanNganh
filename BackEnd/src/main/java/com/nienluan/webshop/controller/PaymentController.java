package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.request.PaymentRequest;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.PaymentResponse;
import com.nienluan.webshop.service.PaymentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentController {
    PaymentService paymentService;

    @PostMapping
    public ApiResponse<?> createPayment(@RequestBody PaymentRequest request) {
        return ApiResponse.<PaymentResponse>builder()
                .message("Create payment successfully")
                .result(paymentService.createPayment(request))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getPayment(@PathVariable String id) {
        return ApiResponse.<PaymentResponse>builder()
                .message("Get payment successfully")
                .result(paymentService.getPayment(id))
                .build();
    }

    @GetMapping
    public ApiResponse<?> getAllPayment(Pageable pageable) {
        return ApiResponse.<Page<PaymentResponse>>builder()
                .message("Get all payment successfully")
                .result(paymentService.getAllPayment(pageable))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<?> updatePayment(@PathVariable String id, @RequestBody PaymentRequest request) {
        return ApiResponse.<PaymentResponse>builder()
                .message("Update payment successfully")
                .result(paymentService.updatePayment(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deletePayment(@PathVariable String id) {
        paymentService.deletePayment(id);
        return ApiResponse.<Void>builder()
                .message("Delete payment successfully")
                .build();
    }
}
