package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.ProductRequest;
import com.nienluan.webshop.dto.request.ProductUpdateRequest;
import com.nienluan.webshop.dto.response.ProductResponse;
import com.nienluan.webshop.entity.Product;
import com.nienluan.webshop.entity.Promotion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(source = "categoryId", target = "category.id")
    @Mapping(source = "brandId", target = "brand.id")
    @Mapping(target = "promotions", ignore = true)
    Product toProduct(ProductRequest productRequest);

    ProductResponse toProductResponse(Product product);

    @Mapping(target = "promotions", ignore = true)
    void updateProduct(@MappingTarget Product product, ProductUpdateRequest productUpdateRequest);

}
