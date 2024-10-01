package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.request.PaymentMethodRequest;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.PaymentMethodResponse;
import com.nienluan.webshop.service.PaymentMethodService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payment-method")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentMethodController {
    PaymentMethodService paymentMethodService;

    @PostMapping
    public ApiResponse<?> createPaymentMethod(@RequestBody PaymentMethodRequest request) {
        return ApiResponse.<PaymentMethodResponse>builder()
                .message("Create payment method successfully")
                .result(paymentMethodService.createPaymentMethod(request))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getPaymentMethod(@PathVariable String id) {
        return ApiResponse.<PaymentMethodResponse>builder()
                .message("Get payment method successfully")
                .result(paymentMethodService.getPaymentMethod(id))
                .build();
    }

    @GetMapping
    public ApiResponse<?> getAllPaymentMethod(Pageable pageable) {
        return ApiResponse.<Page<PaymentMethodResponse>>builder()
                .message("Get all payment method successfully")
                .result(paymentMethodService.getAllPaymentMethod(pageable))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<?> updatePaymentMethod(@PathVariable String id, @RequestBody PaymentMethodRequest request) {
        return ApiResponse.<PaymentMethodResponse>builder()
                .message("Update payment method successfully")
                .result(paymentMethodService.updatePaymentMethod(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deletePaymentMethod(@PathVariable String id) {
        paymentMethodService.deletePaymentMethod(id);
        return ApiResponse.<Void>builder()
                .message("Delete payment method successfully")
                .build();
    }
}
