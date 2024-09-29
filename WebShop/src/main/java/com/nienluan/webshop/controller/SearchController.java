package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.ProductResponse;
import com.nienluan.webshop.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SearchController {
    ProductService productService;

    @GetMapping("/category/{codeName}")
    public ApiResponse<?> searchProductsByCategory(Pageable pageable, @PathVariable("codeName") String codeName) {
        return ApiResponse.<Page<ProductResponse>>builder()
                .message("Get products successfully")
                .result(productService.getProductsByCategory(pageable, codeName))
                .build();
    }
}
