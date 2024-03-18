package com.ssafy.idk.domain.member.jwt;

import com.ssafy.idk.domain.member.dto.request.LoginByPinRequestDto;
import com.ssafy.idk.domain.member.exception.MemberException;
import com.ssafy.idk.domain.member.repository.MemberRepository;
import com.ssafy.idk.global.error.ErrorCode;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtFilter extends OncePerRequestFilter {

    private JwtTokenProvider jwtTokenProvider;
    private LoginByPinRequestDto loginByPinRequestDto;

    private MemberRepository memberRepository;

    public JwtFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 회원가입 관련 경로인 경우 필터를 거치지 않음
        if (isSignupRelatedPath(request.getRequestURI())) {
            filterChain.doFilter(request, response);
            return;
        }

        String authorizationHeader = request.getHeader("Authorization");
        System.out.println(authorizationHeader);

        // 토큰이 없으면
        if (authorizationHeader == null) {
            throw new MemberException(ErrorCode.MEMBER_HEADER_NOT_FOUND);
        }

        // 헤더 형식이 맞지 않는 경우
        if (!authorizationHeader.startsWith("Bearer ")) {
            throw new MemberException(ErrorCode.MEMBER_INVALID_HEADER_FORMAT);
        }

        // 토큰 검증
        String token = authorizationHeader.split(" ")[1];
        String category = jwtTokenProvider.getCategory(token);
        if (category.equals("access")) {
            if (jwtTokenProvider.isExpired(token)) {
                throw new MemberException(ErrorCode.MEMBER_TOKEN_EXPIRED);
            }
        }

        // 회원 정보 체크
        String phoneNumber = jwtTokenProvider.getPhoneNumber(token);
        memberRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new MemberException(ErrorCode.MEMBER_NOT_FOUND));

        filterChain.doFilter(request, response);
    }

    private boolean isSignupRelatedPath(String requestURI) {
        return requestURI.startsWith("/api/member/signup") ||
                requestURI.startsWith("/api/member/login/pin") ||
                requestURI.startsWith("/api/member/login/bio") ||
                requestURI.startsWith("/api/member/phone") ||
                requestURI.startsWith("/api/member/phone/code") ||
                requestURI.startsWith("/swagger-ui") ||
                requestURI.startsWith("/v3") ||
                requestURI.startsWith("/api/member/reissue");
    }
}
