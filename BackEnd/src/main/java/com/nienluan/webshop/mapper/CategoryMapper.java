package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.CategoryRequest;
import com.nienluan.webshop.dto.request.CategoryUpdateRequest;
import com.nienluan.webshop.dto.response.CategoryResponse;
import com.nienluan.webshop.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryMapper {


    Category toCategory(CategoryRequest request);

    CategoryResponse toCategoryResponse(Category category);

    void updateCategory(@MappingTarget Category category, CategoryUpdateRequest request);
}
