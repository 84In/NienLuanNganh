package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.request.CartRequest;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.CartResponse;
import com.nienluan.webshop.dto.response.SingleCartResponse;
import com.nienluan.webshop.service.CartService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/carts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartController {

    CartService cartService;

    @PostMapping
    public ApiResponse<?> createCart(@RequestBody CartRequest request) {
        return ApiResponse.<CartResponse>builder()
                .message("Create success!")
                .result(cartService.createCart(request))
                .build();
    }

    @GetMapping
    public ApiResponse<?> getAllCart(Pageable pageable) {
        return ApiResponse.<Page<CartResponse>>builder()
                .message("Success")
                .result(cartService.getAllCarts(pageable))
                .build();
    }

    @GetMapping("/{username}")
    public ApiResponse<?> getCart(@PathVariable("username") String username) {
        return ApiResponse.<CartResponse>builder()
                .message("Success")
                .result(cartService.getCart(username))
                .build();
    }

    @PutMapping
    public ApiResponse<?> updateCart(@RequestBody CartRequest request) {
        return ApiResponse.<SingleCartResponse>builder()
                .message("Success")
                .result(cartService.updateCart(request))
                .build();
    }

    @DeleteMapping("/{username}")
    public ApiResponse<?> deleteCart(@PathVariable("username") String username) {
        cartService.deleteCart(username);
        return ApiResponse.<Void>builder()
                .message("Delete successful")
                .build();
    }

}
