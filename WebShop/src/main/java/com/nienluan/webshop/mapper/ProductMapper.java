package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.ProductRequest;
import com.nienluan.webshop.dto.request.ProductUpdateRequest;
import com.nienluan.webshop.dto.response.ProductResponse;
import com.nienluan.webshop.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(source = "category_id", target = "category.id")
    @Mapping(source = "brand_id", target = "brand.id")
    Product toProduct(ProductRequest productRequest);

    @Mapping(source = "category.id", target = "category_id")
    @Mapping(source = "brand.id", target = "brand_id")
    ProductResponse toProductResponse(Product product);

    @Mapping(target = "promotions", ignore = true)
    void updateProduct(@MappingTarget Product product, ProductUpdateRequest productUpdateRequest);
}
