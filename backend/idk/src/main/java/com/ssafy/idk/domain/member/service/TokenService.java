package com.ssafy.idk.domain.member.service;

import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.jwt.JwtTokenProvider;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisService redisService;


    // 토큰 발급
    public String issueToken(HttpServletResponse response, Member member) {

        // 토큰 발급
        String accessToken = jwtTokenProvider.createToken("access", member.getPhoneNumber());
        String refreshToken = jwtTokenProvider.createToken("refresh", member.getPhoneNumber());

        // 리프래시 토큰 쿠키에 담기
        addRefreshTokenCookieToResponse(response, refreshToken);

        // 리프래시 토큰 저장
        redisService.saveRefreshTokenToRedis(member.getPhoneNumber(), refreshToken);

        return accessToken;
    }

    // 리프레시 토큰을 쿠키로 추가하는 메서드
    private void addRefreshTokenCookieToResponse(HttpServletResponse response, String refreshToken) {
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setMaxAge((int) jwtTokenProvider.calculateRemainingTime(refreshToken) / 1000);
        refreshTokenCookie.setPath("/");
        response.addCookie(refreshTokenCookie);
    }
}
