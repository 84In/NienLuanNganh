package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.BannerRequest;
import com.nienluan.webshop.dto.request.BannerUpdateRequest;
import com.nienluan.webshop.dto.response.BannerResponse;
import com.nienluan.webshop.entity.Banner;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BannerMapper{
    Banner toBanner(BannerRequest request);
    BannerResponse toBannerResponse(Banner banner);
    void updateBanner(@MappingTarget Banner banner, BannerUpdateRequest request);
}
