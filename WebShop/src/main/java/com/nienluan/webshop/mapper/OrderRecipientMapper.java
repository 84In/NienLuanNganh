package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.OrderRecipientRequest;
import com.nienluan.webshop.dto.response.OrderRecipientResponse;
import com.nienluan.webshop.entity.OrderRecipient;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface OrderRecipientMapper {
    OrderRecipient toOrderRecipient(OrderRecipientRequest request);

    OrderRecipientResponse toOrderRecipientResponse(OrderRecipient orderRecipient);

    void updateOrderRecipient(@MappingTarget OrderRecipient orderRecipient, OrderRecipientRequest request);
}
