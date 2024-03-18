package com.ssafy.idk.domain.account.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "RSAKey")
@AllArgsConstructor
@Getter
@Builder
public class RSAKey {

    @Id
    private Long userId;
    private String publicKey;
    private String privateKey;

    public static RSAKey of (
            final Long userId,
            final String publicKey,
            final String privateKey
    ) {
        return RSAKey.builder()
                .userId(userId)
                .publicKey(publicKey)
                .privateKey(privateKey)
                .build();
    }

}
