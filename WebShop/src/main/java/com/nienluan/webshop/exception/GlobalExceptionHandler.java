package com.nienluan.webshop.exception;

import com.nienluan.webshop.dto.response.ApiResponse;
import jakarta.validation.ConstraintViolation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;
import java.util.Objects;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final String MIN_ATTRIBUTE = "min";

    @ExceptionHandler(value = Exception.class)
    ResponseEntity<ApiResponse> handlingRuntimeException(RuntimeException ex) {
        ApiResponse response = new ApiResponse();
        response.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode());
        response.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage()+ex.getMessage());
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    ResponseEntity<ApiResponse> handlingAccessDeniedException(AccessDeniedException exception) {
        return ResponseEntity
                .status(ErrorCode
                        .UNAUTHORIZED
                        .getStatusCode())
                .body(ApiResponse.builder()
                        .code(ErrorCode.UNAUTHORIZED.getCode())
                        .message(ErrorCode.UNAUTHORIZED.getMessage())
                        .build());
    }

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse> handlingAppException(AppException exception) {

        ErrorCode errorCode = exception.getErrorCode();

        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());

        return ResponseEntity
                .status(errorCode.getStatusCode())
                .body(apiResponse);

    }
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> handlingMethodArgumentNotValidException(MethodArgumentNotValidException exception){
        String enumKey = Objects.requireNonNull(exception.getFieldError()).getDefaultMessage();

        ErrorCode errorCode = ErrorCode.INVALID_KEY;

        Map<String,Object> attributes = null;

        try {
            errorCode = ErrorCode.valueOf(enumKey);

            var contrainViolation = exception.getBindingResult()
                    .getAllErrors().getFirst().unwrap(ConstraintViolation.class);

            attributes = contrainViolation.getConstraintDescriptor().getAttributes();

        }
        catch (IllegalArgumentException e){

        }

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(Objects.nonNull(attributes)?mapAttribute(errorCode.getMessage(),attributes):errorCode.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }

    private String mapAttribute(String message, Map<String, Object> attributes){

        String minValue = String.valueOf(attributes.get(MIN_ATTRIBUTE));

        return message.replace("{"+MIN_ATTRIBUTE+"}", minValue);
    }
}