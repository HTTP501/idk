package com.ssafy.idk.domain.member.security;

import com.ssafy.idk.domain.member.jwt.JwtTokenProvider;
import com.ssafy.idk.domain.member.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final TokenService tokenService;


    public LoginFilter(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, TokenService tokenService) {
        System.out.println("LoginFilter 생성자");
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.tokenService = tokenService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        String phoneNumber = request.getParameter("phoneNumber");
        String pin = request.getParameter("pin");

        System.out.println("phoneNumber = " + phoneNumber);
        System.out.println("pin = " + pin);

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(phoneNumber, pin, null);

        return authenticationManager.authenticate(authToken);
    }

    //로그인 성공시 실행하는 메소드 (여기서 JWT를 발급하면 됨)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws ServletException, IOException {
        System.out.println("로그인 성공");
        // AuthenticationSuccessHandler에 처리 위임
        getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    //로그인 실패시 실행하는 메소드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {

        System.out.println("로그인 실패");
        //로그인 실패시 401 응답 코드 반환
        response.setStatus(401);
    }


}
