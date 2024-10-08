package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.request.CartRequest;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.CartResponse;
import com.nienluan.webshop.service.CartService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/carts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartController {

    CartService cartService;

    @PostMapping
    public ApiResponse<CartResponse> createCart(@RequestBody CartRequest request) {
        return ApiResponse.<CartResponse>builder()
                .message("Create success!")
                .result(cartService.createCart(request))
                .build();
    }

    @GetMapping
    public ApiResponse<Page<CartResponse>> getAllCart(Pageable pageable) {
        return ApiResponse.<Page<CartResponse>>builder()
                .message("Success")
                .result(cartService.getAllCarts(pageable))
                .build();
    }

    @GetMapping("/{username}")
    public ApiResponse<CartResponse> getCart(@PathVariable("username") String username) {
        return ApiResponse.<CartResponse>builder()
                .message("Success")
                .result(cartService.getCart(username))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<CartResponse> updateCart(@RequestBody CartRequest request) {
        return ApiResponse.<CartResponse>builder()
                .message("Success")
                .result(cartService.updateCart(request))
                .build();
    }

    @DeleteMapping("/{cartName}")
    public ApiResponse<Void> deleteCart(@PathVariable String cartName) {
        cartService.deleteCart(cartName);
        return ApiResponse.<Void>builder()
                .message("Delete successful")
                .build();
    }

}
