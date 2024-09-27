package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.request.CategoryRequest;
import com.nienluan.webshop.dto.request.CategoryUpdateRequest;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.CategoryResponse;
import com.nienluan.webshop.service.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {

    CategoryService categoryService;

    @PostMapping
    public ApiResponse<CategoryResponse> createCategory(@RequestBody CategoryRequest request) {
        return ApiResponse.<CategoryResponse>builder()
                .message("Created Successfully!")
                .result(categoryService.createdCategory(request))
                .build();
    }

    @GetMapping
    public ApiResponse<Page<CategoryResponse>> getCategories(Pageable pageable) {
        return ApiResponse.<Page<CategoryResponse>>builder()
                .message("Success!")
                .result(categoryService.getAllCategories(pageable))
                .build();
    }

    @GetMapping("/{categoryId}")
    public ApiResponse<CategoryResponse> getCategory(@PathVariable String categoryId) {
        return ApiResponse.<CategoryResponse>builder()
                .message("Success!")
                .result(categoryService.getCategory(categoryId))
                .build();
    }

    @PutMapping("/{categoryId}")
    public ApiResponse<CategoryResponse> updateCategory(@PathVariable String categoryId, @RequestBody CategoryUpdateRequest request) {
        return ApiResponse.<CategoryResponse>builder()
                .message("Success!")
                .result(categoryService.updateCategory(request,categoryId))
                .build();
    }


    @DeleteMapping("/{categoryId}")
    public ApiResponse<Void> deleteCategory(@PathVariable String categoryId) {
        categoryService.DeleteCategory(categoryId);
        return ApiResponse.<Void>builder()
                .message("Deleted Successfully!")
                .build();
    }

}
