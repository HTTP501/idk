package com.ssafy.idk.domain.member.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.idk.global.error.ErrorCode;
import com.ssafy.idk.global.error.ErrorResponse;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.io.PrintWriter;

@Slf4j
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final HandlerExceptionResolver resolver;

    public CustomAuthenticationEntryPoint(@Qualifier("handlerExceptionResolver") HandlerExceptionResolver resolver) {
        this.resolver = resolver;
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) {
        Exception e = (Exception) request.getAttribute("exception");

        if (e != null) {
            String ErrorType = e.getClass().describeConstable().get().displayName();
            ErrorResponse errorResponse;

            if (e instanceof ExpiredJwtException) {
                errorResponse = new ErrorResponse(ErrorCode.MEMBER_TOKEN_EXPIRED);
            } else if (e instanceof SignatureException || e instanceof MalformedJwtException) {
                errorResponse = new ErrorResponse(ErrorCode.MEMBER_TOKEN_INVALID);
            } else if (e instanceof MemberException) {
                resolver.resolveException(request, response, null, (Exception) request.getAttribute("exception"));
                errorResponse = new ErrorResponse(ErrorCode.MEMBER_NOT_FOUND);
            } else {
                errorResponse = new ErrorResponse(ErrorCode.MEMBER_UNKNOWN_ERROR);
            }

            response.setStatus(errorResponse.getStatus());
            response.setContentType("application/json; charset=UTF-8");
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                String jsonResponse = objectMapper.writeValueAsString(errorResponse);
                PrintWriter writer = response.getWriter();
                writer.print(jsonResponse);
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
        } else {
            return;
        }
        resolver.resolveException(request, response, null, (Exception) request.getAttribute("exception"));
    }
}
