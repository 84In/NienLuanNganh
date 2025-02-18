package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.PaymentMethodRequest;
import com.nienluan.webshop.dto.response.PaymentMethodResponse;
import com.nienluan.webshop.entity.PaymentMethod;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PaymentMethodMapper {
    PaymentMethod toPaymentMethod(PaymentMethodRequest request);

    PaymentMethodResponse toPaymentMethodResponse(PaymentMethod paymentMethod);

    void updatePaymentMethod(@MappingTarget PaymentMethod paymentMethod, PaymentMethodRequest request);
}
