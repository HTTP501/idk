package com.ssafy.card.domain.digitalsigniture.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
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

    public JwtTokenProvider(
            @Value("${spring.jwt.secret}") String secret,
            @Value("${spring.jwt.access-token-expiration-millis}") long accessTokenExpirationMillis) {
        this.secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
        this.accessTokenExpirationMillis = accessTokenExpirationMillis;
    }

    // 토큰 생성
    public String createToken(String receiverOrgCode, String connectionInformation, String providerOrgCode) {

        return Jwts.builder()
                .claim("recevierOrgCode", receiverOrgCode)
                .claim("connectionInformation", connectionInformation)
                .claim("providerOrgCode", providerOrgCode)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + accessTokenExpirationMillis))
                .signWith(secretKey)
                .compact();
    }

    // 토큰 검증(만료 포함)
    public Boolean validateToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token);

            return claimsJws.getPayload()
                    .getExpiration()
                    .before(new Date());
        } catch (Exception e) {
            log.error("Invalid JWT token: {}", e.getMessage());
            return false;
        }
    }

    // 토큰에서 마이데이터 사업자 기관 코드 추출
    public String getReceiverOrgCode(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("receiverOrgCode", String.class);
    }

    // 토큰에서 정보제공자 기관 코드추출
    public String getProviderOrgCode(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("providerOrgCode", String.class);
    }

    // 토큰에서 정보주체 ci 추출
    public String getConnectionInformation(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("connectionInformation", String.class);
    }
}
