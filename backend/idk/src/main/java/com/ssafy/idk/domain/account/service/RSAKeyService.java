package com.ssafy.idk.domain.account.service;

import com.ssafy.idk.domain.account.domain.RSAKey;
import com.ssafy.idk.domain.account.exception.RSAKeyException;
import com.ssafy.idk.domain.account.repository.RSAKeyRepository;
import com.ssafy.idk.global.error.ErrorCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RSAKeyService {

    private final RSAKeyRepository rsaKeyRepository;

    @Transactional
    public void saveRSAKey(Long userId, String publicKey, String privateKey) {
        rsaKeyRepository.save(RSAKey.of(userId, publicKey, privateKey));
    }

    public String findPrivateKey(Long userId) {
        RSAKey rsaKey = rsaKeyRepository.findById(userId)
                .orElseThrow(() -> new RSAKeyException(ErrorCode.RSAKEY_NOT_FOUND));
        return rsaKey.getPrivateKey();
    }
}
