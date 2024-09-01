package com.nienluan.webshop.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Set;

public class UploadFile {
    @Bean
    public static Set<String> uploadFileImages(String uploadDir, String name, MultipartFile[] files) {
        Set<String> fileNames = new HashSet<>();

        // Lấy base URL của server hiện tại
        String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();

        try {
            // Đường dẫn tới thư mục upload
            Path uploadDirPath = Paths.get(uploadDir).resolve(name);

            // Tạo thư mục nếu chưa tồn tại
            if (!Files.exists(uploadDirPath)) {
                Files.createDirectories(uploadDirPath);  // Tạo tất cả các thư mục cha nếu chưa tồn tại
            }

            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    // Đường dẫn tới file cần lưu
                    Path filePath = uploadDirPath.resolve(file.getOriginalFilename());

                    // Lưu file vào thư mục
                    Files.write(filePath, file.getBytes());

                    // Thêm đường dẫn đầy đủ của file vào danh sách trả về
                    fileNames.add(baseUrl + "/images/" + uploadDirPath.relativize(filePath).toString().replace(File.separator, "/"));
                }
            }
            return fileNames;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
