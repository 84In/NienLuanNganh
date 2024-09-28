package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.CategoryRequest;
import com.nienluan.webshop.dto.request.CategoryUpdateRequest;
import com.nienluan.webshop.dto.response.CategoryResponse;
import com.nienluan.webshop.entity.Category;
import com.nienluan.webshop.exception.AppException;
import com.nienluan.webshop.exception.ErrorCode;
import com.nienluan.webshop.mapper.CategoryMapper;
import com.nienluan.webshop.repository.CategoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryService {

    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    public CategoryResponse createdCategory(CategoryRequest request){
        if(categoryRepository.existsByName(request.getName())){
            throw new AppException(ErrorCode.CATEGORY_EXISTED);
        }
        Category category = categoryMapper.toCategory(request);
        return categoryMapper.toCategoryResponse(categoryRepository.save(category));
    }

    public CategoryResponse updateCategory(CategoryUpdateRequest request, String id){
        Category categoryUpdate = categoryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));
        categoryMapper.updateCategory(categoryUpdate,request);
        return categoryMapper.toCategoryResponse(categoryRepository.save(categoryUpdate));
    }

    public Page<CategoryResponse> getAllCategories(Pageable pageable){
        var categories = categoryRepository.findAll(pageable);
        return categories.map(categoryMapper::toCategoryResponse);
    }

    public CategoryResponse getCategory(String id){
        var category = categoryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));
        return categoryMapper.toCategoryResponse(category);
    }

    public void DeleteCategory(String id){
        categoryRepository.deleteById(id);
    }



}
