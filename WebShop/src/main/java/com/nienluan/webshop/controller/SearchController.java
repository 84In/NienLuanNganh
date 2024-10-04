package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.BrandResponse;
import com.nienluan.webshop.dto.response.ProductResponse;
import com.nienluan.webshop.service.BrandService;
import com.nienluan.webshop.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SearchController {
    ProductService productService;
    BrandService brandService;

    @GetMapping("/category/{codeName}")
    public ApiResponse<?> searchProductsByCategory(Pageable pageable,
                                                   @PathVariable("codeName") String codeName,
                                                   @RequestParam(required = false) String sortBy,
                                                   @RequestParam(required = false) String sortDirection
    ) {
        if(sortBy == null || sortDirection == null) {
            return ApiResponse.<Page<ProductResponse>>builder()
                    .message("Get products successfully")
                    .result(productService.getProductsByCategory(pageable, codeName))
                    .build();
        }
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        PageRequest sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);

        return ApiResponse.<Page<ProductResponse>>builder()
                .message("Get products successfully")
                .result(productService.getProductsByCategory(sortedPageable, codeName))
                .build();
    }

    @GetMapping("/brand/{name}")
    public ApiResponse<List<BrandResponse>> getBrandsByName(@PathVariable("name") String name){
        return ApiResponse.<List<BrandResponse>>builder()
                .result(brandService.searchBrandByName(name))
                .build();
    }
}
