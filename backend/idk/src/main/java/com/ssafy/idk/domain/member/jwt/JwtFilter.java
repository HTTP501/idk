package com.ssafy.idk.domain.member.jwt;

import com.ssafy.idk.domain.member.entity.CustomUserDetails;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.exception.MemberException;
import com.ssafy.idk.domain.member.repository.MemberRepository;
import com.ssafy.idk.global.error.ErrorCode;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private final JwtTokenProvider jwtTokenProvider;

    private final MemberRepository memberRepository;

    public JwtFilter(JwtTokenProvider jwtTokenProvider, MemberRepository memberRepository) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.memberRepository = memberRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {


        try {
            // 토큰이 없거나 토큰 발급을 위한 경로인 경우 필터를 거치지 않음
            if (isAuthRelatedPath(request.getRequestURI())) {
                filterChain.doFilter(request, response);
                return;
            }

            String authorizationHeader = request.getHeader("Authorization");

            // 토큰이 없으면
            if (authorizationHeader == null) {
                throw new MemberException(ErrorCode.MEMBER_HEADER_NOT_FOUND);
            }

            // 헤더 형식이 맞지 않는 경우
            if (!authorizationHeader.startsWith("Bearer ")) {
                throw new MemberException(ErrorCode.MEMBER_INVALID_HEADER_FORMAT);
            }

            // 액세스 토큰 검증
            String token = authorizationHeader.split(" ")[1];
            String category = jwtTokenProvider.getCategory(token);
            if (category.equals("access")) {
                if (jwtTokenProvider.isExpired(token)) {
                    throw new MemberException(ErrorCode.MEMBER_TOKEN_EXPIRED);
                }
            }

            // 회원 정보 체크
            String phoneNumber = jwtTokenProvider.getPhoneNumber(token);
            Member member = memberRepository.findByPhoneNumber(phoneNumber)
                    .orElseThrow(() -> new MemberException(ErrorCode.MEMBER_NOT_FOUND));

            // 권한 생성
            CustomUserDetails customUserDetails = new CustomUserDetails(member);
            Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authToken);

        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    private boolean isAuthRelatedPath(String requestURI) {
        return requestURI.startsWith("/api/member/signup") ||
                requestURI.startsWith("/api/member/login/pin") ||
                requestURI.startsWith("/api/member/login/bio") ||
                requestURI.startsWith("/api/member/phone") ||
                requestURI.startsWith("/api/member/phone/code") ||
                requestURI.startsWith("/swagger-ui") ||
                requestURI.startsWith("/v3") ||
                requestURI.startsWith("/api/member/reissue")
                || requestURI.startsWith("/api/idk/mydata/test") // 테스트용

                ;
    }
}
