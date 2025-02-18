package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.OrderStatusRequest;
import com.nienluan.webshop.dto.response.OrderStatusResponse;
import com.nienluan.webshop.entity.OrderStatus;
import com.nienluan.webshop.exception.AppException;
import com.nienluan.webshop.exception.ErrorCode;
import com.nienluan.webshop.mapper.OrderStatusMapper;
import com.nienluan.webshop.repository.OrderStatusRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderStatusService {
    OrderStatusRepository statusOrderRepository;
    OrderStatusMapper orderStatusMapper;

    public OrderStatusResponse getStatusOrder(String id) {
        return orderStatusMapper.toOrderStatusResponse(statusOrderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.STATUS_ORDER_NOT_EXISTED)));
    }

    public Page<OrderStatusResponse> getAllStatusOrder(Pageable pageable) {
        return statusOrderRepository.findAll(pageable).map(orderStatusMapper::toOrderStatusResponse);
    }

    public OrderStatusResponse createStatusOrder(OrderStatusRequest request) {
        return orderStatusMapper.toOrderStatusResponse(statusOrderRepository.save(orderStatusMapper.toOrderStatus(request)));
    }

    public OrderStatusResponse updateStatusOrder(String id, OrderStatusRequest request) {
        OrderStatus orderStatus = statusOrderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.STATUS_ORDER_NOT_EXISTED));
        orderStatusMapper.updateOrderStatus(orderStatus, request);
        return orderStatusMapper.toOrderStatusResponse(statusOrderRepository.save(orderStatus));
    }

    public void deleteStatusOrder(String id) {
        statusOrderRepository.deleteById(id);
    }
}
