package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.PromotionRequest;
import com.nienluan.webshop.dto.request.PromotionUpdateRequest;
import com.nienluan.webshop.dto.response.PromotionResponse;
import com.nienluan.webshop.entity.Promotion;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PromotionMapper {

    Promotion toPromotion(PromotionRequest request);

    PromotionResponse toPromotionResponse(Promotion promotion);

    void updatePromotion(@MappingTarget Promotion promotion, PromotionUpdateRequest request);
}
