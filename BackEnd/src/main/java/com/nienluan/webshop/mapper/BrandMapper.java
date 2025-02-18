package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.BrandRequest;
import com.nienluan.webshop.dto.request.BrandUpdateRequest;
import com.nienluan.webshop.dto.response.BrandResponse;
import com.nienluan.webshop.entity.Brand;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BrandMapper {

    Brand toBrand(BrandRequest request);

    BrandResponse toBrandResponse(Brand brand);

    @Mapping(target = "products", ignore = true)
    void updateBrand(@MappingTarget Brand brand, BrandUpdateRequest request);
}
