package com.ssafy.idk.global.error;

import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.account.exception.RSAKeyException;
import com.ssafy.idk.domain.item.exception.ItemException;
import com.ssafy.idk.domain.member.exception.MemberException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.nio.file.AccessDeniedException;

@Slf4j
@RestControllerAdvice(basePackages = "com.ssafy.idk")
public class GlobalExceptionHandler {

    @ExceptionHandler(ItemException.class)
    protected ResponseEntity<ErrorResponse> handleItemException(ItemException ex) {
        log.error("handleItemException", ex);
        final ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }

    @ExceptionHandler(AccountException.class)
    protected ResponseEntity<ErrorResponse> handleAccountException(AccountException ex) {
        log.error("handleAccountException", ex);
        final ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }

    @ExceptionHandler(MemberException.class)
    protected ResponseEntity<ErrorResponse> handleMemberException(MemberException ex) {
        log.error("handleMemberException", ex);
        final ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }

    @ExceptionHandler(RSAKeyException.class)
    protected ResponseEntity<ErrorResponse> handleRSAKeyException(RSAKeyException ex) {
        log.error("handleRSAKeyException", ex);
        final ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }

    @ExceptionHandler({ AccessDeniedException.class })
    public ResponseEntity handleAccessDeniedException(final AccessDeniedException ex) {
        log.error(" handleAccessDeniedException", ex);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    @ExceptionHandler({ Exception.class })
    public ResponseEntity<Object> handleAll(final Exception ex) {
        log.error("handleAll", ex);
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
