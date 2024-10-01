package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.PaymentRequest;
import com.nienluan.webshop.dto.response.PaymentResponse;
import com.nienluan.webshop.entity.Payment;
import com.nienluan.webshop.exception.AppException;
import com.nienluan.webshop.exception.ErrorCode;
import com.nienluan.webshop.mapper.PaymentMapper;
import com.nienluan.webshop.repository.PaymentRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentService {
    PaymentRepository paymentRepository;
    PaymentMapper paymentMapper;

    public PaymentResponse getPayment(String id) {
        return paymentMapper.toPaymentResponse(paymentRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PAYMENT_METHOD_NOT_EXISTED)));
    }

    public Page<PaymentResponse> getAllPayment(Pageable pageable) {
        return paymentRepository.findAll(pageable).map(paymentMapper::toPaymentResponse);
    }

    public PaymentResponse createPayment(PaymentRequest request) {
        return paymentMapper.toPaymentResponse(paymentRepository.save(paymentMapper.toPayment(request)));
    }

    public PaymentResponse updatePayment(String id, PaymentRequest request) {
        Payment payment = paymentRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PAYMENT_METHOD_NOT_EXISTED));
        paymentMapper.updatePayment(payment, request);
        return paymentMapper.toPaymentResponse(paymentRepository.save(payment));
    }

    public void deletePayment(String id) {
        paymentRepository.deleteById(id);
    }
}
