package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.PaymentRequest;
import com.nienluan.webshop.dto.response.PaymentResponse;
import com.nienluan.webshop.entity.Payment;
import com.nienluan.webshop.entity.PaymentMethod;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PaymentMapper {
    Payment toPayment(PaymentRequest request);

    PaymentResponse toPaymentResponse(Payment payment);

    void updatePayment(@MappingTarget Payment payment, PaymentRequest request);
}
