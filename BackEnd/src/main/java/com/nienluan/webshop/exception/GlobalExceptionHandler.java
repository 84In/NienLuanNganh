package com.nienluan.webshop.exception;

import com.nienluan.webshop.dto.response.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final String MIN_ATTRIBUTE = "min";
    private static final String MAX_ATTRIBUTE = "max";
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(value = Exception.class)
    ResponseEntity<ApiResponse<?>> handlingRuntimeException(RuntimeException ex) {
        ApiResponse<?> response = new ApiResponse<>();
        response.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode());
        response.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage() + ex.getMessage());
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    ResponseEntity<ApiResponse<?>> handlingAccessDeniedException(AccessDeniedException exception) {
        log.error("Access denied", exception);
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
    ResponseEntity<ApiResponse<?>> handlingAppException(AppException exception) {

        ErrorCode errorCode = exception.getErrorCode();

        ApiResponse<?> apiResponse = new ApiResponse<>();

        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());

        return ResponseEntity
                .status(errorCode.getStatusCode())
                .body(apiResponse);

    }
//    @ExceptionHandler(value = MethodArgumentNotValidException.class)
//    ResponseEntity<ApiResponse<?>> handlingMethodArgumentNotValidException(MethodArgumentNotValidException exception){
//        String enumKey = Objects.requireNonNull(exception.getFieldError()).getDefaultMessage();
//
//        ErrorCode errorCode = ErrorCode.INVALID_KEY;
//
//        Map<String,Object> attributes = null;
//
//        try {
//            errorCode = ErrorCode.valueOf(enumKey);
//
//            var constraintViolation = exception.getBindingResult()
//                    .getAllErrors().getFirst().unwrap(ConstraintViolation.class);
//
//            attributes = constraintViolation.getConstraintDescriptor().getAttributes();
//
//        }
//        catch (IllegalArgumentException e){
//            System.out.println(e.getMessage());
//        }
//
//        ApiResponse<?> apiResponse = new ApiResponse<>();
//        apiResponse.setCode(errorCode.getCode());
//        apiResponse.setMessage(Objects.nonNull(attributes)?mapAttribute(errorCode.getMessage(),attributes):errorCode.getMessage());
//        return ResponseEntity.badRequest().body(apiResponse);
//    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse<Map<String, String>>> handlingMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        Map<String, String> errorMap = new HashMap<>();

        // Lấy tất cả các lỗi và thêm vào map
        exception.getBindingResult().getFieldErrors().forEach(fieldError -> {
            String fieldName = fieldError.getField();
            String message = fieldError.getDefaultMessage();
            errorMap.put(fieldName, message);
        });


        ApiResponse<Map<String, String>> apiResponse = new ApiResponse<>();
        apiResponse.setCode(ErrorCode.INVALID_KEY.getCode());
        apiResponse.setMessage(ErrorCode.INVALID_KEY.getMessage());
        apiResponse.setResult(errorMap);

        return ResponseEntity.badRequest().body(apiResponse);
    }

    private String mapAttribute(String message, Map<String, Object> attributes) {
        String minValue = attributes.containsKey(MIN_ATTRIBUTE) ? attributes.get(MIN_ATTRIBUTE).toString() : "";
        String maxValue = attributes.containsKey(MAX_ATTRIBUTE) ? attributes.get(MAX_ATTRIBUTE).toString() : "";

        message = message.replace("{" + MIN_ATTRIBUTE + "}", minValue);
        message = message.replace("{" + MAX_ATTRIBUTE + "}", maxValue);

        return message;
    }
}