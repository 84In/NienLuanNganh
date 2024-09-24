package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.WardRequest;
import com.nienluan.webshop.dto.response.WardResponse;
import com.nienluan.webshop.entity.Ward;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface WardMapper {
    Ward toWard(WardRequest request);
    WardResponse toWardResponse(Ward ward);
}
