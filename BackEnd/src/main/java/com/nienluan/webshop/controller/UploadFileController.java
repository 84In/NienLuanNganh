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

    @PostMapping("/{type}/{name}")
    public ApiResponse<List<String>> uploadImages(@PathVariable String type, @PathVariable String name, @RequestParam("files") List<MultipartFile> files) {
        return ApiResponse.<List<String>>builder()
                .result(uploadFileService.uploadFiles(type, name, files))
                .build();
    }

}
