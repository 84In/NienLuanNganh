package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.CategoryRequest;
import com.nienluan.webshop.dto.request.CategoryUpdateRequest;
import com.nienluan.webshop.dto.response.CategoryResponse;
import com.nienluan.webshop.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    // Không ánh xạ image.id nếu không có thuộc tính image trong DTO
    @Mapping(target = "image", ignore = true)
    Category toCategory(CategoryRequest request);

    // Không ánh xạ image.id nếu không có thuộc tính image trong DTO
    @Mapping(target = "image", ignore = true)
    CategoryResponse toCategoryResponse(Category category);

    @Mapping(target = "image", ignore = true)
    void updateCategory(@MappingTarget Category category, CategoryUpdateRequest request);
}
