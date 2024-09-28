package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.PaymentMethodRequest;
import com.nienluan.webshop.dto.response.PaymentMethodResponse;
import com.nienluan.webshop.dto.response.PaymentMethodResponse;
import com.nienluan.webshop.entity.PaymentMethod;
import com.nienluan.webshop.exception.AppException;
import com.nienluan.webshop.exception.ErrorCode;
import com.nienluan.webshop.mapper.PaymentMethodMapper;
import com.nienluan.webshop.mapper.PaymentMethodMapper;
import com.nienluan.webshop.repository.PaymentMethodRepository;
import com.nienluan.webshop.repository.PaymentMethodRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentMethodService {
    PaymentMethodRepository paymentMethodRepository;
    PaymentMethodMapper paymentMethodMapper;

    public PaymentMethodResponse getPaymentMethod(String id) {
        return paymentMethodMapper.toPaymentMethodResponse(paymentMethodRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PAYMENT_METHOD_NOT_EXISTED)));
    }

    public Page<PaymentMethodResponse> getAllPaymentMethod(Pageable pageable) {
        return paymentMethodRepository.findAll(pageable).map(paymentMethodMapper::toPaymentMethodResponse);
    }

    public PaymentMethodResponse createPaymentMethod(PaymentMethodRequest request) {
        return paymentMethodMapper.toPaymentMethodResponse(paymentMethodRepository.save(paymentMethodMapper.toPaymentMethod(request)));
    }

    public PaymentMethodResponse updatePaymentMethod(String id, PaymentMethodRequest request) {
        PaymentMethod paymentMethod = paymentMethodRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PAYMENT_METHOD_NOT_EXISTED));
        paymentMethodMapper.updatePaymentMethod(paymentMethod, request);
        return paymentMethodMapper.toPaymentMethodResponse(paymentMethodRepository.save(paymentMethod));
    }

    public void deletePaymentMethod(String id) {
        paymentMethodRepository.deleteById(id);
    }
}
