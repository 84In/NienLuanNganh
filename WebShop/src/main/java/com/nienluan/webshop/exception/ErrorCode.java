package com.nienluan.webshop.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {

    UNCATEGORIZED_EXCEPTION(999, "", HttpStatus.INTERNAL_SERVER_ERROR),

    //App
    CATEGORY_NOT_EXISTED(1, "Category not existed", HttpStatus.BAD_REQUEST),
    CATEGORY_EXISTED(2, "Category already existed", HttpStatus.BAD_REQUEST),
    PROMOTION_NOT_EXISTED(3, "Promotion not existed", HttpStatus.BAD_REQUEST),
    PROMOTION_EXISTED(4, "Promotion already existed", HttpStatus.BAD_REQUEST),
    PRODUCT_NOT_EXISTED(5, "Product not existed", HttpStatus.BAD_REQUEST),
    PRODUCT_EXISTED(6, "Product already existed", HttpStatus.BAD_REQUEST),
    BANNER_NOT_EXISTED(7, "Banner not existed", HttpStatus.BAD_REQUEST),
    BANNER_EXISTED(8, "Banner already existed", HttpStatus.BAD_REQUEST),
    BRAND_NOT_EXISTED(9, "Brand not existed", HttpStatus.BAD_REQUEST),
    STATUS_ORDER_EXISTED(10, "Status order already existed", HttpStatus.BAD_REQUEST),
    STATUS_ORDER_NOT_EXISTED(11, "Status order not existed", HttpStatus.BAD_REQUEST),
    PAYMENT_METHOD_EXISTED(12, "Payment method already existed", HttpStatus.BAD_REQUEST),
    PAYMENT_METHOD_NOT_EXISTED(13, "Payment method not existed", HttpStatus.BAD_REQUEST),
    PAYMENT_EXISTED(14, "Payment already existed", HttpStatus.BAD_REQUEST),
    PAYMENT_NOT_EXISTED(15, "Payment not existed", HttpStatus.BAD_REQUEST),
    PRODUCT_OUT_OF_STOCK(16, "Product out of stock", HttpStatus.BAD_REQUEST),
    ORDER_EXISTED(17, "Order already existed", HttpStatus.BAD_REQUEST),
    ORDER_NOT_EXISTED(18, "Order not existed", HttpStatus.BAD_REQUEST),
    PROVINCE_NOT_EXISTED(19, "Province not existed", HttpStatus.BAD_REQUEST),
    DISTRICT_NOT_EXISTED(20, "District not existed", HttpStatus.BAD_REQUEST),
    WARD_NOT_EXISTED(21, "Ward not existed", HttpStatus.BAD_REQUEST),
    CART_NOT_EXISTED(22, "Cart not existed", HttpStatus.BAD_REQUEST),
    REVIEW_NOT_EXISTED(23, "Review not existed", HttpStatus.BAD_REQUEST),
    PAYMENT_FAIL(24, "Payment fail", HttpStatus.BAD_REQUEST),
    REVENUE_NOT_EXISTED(25, "Revenue not existed", HttpStatus.BAD_REQUEST),
    REVIEW_EXISTED(26, "Review existed", HttpStatus.BAD_REQUEST),


    //System
    UNAUTHORIZED(101, "You do not have permission", HttpStatus.FORBIDDEN),
    UNAUTHENTICATED(102, "Unauthenticated", HttpStatus.UNAUTHORIZED),

    //Validation
    INVALID_KEY(201, "Invalid message key", HttpStatus.BAD_REQUEST),
    FILE_EMPTY(202, "File is empty", HttpStatus.BAD_REQUEST),
    PARSE_ERROR(203, "Parse error", HttpStatus.BAD_REQUEST),

    //User
    USER_NOT_EXISTED(301, "User not existed", HttpStatus.BAD_REQUEST),
    USER_EXISTED(302, "User existed", HttpStatus.BAD_REQUEST),
    INCORRECT_PASSWORD(303, "Incorrect password", HttpStatus.BAD_REQUEST),
    PHONE_EXISTED(304, "Phone existed", HttpStatus.BAD_REQUEST),

    INTERNAL_SERVER_ERROR(500, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR),
    ;

    private Integer code = 0;
    private String message = "Success!";
    private HttpStatusCode statusCode;

    ErrorCode(Integer code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }
}
