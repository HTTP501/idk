package com.ssafy.idk.domain.account.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "RSAKey")
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class RSAKey {

    @Id
    private Long memberId;

    private String privateKey;

    public static RSAKey of (
            final Long memberId,
            final String privateKey
    ) {
        return RSAKey.builder()
                .memberId(memberId)
                .privateKey(privateKey)
                .build();
    }

}
