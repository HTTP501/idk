package com.ssafy.idk.global.error;

import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.account.exception.RSAKeyException;
import com.ssafy.idk.domain.account.exception.TransferException;
import com.ssafy.idk.domain.autodebit.exception.AutoDebitException;
import com.ssafy.idk.domain.fcm.exception.FcmException;
import com.ssafy.idk.domain.mydata.exception.MydataException;
import com.ssafy.idk.domain.autotransfer.exception.AutoTransferException;
import com.ssafy.idk.domain.piggybank.exception.PiggyBankException;
import com.ssafy.idk.domain.pocket.exception.PocketException;
import com.ssafy.idk.domain.shop.exception.ItemException;
import com.ssafy.idk.domain.member.exception.MemberException;
import com.ssafy.idk.domain.shop.exception.PaymentException;
import com.ssafy.idk.domain.targetsaving.exception.TargetSavingException;
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

    @ExceptionHandler(TransferException.class)
    protected ResponseEntity<ErrorResponse> handleTransferException(TransferException ex) {
        log.error("handleTransferException", ex);
        final ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }

    @ExceptionHandler(MemberException.class)
    protected ResponseEntity<ErrorResponse> handleMemberException(MemberException ex) {
        log.error("handleMemberException", ex);
        final ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }

    @ExceptionHandler(MydataException.class)
    protected ResponseEntity<ErrorResponse> handleMydataException(MydataException ex) {
        log.error("handleMydataException", ex);
        final ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }

    @ExceptionHandler(RSAKeyException.class)
    protected ResponseEntity<ErrorResponse> handleRSAKeyException(RSAKeyException ex) {
        log.error("handleRSAKeyException", ex);
        final ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }

    @ExceptionHandler(PaymentException.class)
    protected ResponseEntity<ErrorResponse> handlePaymentException(PaymentException ex) {
        log.error("handlePaymentException", ex);
        final ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }

    @ExceptionHandler(PiggyBankException.class)
    protected ResponseEntity<ErrorResponse> handlePiggyBankException(PiggyBankException ex) {
        log.error("handlePiggyBankException", ex);
        final ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }

    @ExceptionHandler(TargetSavingException.class)
    protected ResponseEntity<ErrorResponse> handleTargetSavingException(TargetSavingException ex) {
        log.error("handleTargetSavingException", ex);
        final ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }

    @ExceptionHandler(AutoTransferException.class)
    protected ResponseEntity<ErrorResponse> handleAutoTransferException(AutoTransferException ex) {
        log.error("handleAutoTransferException", ex);
        final ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }

    @ExceptionHandler(AutoDebitException.class)
    protected ResponseEntity<ErrorResponse> handleAutoDebitException(AutoDebitException ex) {
        log.error("handleAutoDebitException", ex);
        final ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }

    @ExceptionHandler(PocketException.class)
    protected ResponseEntity<ErrorResponse> handlePocketException(PocketException ex) {
        log.error("handleAutoPocketException", ex);
        final ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }

    @ExceptionHandler(FcmException.class)
    protected ResponseEntity<ErrorResponse> handleFcmException(FcmException ex) {
        log.error("handleFcmException", ex);
        final ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }

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
