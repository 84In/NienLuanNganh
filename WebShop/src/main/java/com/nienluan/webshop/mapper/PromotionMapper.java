package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.PromotionRequest;
import com.nienluan.webshop.dto.request.PromotionUpdateRequest;
import com.nienluan.webshop.dto.request.UserCreationRequest;
import com.nienluan.webshop.dto.request.UserUpdateRequest;
import com.nienluan.webshop.dto.response.PromotionResponse;
import com.nienluan.webshop.dto.response.UserResponse;
import com.nienluan.webshop.entity.Promotion;
import com.nienluan.webshop.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PromotionMapper {

    Promotion toPromotion(PromotionRequest request);

    PromotionResponse toPromotionResponse(Promotion promotion);

    void updatePromotion(@MappingTarget Promotion promotion, PromotionUpdateRequest request);
}
