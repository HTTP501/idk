package com.ssafy.idk.domain.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RedisService {

    private final RedisTemplate<String, String> redisTemplate;

    // 인증 코드 저장
    public void saveVerificationCodeToRedis(String phoneNumber, String verificationCode) {
        String key = "verification_code_" + phoneNumber;
        redisTemplate.opsForValue().set(key, verificationCode);
        redisTemplate.expire(key, 5, TimeUnit.MINUTES);
    }

    // 리프래시 토큰 저장
    public void saveRefreshTokenToRedis(String phoneNumber, String refreshToken) {
        String key = "refresh_token_" + phoneNumber;
        redisTemplate.opsForValue().set(key, refreshToken);
    }

    // 인증 코드 조회
    public String getVerificationCodeFromRedis(String phoneNumber) {
        String key = "verification_code_" + phoneNumber;
        return redisTemplate.opsForValue().get(key);
    }

    // 리프래시 토큰 조회
    public String getRefreshTokenFromRedis(String phoneNumber) {
        String key = "refresh_token_" + phoneNumber;
        return redisTemplate.opsForValue().get(key);
    }

    // 인증 코드 삭제
    public void deleteVerificationCode(String phoneNumber) {
        String key = "verification_code_" + phoneNumber;
        redisTemplate.delete(key);
    }

    // 리프래시 토큰 삭제
    public void deleteRefreshToken(String phoneNumber) {
        String key = "refresh_token_" + phoneNumber;
        redisTemplate.delete(key);
    }

}
