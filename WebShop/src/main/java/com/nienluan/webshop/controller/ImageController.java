package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.request.ImageRequest;
import com.nienluan.webshop.dto.request.ImageUpdateRequest;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.ImageResponse;
import com.nienluan.webshop.service.ImageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/images")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ImageController {
    ImageService imageService;


    @PostMapping
    public ApiResponse<ImageResponse> createImage(@RequestBody ImageRequest request) {
        return ApiResponse.<ImageResponse>builder()
                .result(imageService.createImage(request))
                .build();
    }

    @PostMapping("/all")
    public ApiResponse<List<ImageResponse>> createImages(@RequestBody List<ImageRequest> requests) {
        return ApiResponse.<List<ImageResponse>>builder().result(imageService.createImages(requests)).build();
    }

    @GetMapping
    public ApiResponse<Page<ImageResponse>> getAllImages(Pageable pageable) {
        return ApiResponse.<Page<ImageResponse>>builder()
                .result(imageService.getAllImages(pageable))
                .build();
    }
    @GetMapping("/{imageId}")
    public ApiResponse<ImageResponse> getImage(@PathVariable String imageId) {
        return ApiResponse.<ImageResponse>builder().result(imageService.getImage(imageId)).build();
    }

    @GetMapping("/category/{categoryId}")
    public ApiResponse<List<ImageResponse>> getImagesByCategory(@PathVariable String categoryId) {
        return ApiResponse.<List<ImageResponse>>builder().result(imageService.getImageByCategory(categoryId)).build();
    }

    @GetMapping("/product/{productId}")
    public ApiResponse<List<ImageResponse>> getImagesByProduct(@PathVariable String productId) {
        return ApiResponse.<List<ImageResponse>>builder().result(imageService.getImagesByProduct(productId)).build();
    }

    @PutMapping("/{imageId}")
    public ApiResponse<ImageResponse> updateImage(@PathVariable String imageId, @RequestBody ImageUpdateRequest request) {
        return ApiResponse.<ImageResponse>builder().result(imageService.updateImage(imageId,request)).build();
    }

    @DeleteMapping("/{imageId}")
    public ApiResponse<Void> deleteImage(@PathVariable String imageId) {
        imageService.deleteImage(imageId);
        return ApiResponse.<Void>builder().message("Image is deleted!").build();
    }

}
