package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.StatusOrderRequest;
import com.nienluan.webshop.dto.response.StatusOrderResponse;
import com.nienluan.webshop.entity.StatusOrder;
import com.nienluan.webshop.exception.AppException;
import com.nienluan.webshop.exception.ErrorCode;
import com.nienluan.webshop.mapper.StatusOrderMapper;
import com.nienluan.webshop.repository.StatusOrderRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StatusOrderService {
    StatusOrderRepository statusOrderRepository;
    StatusOrderMapper statusOrderMapper;

    public StatusOrderResponse getStatusOrder(String id) {
        return statusOrderMapper.toStatusOrderResponse(statusOrderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.STATUS_ORDER_NOT_EXISTED)));
    }

    public Page<StatusOrderResponse> getAllStatusOrder(Pageable pageable) {
        return statusOrderRepository.findAll(pageable).map(statusOrderMapper::toStatusOrderResponse);
    }

    public StatusOrderResponse createStatusOrder(StatusOrderRequest request) {
        return statusOrderMapper.toStatusOrderResponse(statusOrderRepository.save(statusOrderMapper.toStatusOrder(request)));
    }

    public StatusOrderResponse updateStatusOrder(String id, StatusOrderRequest request) {
        StatusOrder statusOrder = statusOrderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.STATUS_ORDER_NOT_EXISTED));
        statusOrderMapper.updateStatusOrder(statusOrder, request);
        return statusOrderMapper.toStatusOrderResponse(statusOrderRepository.save(statusOrder));
    }

    public void deleteStatusOrder(String id) {
        statusOrderRepository.deleteById(id);
    }
}
