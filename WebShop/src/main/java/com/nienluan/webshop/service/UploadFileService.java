package com.nienluan.webshop.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UploadFileService {
    @NonFinal
    @Value("${file.upload-path}")
    String UPLOAD_DIR;

    public List<String> uploadFile(String type, String name, List<MultipartFile> files) {
        File uploadDir = new File(UPLOAD_DIR + type + "/" + name);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        List<String> filePaths = new ArrayList<>();

        for (MultipartFile file : files) {
            File uploadedFile = new File(uploadDir, file.getOriginalFilename());
            System.out.println("Original filename: " + file.getOriginalFilename());

            try(InputStream inputStream = file.getInputStream()) {
//                file.transferTo(uploadedFile);
                Files.copy(inputStream, uploadedFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
                String filePath = "/images/" + type + "/" + name + "/" + file.getOriginalFilename();
                filePaths.add(filePath);
            }catch (IOException e) {
                System.err.println("Error uploading file: " + file.getOriginalFilename());
                System.err.println("Target path: " + uploadedFile.getAbsolutePath());
                System.err.println("Error: " + e.getMessage());
                throw new RuntimeException(e);
            }

        }
        return filePaths;
    }

}
