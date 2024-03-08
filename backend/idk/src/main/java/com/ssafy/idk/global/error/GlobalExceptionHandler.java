package com.ssafy.idk.global.error;

import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.item.exception.ItemException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice(basePackages = "com.ssafy.idk")
public class GlobalExceptionHandler {

    @ExceptionHandler(ItemException.class)
    protected ResponseEntity<ErrorResponse> handleItemCategoryException(ItemException ex) {
        log.error("handleItemException", ex);
        final ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }

    @ExceptionHandler(AccountException.class)
    protected ResponseEntity<ErrorResponse> handleItemNotFoundException(AccountException ex) {
        log.error("handleAccountException", ex);
        final ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }
}
