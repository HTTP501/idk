package com.ssafy.idk.domain.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RedisService {

    private final RedisTemplate<String, String> redisTemplate;

    public void saveVerificationCodeToRedis(String phoneNumber, String verificationCode) {
        String key = "verification_code_" + phoneNumber;
        redisTemplate.opsForValue().set(key, verificationCode);
        redisTemplate.expire(key, 5, TimeUnit.MINUTES); // 인증 코드는 5분 후에 만료될 수 있도록 설정
    }

    public void saveRefreshTokenToRedis(String phoneNumber, String refreshToken) {
        String key = "refresh_token_" + phoneNumber;
        redisTemplate.opsForValue().set(key, refreshToken);
    }

    public String getVerificationCodeFromRedis(String phoneNumber) {
        String key = "verification_code_" + phoneNumber;
        return redisTemplate.opsForValue().get(key);
    }

    public String getRefreshTokenFromRedis(String phoneNumber) {
        String key = "refresh_token_" + phoneNumber;
        return redisTemplate.opsForValue().get(key);
    }

    public void deleteVerificationCode(String phoneNumber) {
        String key = "verification_code_" + phoneNumber;
        redisTemplate.delete(key);
    }

    public void deleteRefreshToken(String phoneNumber) {
        String key = "refresh_token_" + phoneNumber;
        redisTemplate.delete(key);
    }

}
