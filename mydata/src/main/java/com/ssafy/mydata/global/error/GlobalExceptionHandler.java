package com.ssafy.mydata.global.error;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.security.auth.login.AccountException;
import java.nio.file.AccessDeniedException;

@Slf4j
@RestControllerAdvice(basePackages = "com.ssafy.idk")
public class GlobalExceptionHandler {

//    @ExceptionHandler(ItemException.class)
//    protected ResponseEntity<ErrorResponse> handleItemException(ItemException ex) {
//        log.error("handleItemException", ex);
//        final ErrorResponse response = new ErrorResponse(ex.getErrorCode());
//        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
//    }

    @ExceptionHandler({ AccessDeniedException.class })
    public ResponseEntity handleAccessDeniedException(final AccessDeniedException ex) {
        log.error(" handleAccessDeniedException", ex);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    @ExceptionHandler( Exception.class )
    public ResponseEntity<Object> handleAll(final Exception ex) {
        log.error("handleAll", ex);
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

