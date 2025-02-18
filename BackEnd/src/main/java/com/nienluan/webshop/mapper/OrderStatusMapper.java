package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.OrderStatusRequest;
import com.nienluan.webshop.dto.response.OrderStatusResponse;
import com.nienluan.webshop.entity.OrderStatus;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface OrderStatusMapper {
    OrderStatus toOrderStatus(OrderStatusRequest request);

    OrderStatusResponse toOrderStatusResponse(OrderStatus orderStatus);

    void updateOrderStatus(@MappingTarget OrderStatus orderStatus, OrderStatusRequest request);
}
