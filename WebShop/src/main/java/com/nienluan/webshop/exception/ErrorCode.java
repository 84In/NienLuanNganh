package com.nienluan.webshop.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {

    UNCATEGORIZED_EXCEPTION (999, "",HttpStatus.INTERNAL_SERVER_ERROR),

    UNAUTHORIZED(101,"You do not have permission",HttpStatus.FORBIDDEN),
    UNAUTHENTICATED(102,"Unauthenticated",HttpStatus.UNAUTHORIZED),

    INVALID_KEY(201, "Invalid message Key",HttpStatus.BAD_REQUEST),
    PASSWORD_INCORRECT(201, "Password incorrect",HttpStatus.BAD_REQUEST),

    USER_NOT_EXISTED(301, "User not existed", HttpStatus.NOT_FOUND),
    USER_EXISTED(302, "User existed", HttpStatus.FOUND)
    ;
    private int code;
    private String message;
    private HttpStatusCode statusCode;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }
}
