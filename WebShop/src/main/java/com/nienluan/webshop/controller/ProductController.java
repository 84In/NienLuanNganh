package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.ProductCsvDTO;
import com.nienluan.webshop.dto.request.ProductRequest;
import com.nienluan.webshop.dto.request.ProductUpdateRequest;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.ProductResponse;
import com.nienluan.webshop.exception.AppException;
import com.nienluan.webshop.exception.ErrorCode;
import com.nienluan.webshop.service.CsvService;
import com.nienluan.webshop.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController {
    ProductService productService;
    private final CsvService csvService;

    @PostMapping
    public ApiResponse<ProductResponse> createProduct(@RequestBody ProductRequest request) {
        return ApiResponse.<ProductResponse>builder()
                .result(productService.createProduct(request))
                .build();
    }

    @GetMapping
    public ApiResponse<Page<ProductResponse>> getAllProducts(
            Pageable pageable,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDirection
    ) {
        if(sortBy == null || sortDirection == null) {
            return ApiResponse.<Page<ProductResponse>>builder()
                    .result(productService.getAllProducts(pageable))
                    .build();
        }
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        PageRequest sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);

        return ApiResponse.<Page<ProductResponse>>builder()
                .result(productService.getAllProducts(sortedPageable))
                .build();
    }

    @GetMapping("/{productId}")
    public ApiResponse<ProductResponse> getProduct(@PathVariable String productId) {
        return ApiResponse.<ProductResponse>builder()
                .result(productService.getProduct(productId))
                .build();
    }

    @PutMapping("/{productId}")
    public ApiResponse<ProductResponse> updateProduct(@PathVariable String productId,@RequestPart MultipartFile[] files, @RequestBody ProductUpdateRequest request) {
        return ApiResponse.<ProductResponse>builder()
                .result(productService.updateProduct(request,productId))
                .build();
    }

    @DeleteMapping("/{productId}")
    public ApiResponse<Void> deleteProduct(@PathVariable String productId) {
        productService.deleteProduct(productId);
        return ApiResponse.<Void>builder()
                .message("Product deleted!")
                .build();
    }

    @PostMapping("/upload-csv/{categoryId}")
    public ApiResponse<Void> uploadCsv(@PathVariable String categoryId, @RequestParam("file") MultipartFile file) {
        if(file.isEmpty()){
            return ApiResponse.<Void>builder()
                    .code(ErrorCode.FILE_EMPTY.getCode())
                    .message(ErrorCode.FILE_EMPTY.getMessage())
                    .build();
        }
        try{
            List<ProductCsvDTO> products = csvService.parseCsvFile(file);
            productService.saveProductsFromCsv(products, categoryId);
            return ApiResponse.<Void>builder()
                    .message("Products saved!")
                    .build();
        } catch (IOException e) {
            throw new AppException(ErrorCode.PARSE_ERROR);
        }
    }


}
