package com.nienluan.webshop.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {

    UNCATEGORIZED_EXCEPTION (999, "",HttpStatus.INTERNAL_SERVER_ERROR),

    CATEGORY_NOT_EXISTED(1,"Category not found",HttpStatus.NOT_FOUND),
    CATEGORY_EXISTED(2,"Category already existed",HttpStatus.FOUND),
    PROMOTION_NOT_EXISTED(3,"Promotion not found",HttpStatus.NOT_FOUND),
    PROMOTION_EXISTED(4,"Promotion already existed",HttpStatus.FOUND),
    PRODUCT_NOT_EXISTED(5,"Product not found",HttpStatus.NOT_FOUND),
    PRODUCT_EXISTED(6,"Product already existed",HttpStatus.FOUND),
    BANNER_NOT_EXISTED(7,"Banner not found",HttpStatus.NOT_FOUND),
    BANNER_EXISTED(8,"Banner already existed", HttpStatus.FOUND),

    UNAUTHORIZED(101,"You do not have permission",HttpStatus.FORBIDDEN),
    UNAUTHENTICATED(102,"Unauthenticated",HttpStatus.UNAUTHORIZED),

    INVALID_KEY(201, "Invalid message Key",HttpStatus.BAD_REQUEST),
    PASSWORD_INCORRECT(201, "Password incorrect",HttpStatus.BAD_REQUEST),

    USER_NOT_EXISTED(301, "User not existed", HttpStatus.NOT_FOUND),
    USER_EXISTED(302, "User existed", HttpStatus.FOUND),

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
