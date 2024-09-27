package com.nienluan.webshop.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {

    UNCATEGORIZED_EXCEPTION (999, "",HttpStatus.INTERNAL_SERVER_ERROR),

    CATEGORY_NOT_FOUND(1,"Category not found",HttpStatus.BAD_REQUEST),
    CATEGORY_EXISTED(2,"Category already existed",HttpStatus.BAD_REQUEST),
    PROMOTION_NOT_EXISTED(3,"Promotion not found",HttpStatus.BAD_REQUEST),
    PROMOTION_EXISTED(4,"Promotion already existed",HttpStatus.BAD_REQUEST),
    PRODUCT_NOT_EXISTED(5,"Product not found",HttpStatus.BAD_REQUEST),
    PRODUCT_EXISTED(6,"Product already existed",HttpStatus.BAD_REQUEST),
    BANNER_NOT_EXISTED(7,"Banner not found",HttpStatus.BAD_REQUEST),
    BANNER_EXISTED(8,"Banner already existed", HttpStatus.BAD_REQUEST),
    BRAND_NOT_FOUND(9,"Brand not found",HttpStatus.BAD_REQUEST),

    UNAUTHORIZED(101,"You do not have permission",HttpStatus.FORBIDDEN),
    UNAUTHENTICATED(102,"Unauthenticated",HttpStatus.UNAUTHORIZED),

    INVALID_KEY(201, "Invalid message Key",HttpStatus.BAD_REQUEST),
    PASSWORD_INCORRECT(201, "Password incorrect",HttpStatus.BAD_REQUEST),

    USER_NOT_EXISTED(301, "User not existed", HttpStatus.BAD_REQUEST),
    USER_EXISTED(302, "User existed", HttpStatus.BAD_REQUEST),
    INCORRECT_PASSWORD(303, "Incorrect password", HttpStatus.BAD_REQUEST),
    PHONE_EXISTED(304, "Phone existed", HttpStatus.BAD_REQUEST),

    INTERNAL_SERVER_ERROR(500, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    private Integer code = 0;
    private String message = "Success!";
    private HttpStatusCode statusCode;

    ErrorCode(Integer code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }
}
