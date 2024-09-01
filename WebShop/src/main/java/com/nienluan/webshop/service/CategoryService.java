package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.CategoryRequest;
import com.nienluan.webshop.dto.request.CategoryUpdateRequest;
import com.nienluan.webshop.dto.response.CategoryResponse;
import com.nienluan.webshop.entity.Category;
import com.nienluan.webshop.mapper.CategoryMapper;
import com.nienluan.webshop.repository.CategoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryService {

    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    @NonFinal
    @Value("${file.upload-dir}")
    String uploadDir;

    public CategoryResponse CreatedCategory(CategoryRequest request, MultipartFile file){

        Category category = categoryMapper.toCategory(request);

        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }
        String uploadPath = uploadDir + File.separator + category.getName();
        Path path = Paths.get(uploadPath);
        try {
            if (!Files.exists(path)) {
                // Tạo thư mục nếu chưa tồn tại
                Files.createDirectories(path);
            }
            // Tạo đường dẫn tới file
            Path filePath = Paths.get(uploadDir + File.separator + file.getOriginalFilename());
            // Tạo thư mục nếu chưa tồn tại
            Files.createDirectories(filePath.getParent());
            // Lưu file
            Files.write(filePath, file.getBytes());
            category.setImage(filePath.getFileName().toString());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return categoryMapper.toCategoryResponse(categoryRepository.save(category));
    }

    public CategoryResponse UpdateCategory(CategoryUpdateRequest request, MultipartFile file, String id){
        String uploadPath = uploadDir + File.separator + request.getName();
        Path path = Paths.get(uploadPath);
        Category categoryUpdate = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));

        try {
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }
             if(!file.isEmpty()){
                 Path filePath = Paths.get(uploadDir + File.separator + file.getOriginalFilename());
                 Files.write(filePath, file.getBytes());
                 categoryUpdate.setImage(filePath.getFileName().toString());
             }else {
                categoryMapper.updateCategory(categoryUpdate,request);
             }
        }catch (IOException e) {
            throw new RuntimeException(e);
        }
        return categoryMapper.toCategoryResponse(categoryRepository.save(categoryUpdate));
    }

    public Page<CategoryResponse> getAllCategories(Pageable pageable){
        var categories = categoryRepository.findAll(pageable);
        return categories.map(categoryMapper::toCategoryResponse);
    }

    public CategoryResponse getCategory(String id){
        var category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
        return categoryMapper.toCategoryResponse(category);
    }

    public void DeleteCategory(String id){
        categoryRepository.deleteById(id);
    }



}
