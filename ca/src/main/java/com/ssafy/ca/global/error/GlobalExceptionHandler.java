package com.ssafy.ca.global.error;

import com.ssafy.ca.exception.CaException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice(basePackages = "com.ssafy.ca")
public class GlobalExceptionHandler {

    @ExceptionHandler(CaException.class)
    protected ResponseEntity<ErrorResponse> handleCaException(CaException ex) {
        log.error("handleCaException", ex);
        final ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }
}
