package com.ssafy.idk.domain.member.jwt;

import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Slf4j
@Component
public class JwtTokenProvider {

    private final SecretKey secretKey;
    private final long accessTokenExpirationMillis;
    private final long refreshTokenExpirationMillis;

    public JwtTokenProvider(
            @Value("${spring.jwt.secret}") String secret,
            @Value("${spring.jwt.access-token-expiration-millis}") long accessTokenExpirationMillis,
            @Value("${spring.jwt.refresh-token-expiration-millis}") long refreshTokenExpirationMillis
    ) {
        this.secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
        this.accessTokenExpirationMillis = accessTokenExpirationMillis;
        this.refreshTokenExpirationMillis = refreshTokenExpirationMillis;
    }

    // 토큰에서 카테고리 추출
    public String getCategory(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("category", String.class);
    }

    // 토큰에서 전화번호 추출
    public String getPhoneNumber(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("phoneNumber", String.class);
    }

    // 토큰에서 만료기간 추출
    public Date getExpirationDate(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration();
    }

    // 남은 시간 계산
    public long calculateRemainingTime(String token) {
        Date expirationDate = getExpirationDate(token);
        Date now = new Date();
        return expirationDate.getTime() - now.getTime();
    }

    // 토큰 만료 체크
    public Boolean isExpired(String token) {

        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration()
                .before(new Date());
    }

    // 토큰 생성
    public String createToken(String category,  String phoneNumber) {
        long tokenExpirationMillis;

        if (category.equals("access")) {
            tokenExpirationMillis = accessTokenExpirationMillis;
        } else {
            tokenExpirationMillis = refreshTokenExpirationMillis;
        }

        return Jwts.builder()
                .claim("category", category)
                .claim("phoneNumber", phoneNumber)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + tokenExpirationMillis))
                .signWith(secretKey)
                .compact();
    }
}
