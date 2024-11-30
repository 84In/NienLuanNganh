package com.nienluan.webshop.service;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.nienluan.webshop.dto.request.OrderDetailRequest;
import com.nienluan.webshop.dto.request.OrderRequest;
import com.nienluan.webshop.dto.request.PaymentRequest;
import com.nienluan.webshop.dto.response.OrderDetailResponse;
import com.nienluan.webshop.dto.response.OrderResponse;
import com.nienluan.webshop.dto.response.VNPayResponse;
import com.nienluan.webshop.dto.response.ZaloPayResponse;
import com.nienluan.webshop.entity.*;
import com.nienluan.webshop.exception.AppException;
import com.nienluan.webshop.exception.ErrorCode;
import com.nienluan.webshop.mapper.*;
import com.nienluan.webshop.repository.*;
import com.nienluan.webshop.utils.HMACUtil;
import com.nienluan.webshop.utils.VNPayUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class OrderService {
    private static final Logger logger = LoggerFactory.getLogger(Logger.class);
    OrderStatusRepository statusOrderRepository;
    OrderRepository orderRepository;
    PaymentRepository paymentRepository;
    PaymentMethodRepository paymentMethodRepository;
    ProductRepository productRepository;
    UserRepository userRepository;
    OrderDetailRepository orderDetailRepository;
    OrderStatusMapper orderStatusMapper;
    UserMapper userMapper;
    PaymentMapper paymentMapper;
    PaymentMethodMapper paymentMethodMapper;
    ProductMapper productMapper;
    CartRepository cartRepository;
    OrderRecipientRepository orderRecipientRepository;
    OrderRecipientMapper orderRecipientMapper;
    MailService mailService;
    VNPayService vnPayService;
    ZaloPayService zaloPayService;

    @Value("${payment.zalopay.appid}")
    @NonFinal
    String appid;

    @Value("${payment.zalopay.key1}")
    @NonFinal
    String key1;
    @Value("${payment.zalopay.key2}")
    @NonFinal
    String key2;

    @Value("${payment.zalopay.create.endpoint}")
    @NonFinal
    String createEndpoint;
    @Value("${payment.zalopay.query.endpoint}")
    @NonFinal
    String queryEndpoint;
    @Value("${payment.zalopay.refund.endpoint}")
    @NonFinal
    String refundEndpoint;
    @Value("${payment.zalopay.returnUrl}")
    @NonFinal
    String returnUrl;

    long MAX_CHECK_DURATION_MS = 15 * 60 * 1000;


    @Transactional
    public OrderResponse createOrderWithCash(OrderRequest request) {

        Order order = createOrder(request);
        //Gửi mail khi tạo thành công đơn hàng
        mailService.sendOrderConfirmationEmail(order.getUser().getEmail(), order);

        return toOrderResponse(order, order.getOrderDetails());
    }

    public VNPayResponse createVNPayPayment(HttpServletRequest request, OrderRequest orderRequest) {
        Order order = createOrder(orderRequest);

        long amount = Long.parseLong(request.getParameter("amount")) * 100L;
        //String bankCode = request.getParameter("bankCode");
        Map<String, String> vnpParamsMap = vnPayService.getVNPayConfig();
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
        vnpParamsMap.put("vnp_TxnRef", order.getId());
        vnpParamsMap.put("vnp_OrderInfo", "Thanh toán đơn hàng:" + order.getId());
        vnpParamsMap.put("vnp_IpAddr", VNPayUtils.getIpAddress(request));
        //Build query url
        String queryUrl = vnPayService.generateUrl(vnpParamsMap);
        String paymentUrl = vnPayService.getVnp_PayUrl() + "?" + queryUrl;

        return VNPayResponse.builder()
                .paymentUrl(paymentUrl)
                .build();
    }

    public ZaloPayResponse createZaloPayPayment(OrderRequest orderRequest) throws IOException {
        Order order = createOrder(orderRequest);
        Map<String, Object> orderData = zaloPayService.createOrder(order);
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost post = new HttpPost(createEndpoint);

        List<NameValuePair> params = new ArrayList<>();
        for (Map.Entry<String, Object> entry : orderData.entrySet()) {
            params.add(new BasicNameValuePair(entry.getKey(), entry.getValue().toString()));
        }

        post.setEntity(new UrlEncodedFormEntity(params));

        CloseableHttpResponse response = client.execute(post);

        BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
        StringBuilder resultJsonStr = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            resultJsonStr.append(line);
        }
        logger.info(resultJsonStr.toString());
        JSONObject jsonObject = new JSONObject(resultJsonStr.toString());
        ZaloPayResponse zaloPayResponse = new ZaloPayResponse();
        zaloPayResponse.setZptranstoken(jsonObject.optString("zptranstoken", ""));
        zaloPayResponse.setOrderurl(jsonObject.optString("orderurl", ""));
        zaloPayResponse.setReturncode(jsonObject.optInt("returncode", -1));
        zaloPayResponse.setReturnmessage(jsonObject.optString("returnmessage", ""));
        if (zaloPayResponse.getReturncode() == 1) {
            startOrderStatusCheck((String) orderData.get("apptransid"), (Long) orderData.get("apptime"), order.getId());
        }
        return zaloPayResponse;
    }

    @Transactional
    public OrderResponse createOrderWithVNPay(HttpServletRequest request, Order order, String status, String paymentStatus) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

        Payment payment = Payment.builder()
                .amount(BigDecimal.valueOf(Long.parseLong(request.getParameter("vnp_Amount"))))
                .paymentDate(LocalDateTime.parse(request.getParameter("vnp_PayDate"), formatter))
                .status(paymentStatus)
                .build();
        payment = paymentRepository.save(payment);

        order.setPayment(payment);
        changeOrderStatus(order.getId(), status);

        orderRepository.save(order);
        //Gửi mail khi tạo thành công đơn hàng
        if (paymentStatus.equals("Success")) {
            mailService.sendOrderConfirmationEmail(order.getUser().getEmail(), order);
        }
        return toOrderResponse(order, order.getOrderDetails());
    }

    @Transactional
    public void createOrderWithZaloPay(String idOrder, Long zpTransId, String paymentStatus) {
        //Thanh toan thanh cong thi goi
        //CallBack cua zalopay khong can phan hoi!
        Order order = orderRepository.findById(idOrder).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_EXISTED));

        Payment payment = Payment.builder()
                .amount(order.getTotalAmount())
                .paymentDate(order.getCreatedAt())
                .status(paymentStatus)
                .build();
        if (zpTransId != null) {
            payment.setZpTransId(zpTransId);
        }
        paymentRepository.save(payment);

        order.setPayment(payment);
//        changeOrderStatus(order.getId(), status);
//         Khong can set lai status don hang!

        orderRepository.save(order);
        //Gửi mail khi tạo thành công đơn hàng
        if (paymentStatus.equals("Success")) {
            mailService.sendOrderConfirmationEmail(order.getUser().getEmail(), order);
        }
    }

    public OrderResponse getOrder(String orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_EXISTED));
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrder(order);
        return toOrderResponse(order, orderDetails);
    }

    public void cancelOrderInAdmin(String orderId, String reason) {

        Order order = orderRepository.findById(orderId).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_EXISTED));
        OrderResponse orderResponse = changeOrderStatus(orderId, "cancelled");

        if (orderResponse != null){
            mailService.sendOrderCanceledEmail(order.getUser().getEmail(), order, reason);
        }

    }

    public Page<OrderResponse> getOrderCurrentUser(Pageable pageable, String status, String search) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Pageable sortedByDate = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "createdAt"));

        OrderStatus orderStatus = (status != null && !status.isEmpty())
                ? statusOrderRepository.findByCodeName(status)
                : null;
        String searchValue = (search != null && !search.isEmpty()) ? search : null;

        Page<Order> ordersPage = orderRepository.findByUserAndStatusAndSearch(user, orderStatus, searchValue, sortedByDate);

        return ordersPage.map(order -> {
            List<OrderDetail> orderDetails = orderDetailRepository.findByOrder(order);
            return toOrderResponse(order, orderDetails);
        });
    }


    public Page<OrderResponse> getAllOrders(String codeName,String keyword, Pageable pageable) {
        Page<Order> orderPage;

        if ((codeName == null || codeName.isEmpty() ) && (keyword == null || keyword.isEmpty())) {
            // Trả về tất cả nếu codename trống hoặc null
            orderPage = orderRepository.findAll(pageable);
        } else {
            orderPage = orderRepository.findByKeywordAndStatusCode(keyword, codeName, pageable);
        }

        List<OrderResponse> orderResponses = orderPage.getContent().stream()
                .map(order -> {
                    List<OrderDetail> orderDetails = orderDetailRepository.findByOrder(order);
                    return toOrderResponse(order, orderDetails);
                })
                .collect(Collectors.toList());

        return new PageImpl<>(orderResponses, pageable, orderPage.getTotalElements());
    }

    public OrderResponse changeOrderStatus(String id, String statusCodeName) {

        log.info(statusCodeName);
        String cancelledStatus = "cancelled";
        String completedStatus = "completed";

        var order = orderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_EXISTED));
        var status = statusOrderRepository.findByCodeName(statusCodeName);
        order.setStatus(status);
        log.info("Status", status.toString());

        if (status.getCodeName().equals(cancelledStatus)) {
            for (OrderDetail orderDetail : order.getOrderDetails()) {
                Product product = orderDetail.getProduct();
                //Cập nhật số lượng trong kho
                product.setStockQuantity(product.getStockQuantity().add(orderDetail.getQuantity()));
                productRepository.save(product);
            }
            //Xử lý refund tiền trên thanh toán điện tử
            if (order.getPayment() != null && order.getPayment().getStatus() != null && order.getPayment().getStatus() == "Success") {
                try {
                    Boolean response = refundZaloPay(order.getPayment());
                    if (response != Boolean.TRUE) {
                        throw new AppException(ErrorCode.PAYMENT_CANNOT_REFUND_ZALOPAY);
                    }
                } catch (Exception e) {
                    throw new AppException(ErrorCode.PAYMENT_CANNOT_REFUND_ZALOPAY);
                }
            }
        } else {
            if (status.getCodeName().equals(completedStatus)) {
                //Thêm số lượng đã bán cho sản phẩm nếu đơn hàng hoàn tất
                for (OrderDetail orderDetail : order.getOrderDetails()) {
                    Product product = orderDetail.getProduct();
                    product.setSold(product.getSold().add(orderDetail.getQuantity()));
                    productRepository.save(product);
                }
            }
        }
        orderRepository.save(order);
        return toOrderResponse(order, order.getOrderDetails());
    }


    public OrderResponse changeOrderStatus(HttpServletRequest request, String id, String statusCodeName) {

        log.info(statusCodeName);
        String cancelledStatus = "cancelled";
        String completedStatus = "completed";

        var order = orderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_EXISTED));
        var status = statusOrderRepository.findByCodeName(statusCodeName);
        order.setStatus(status);
        log.info("Status", status.toString());

        if (status.getCodeName().equals(cancelledStatus)) {
            for (OrderDetail orderDetail : order.getOrderDetails()) {
                Product product = orderDetail.getProduct();
                //Cập nhật số lượng trong kho
                product.setStockQuantity(product.getStockQuantity().add(orderDetail.getQuantity()));
                productRepository.save(product);
            }
            //Xử lý refund tiền trên thanh toán điện tử
            if (order.getPayment() != null && order.getPayment().getStatus() != null && order.getPayment().getStatus() == "Success") {
                if (order.getPaymentMethod().getCodeName() == "zalopay") {
                    try {
                        Boolean response = refundZaloPay(order.getPayment());
                        if (response != Boolean.TRUE) {
                            throw new AppException(ErrorCode.PAYMENT_CANNOT_REFUND_ZALOPAY);
                        }
                    } catch (Exception e) {
                        throw new AppException(ErrorCode.PAYMENT_CANNOT_REFUND_ZALOPAY);
                    }
                } else if (order.getPaymentMethod().getCodeName() == "vnpay") {
                    Boolean response = refundVNPay(request, order);
                    if (response != Boolean.TRUE) {
                        throw new AppException(ErrorCode.PAYMENT_CANNOT_REFUND_VNPAY);
                    }
                }
            }
        } else {
            if (status.getCodeName().equals(completedStatus)) {
                //Thêm số lượng đã bán cho sản phẩm nếu đơn hàng hoàn tất
                for (OrderDetail orderDetail : order.getOrderDetails()) {
                    Product product = orderDetail.getProduct();
                    product.setSold(product.getSold().add(orderDetail.getQuantity()));
                    productRepository.save(product);
                }
            }
        }
        orderRepository.save(order);
        return toOrderResponse(order, order.getOrderDetails());
    }

    public OrderResponse toOrderResponse(Order order, List<OrderDetail> orderDetails) {
        List<OrderDetailResponse> orderDetailResponses = orderDetails.stream()
                .map(orderDetail -> OrderDetailResponse.builder()
                        .priceAtTime(orderDetail.getPriceAtTime())
                        .product(productMapper.toProductResponse(orderDetail.getProduct()))
                        .quantity(orderDetail.getQuantity())
                        .reviewed(orderDetail.isReviewed())
                        .build())
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .id(order.getId())
                .totalAmount(order.getTotalAmount())
                .recipient(orderRecipientMapper.toOrderRecipientResponse(order.getRecipient()))
                .status(orderStatusMapper.toOrderStatusResponse(order.getStatus()))
                .payment(paymentMapper.toPaymentResponse(order.getPayment()))
                .paymentMethod(paymentMethodMapper.toPaymentMethodResponse(order.getPaymentMethod()))
                .user(userMapper.toUserResponse(order.getUser()))
                .orderDetails(orderDetailResponses)
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .build();
    }

    @Transactional
    public Order createOrder(OrderRequest request) {
        String pendingOrderStatus = "pending";

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        OrderStatus orderStatus = statusOrderRepository.findByCodeName(pendingOrderStatus);
        PaymentMethod paymentMethod = paymentMethodRepository.findByCodeName(request.getPaymentMethod());
        OrderRecipient recipient = orderRecipientRepository
                .findByFullNameAndPhoneAndAddress(
                        request.getRecipient().getFullName().trim(),
                        request.getRecipient().getPhone(),
                        request.getRecipient().getAddress().trim()
                )
                .orElseGet(() -> {
                    return orderRecipientRepository.save(orderRecipientMapper.toOrderRecipient(request.getRecipient()));
                });

        //Kiểm tra OrderDetail trước khi thêm Order
        List<OrderDetail> orderDetails = new ArrayList<>();
        for (OrderDetailRequest orderDetailRequest : request.getOrderDetails()) {
            Product product = productRepository.findById(orderDetailRequest.getProductId())
                    .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));

            // Kiểm tra số lượng sản phẩm có đủ tồn kho không
            BigDecimal orderQuantity = orderDetailRequest.getQuantity();
            if (product.getStockQuantity().compareTo(orderQuantity) < 0) {
                throw new AppException(ErrorCode.PRODUCT_OUT_OF_STOCK);
            }

            orderDetails.add(OrderDetail.builder()
                    .product(product)
                    .priceAtTime(orderDetailRequest.getPriceAtTime())
                    .quantity(orderQuantity)
                    .build());
        }

        Order order = Order.builder()
                .totalAmount(request.getTotalAmount())
                .recipient(recipient)
                .status(orderStatus)
                .paymentMethod(paymentMethod)
                .user(user)
                .createdAt(LocalDateTime.now())
                .build();

        //Lưu đơn hàng
        order = orderRepository.save(order);
        var cart = cartRepository.existsByUser(user)
                ? cartRepository.findByUser(user)
                : Cart.builder().user(user).cartDetails(new ArrayList<>()).build();
        for (OrderDetail orderDetail : orderDetails) {
            Product product = orderDetail.getProduct();
            //Cập nhật số lượng trong kho
            product.setStockQuantity(product.getStockQuantity().subtract(orderDetail.getQuantity()));
            productRepository.save(product);

            //Liên kết OrderDetail với Order và lưu vào DB
            orderDetail.setOrder(order);
            orderDetailRepository.save(orderDetail);

            cart.getCartDetails().removeIf(cartDetail ->
                    cartDetail.getProduct().getId().equals(product.getId()) &&
                            cartDetail.getQuantity().compareTo(orderDetail.getQuantity()) == 0
            );
        }

        order.setOrderDetails(orderDetails);
        orderRepository.save(order);
        cartRepository.save(cart);
        return order;
    }

    public Long getTotalAmountInDate(LocalDate date) {
        Long totalAmountByDate = orderRepository.findTotalAmountByDate(date).longValue();
        return totalAmountByDate;
    }

    public Long getTotalAmountCurrentMonth() {
        Long totalAmountByMonth = orderRepository.findTotalRevenueForCurrentMonth().longValue();
        return totalAmountByMonth;
    }

    private void startOrderStatusCheck(String apptransid, long apptime, String orderId) {
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
        scheduler.scheduleAtFixedRate(() -> {
            try {
                // Kiểm tra nếu thời gian kiểm tra đã vượt quá 15 phút
                if ((System.currentTimeMillis() - apptime )> MAX_CHECK_DURATION_MS) {
                    logger.info("Thời gian kiểm tra đã vượt quá 15 phút. Dừng kiểm tra trạng thái.");
                    scheduler.shutdown(); // Dừng scheduler
                    return;
                }
                checkOrderStatus(apptransid, orderId, scheduler);
            } catch (URISyntaxException | IOException e) {
                throw new RuntimeException(e);
            }
        }, 1, 3, TimeUnit.MINUTES);
    }

    private void checkOrderStatus(String app_trans_id, String orderId, ScheduledExecutorService scheduler) throws URISyntaxException, IOException {
        String data = appid + "|" + app_trans_id + "|" + key1;
        String mac = HMACUtil.HMacHexStringEncode(HMACUtil.HMACSHA256, key1, data);

        log.info("Check status");

        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("appid", appid));
        params.add(new BasicNameValuePair("apptransid", app_trans_id));
        params.add(new BasicNameValuePair("mac", mac));

        URIBuilder uri = new URIBuilder(queryEndpoint);
        uri.addParameters(params);

        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost post = new HttpPost(uri.build());
        post.setEntity(new UrlEncodedFormEntity(params));

        CloseableHttpResponse res = client.execute(post);
        BufferedReader rd = new BufferedReader(new InputStreamReader(res.getEntity().getContent()));
        StringBuilder resultJsonStr = new StringBuilder();
        String line;

        while ((line = rd.readLine()) != null) {
            resultJsonStr.append(line);
        }

        JSONObject result = new JSONObject(resultJsonStr.toString());
        // Kiểm tra mã trả về
        int returnCode = result.optInt("returncode");
        Long zpTransId = result.optLong("zptransid");
        if (returnCode == 1) {
            OrderResponse order = getOrder(orderId);
            if (order.getPayment() != null) {
                createOrderWithZaloPay(orderId, zpTransId, "Success");
            }
            scheduler.shutdown(); // Dừng scheduler
        }
        if (returnCode == 2) {
            createOrderWithZaloPay(orderId, zpTransId, "Failed");
            changeOrderStatus(orderId, "Cancelled");
        }
    }

    public String callbackZaloPay(String jsonStr) {
        String urlClient = "";
        log.info("callbackZaloPay");
        log.info("jsonStr:" + jsonStr);
        // Chuyển đổi chuỗi JSON thành JSONObject
        JSONObject cbData = new JSONObject(jsonStr);
        // Trích xuất dữ liệu từ JSONObject
        String appTransId = cbData.getString("apptransid");
        Integer status = cbData.getInt("status");
        String[] parts = appTransId.split("_");

        // So sánh MAC đã tính với checksum nhận được
        if (status != 1) {
            createOrderWithZaloPay(parts[1], null, "Fail");
            urlClient = String.format(returnUrl, "fail", parts[1]);
            changeOrderStatus(parts[1], "cancelled");
        } else {
            // Cập nhật trạng thái
            if (status == 1) {
                createOrderWithZaloPay(parts[1], null, "Success");
                urlClient = String.format(returnUrl, "success", parts[1]);

            }
        }
        return urlClient;
    }

    public Boolean refundVNPay(HttpServletRequest request, Order order) {
        Map<String, String> vnpParamsMap = vnPayService.getRefundVNPayConfig();
        vnpParamsMap.put("vnp_Amount", String.valueOf(order.getPayment().getAmount().multiply(BigDecimal.valueOf(100L))));
        vnpParamsMap.put("vnp_OrderInfo", "Hoàn tiền cho đơn hàng: " + order.getId());
        vnpParamsMap.put("vnp_TxnRef", order.getId());

        // Set transaction date in GMT+7 timezone
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        formatter.setTimeZone(TimeZone.getTimeZone("GMT+7"));
        String vnpTransactionDate = formatter.format(order.getPayment().getPaymentDate());
        vnpParamsMap.put("vnp_TransactionDate", vnpTransactionDate);

        vnpParamsMap.put("vnp_CreateBy", order.getUser().getUsername());
        vnpParamsMap.put("vnp_IpAddr", VNPayUtils.getIpAddress(request));

        String queryUrl = vnPayService.generateUrl(vnpParamsMap);
        String refundUrl = vnPayService.getRefundEndpoint() + "?" + queryUrl;

        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(URI.create(refundUrl))
                    .GET()
                    .build();
            HttpResponse<String> response = client.send(httpRequest, HttpResponse.BodyHandlers.ofString());

            // Parse the response JSON to check vnp_ResponseCode
            JsonObject jsonResponse = JsonParser.parseString(response.body()).getAsJsonObject();
            return "00".equals(jsonResponse.get("vnp_ResponseCode").getAsString());

        } catch (IOException | InterruptedException e) {
            throw new AppException(ErrorCode.PAYMENT_CANNOT_REFUND_VNPAY);
        }
    }

    public Boolean refundZaloPay(Payment payment) throws IOException {

        Map<String, Object> order = zaloPayService.createdRefund(payment);

        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost post = new HttpPost(refundEndpoint);

        List<NameValuePair> params = new ArrayList<>();
        for (Map.Entry<String, Object> e : order.entrySet()) {
            params.add(new BasicNameValuePair(e.getKey(), e.getValue().toString()));
        }

        post.setEntity(new UrlEncodedFormEntity(params));

        CloseableHttpResponse res = client.execute(post);
        BufferedReader rd = new BufferedReader(new InputStreamReader(res.getEntity().getContent()));
        StringBuilder resultJsonStr = new StringBuilder();
        String line;

        while ((line = rd.readLine()) != null) {
            resultJsonStr.append(line);
        }

        JSONObject result = new JSONObject(resultJsonStr.toString());
        int return_code = result.optInt("return_code");
        Long refundId = result.optLong("refund_id");
        if (return_code == 1) {
            PaymentRequest request = PaymentRequest.builder().status("Refund").refundId(refundId).build();
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }
}
    
