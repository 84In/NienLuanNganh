package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.request.OrderRequest;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.OrderResponse;
import com.nienluan.webshop.dto.response.VNPayResponse;
import com.nienluan.webshop.dto.response.ZaloPayResponse;
import com.nienluan.webshop.entity.Order;
import com.nienluan.webshop.exception.AppException;
import com.nienluan.webshop.exception.ErrorCode;
import com.nienluan.webshop.repository.OrderRepository;
import com.nienluan.webshop.repository.OrderStatusRepository;
import com.nienluan.webshop.service.OrderService;
import com.nienluan.webshop.service.PaymentService;
import com.nienluan.webshop.service.ZaloPayService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;

@Slf4j
@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {
    ZaloPayService zaloPayService;
    @Value("${client.url}")
    @NonFinal
    String clientUrl;

    OrderService orderService;
    OrderRepository orderRepository;
    OrderStatusRepository orderStatusRepository;
    PaymentService paymentService;
    HttpSession httpSession;

    @PostMapping("/cash")
    public ApiResponse<?> payWithCash(@RequestBody OrderRequest request) {
        return ApiResponse.<OrderResponse>builder()
                .message("Create order successfully")
                .result(orderService.createOrderWithCash(request))
                .build();
    }

    @PostMapping("/vnpay")
    public ApiResponse<VNPayResponse> payWithVNPay(HttpServletRequest request, @RequestBody OrderRequest orderRequest) {
        // Begin payment process with VNPay
        httpSession.setAttribute("orderRequest", orderRequest);
        return ApiResponse.<VNPayResponse>builder()
                .result(orderService.createVNPayPayment(request, orderRequest))
                .build();
    }

    @PostMapping("/zalopay")
    public ApiResponse<ZaloPayResponse> payWithZalopay(@RequestBody OrderRequest orderRequest) throws IOException {
        return ApiResponse.<ZaloPayResponse>builder().result(orderService.createZaloPayPayment(orderRequest)).build();
    }

    @GetMapping("/vnpay-callback")
    public ApiResponse<?> payCallbackHandler(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        String vnpResponseCode = request.getParameter("vnp_ResponseCode");
        String vnpTxnRef = request.getParameter("vnp_TxnRef");
        Order order = orderRepository.findById(vnpTxnRef)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        String redirectUrl;

        if (vnpResponseCode.equals("00")) {
            String confirmedStatus = "confirmed";
            String paymentStatus = "Success";
            OrderResponse orderResponse = orderService.createOrderWithVNPay(order, confirmedStatus, paymentStatus);
            redirectUrl = clientUrl + "payment-result?status=success&orderId=" + order.getId();
            response.sendRedirect(redirectUrl);
            return ApiResponse.<OrderResponse>builder()
                    .result(orderResponse)
                    .build();
        } else {
            String cancelledStatus = "cancelled";
            String paymentStatus = "Fail";
            OrderResponse orderResponse = orderService.createOrderWithVNPay(order, cancelledStatus, paymentStatus);
            redirectUrl = clientUrl + "payment-result?status=fail&orderId=" + order.getId();
            response.sendRedirect(redirectUrl);
            throw new AppException(ErrorCode.PAYMENT_FAIL);
        }
    }

    // zalopay-callback
    @GetMapping("/zalopay-callback")
    public ResponseEntity<Void> handleZaloPayCallback(
            @RequestParam("amount") Long amount,
            @RequestParam("appid") Integer appId,
            @RequestParam("apptransid") String appTransId,
            @RequestParam("bankcode") String bankCode,
            @RequestParam("checksum") String checksum,
            @RequestParam("discountamount") Long discountAmount,
            @RequestParam("pmcid") Integer pmcId,
            @RequestParam("status") Integer status) {

        log.info("Received ZaloPay callback request with parameters");

        try {
            // Chuẩn bị dữ liệu thành JSONObject để xử lý callback
            JSONObject callbackData = new JSONObject();
            callbackData.put("amount", amount);
            callbackData.put("appid", appId);
            callbackData.put("apptransid", appTransId);
            callbackData.put("bankcode", bankCode);
            callbackData.put("checksum", checksum);
            callbackData.put("discountamount", discountAmount);
            callbackData.put("pmcid", pmcId);
            callbackData.put("status", status);

            // Xử lý callbackor
            ;

            // URL kết quả để redirect client
            String resultUrl = orderService.callbackZaloPay(callbackData.toString()); // Đường dẫn đến trang kết quả
                                                                                      // trên client

            log.info(resultUrl);
            // Tạo ResponseEntity với mã 302 và URL trong header Location
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create(resultUrl))
                    .build();

        } catch (Exception e) {
            log.error("Error handling ZaloPay callback", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ApiResponse<?> getAllOrders(@RequestParam(required = false) String codeName, Pageable pageable) {
        return ApiResponse.<Page<OrderResponse>>builder()
                .message("Get all orders successfully")
                .result(orderService.getAllOrders(codeName, pageable))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getOrder(@PathVariable("id") String id) {
        return ApiResponse.<OrderResponse>builder()
                .message("Get order successful")
                .result(orderService.getOrder(id))
                .build();
    }

    @GetMapping("/current-user")
    public ApiResponse<?> getOrder(Pageable pageable,
            @RequestParam(name = "status", required = false) String status,
            @RequestParam(name = "search", required = false) String search) {
        return ApiResponse.<Page<OrderResponse>>builder()
                .message("Get order successful")
                .result(orderService.getOrderCurrentUser(pageable, status, search))
                .build();
    }

    @PutMapping("/change-status/{id}")
    public ApiResponse<?> changeOrderStatus(@PathVariable("id") String id,
            @RequestParam(name = "status", required = false) String status) {
        return ApiResponse.<OrderResponse>builder()
                .message("Change order status successfully")
                .result(orderService.changeOrderStatus(id, status))
                .build();
    }
}
