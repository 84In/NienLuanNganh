package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.ImageRequest;
import com.nienluan.webshop.dto.request.ImageUpdateRequest;
import com.nienluan.webshop.dto.response.ImageResponse;
import com.nienluan.webshop.entity.Image;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ImageMapper {

    Image toImage(ImageRequest request);
    ImageResponse toImageResponse(Image image);

    void updateImage(@MappingTarget Image image, ImageUpdateRequest request);
}
