package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.BrandResponse;
import com.nienluan.webshop.dto.response.ProductResponse;
import com.nienluan.webshop.dto.response.PromotionResponse;
import com.nienluan.webshop.service.BrandService;
import com.nienluan.webshop.service.ProductService;
import com.nienluan.webshop.service.PromotionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SearchController {
    ProductService productService;
    BrandService brandService;
    PromotionService promotionService;

    @GetMapping("/products")
    public ApiResponse<?> searchProductsBySearch(Pageable pageable,
                                                 @RequestParam Map<String, String> params
    ) {
        Page<ProductResponse> products = productService.getProductsBySearch(pageable, params);

        return ApiResponse.<Page<ProductResponse>>builder()
                .message("Get products successfully")
                .result(products)
                .build();
    }

    @GetMapping("/category/{codeName}")
    public ApiResponse<?> searchProductsByCategory(Pageable pageable,
                                                   @PathVariable("codeName") String codeName,
                                                   @RequestParam(name = "sortBy", required = false) String sortBy,
                                                   @RequestParam(name = "sortDirection", required = false) String sortDirection,
                                                   @RequestParam(name = "brand", required = false) List<String> brands,
                                                   @RequestParam(name = "min", required = false) String min,
                                                   @RequestParam(name = "max", required = false) String max
    ) {
        Page<ProductResponse> products = productService.getProductsByCategory(pageable, codeName, brands, min, max, sortBy, sortDirection);

        return ApiResponse.<Page<ProductResponse>>builder()
                .message("Get products successfully")
                .result(products)
                .build();
    }

    @GetMapping("/brand/{name}")
    public ApiResponse<List<BrandResponse>> getBrandsByName(@PathVariable("name") String name) {
        return ApiResponse.<List<BrandResponse>>builder()
                .result(brandService.searchBrandByName(name))
                .build();
    }

    @GetMapping("/promotion/{name}")
    public ApiResponse<List<PromotionResponse>> getPromotionsByName(@PathVariable("name") String name) {
        return ApiResponse.<List<PromotionResponse>>builder()
                .result(promotionService.searchPromotion(name))
                .build();
    }


}
