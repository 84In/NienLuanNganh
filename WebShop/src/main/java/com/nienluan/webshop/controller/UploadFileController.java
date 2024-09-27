package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.service.UploadFileService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/upload")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UploadFileController {

    UploadFileService uploadFileService;

    @PostMapping("/banner/{name}")
    public ApiResponse<List<String>> uploadBanner(@PathVariable String name, @RequestParam("files")List<MultipartFile> files) {
        return ApiResponse.<List<String>>builder()
                .result(uploadFileService.uploadFile("banner", name, files))
                .build();
    }

    @PostMapping("/product/{name}")
    public ApiResponse<List<String>> uploadProduct(@PathVariable String name, @RequestParam("files")List<MultipartFile> files) {
        return ApiResponse.<List<String>>builder()
                .result(uploadFileService.uploadFile("product", name, files))
                .build();
    }

    @PostMapping("/avatar/{name}")
    public ApiResponse<List<String>> uploadAvatar(@PathVariable String name, @RequestParam("files")List<MultipartFile> files) {
        return ApiResponse.<List<String>>builder()
                .result(uploadFileService.uploadFile("avatar", name, files))
                .build();
    }

    @PostMapping("/category/{name}")
    public ApiResponse<List<String>> uploadCategory(@PathVariable String name, @RequestParam("files")List<MultipartFile> files) {
        return ApiResponse.<List<String>>builder()
                .result(uploadFileService.uploadFile("category", name, files))
                .build();
    }

}
