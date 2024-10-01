package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.StatusOrderRequest;
import com.nienluan.webshop.dto.response.StatusOrderResponse;
import com.nienluan.webshop.entity.StatusOrder;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface StatusOrderMapper {
    StatusOrder toStatusOrder(StatusOrderRequest request);
    StatusOrderResponse toStatusOrderResponse(StatusOrder statusOrder);
    void updateStatusOrder(@MappingTarget StatusOrder statusOrder, StatusOrderRequest request);
}
