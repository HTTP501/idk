package com.ssafy.idk.domain.account.service;

import com.ssafy.idk.domain.account.entity.RSAKey;
import com.ssafy.idk.domain.account.exception.RSAKeyException;
import com.ssafy.idk.domain.account.repository.RSAKeyRepository;
import com.ssafy.idk.global.error.ErrorCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RSAKeyService {

    private final RSAKeyRepository rsaKeyRepository;

    @Transactional
    public void saveRSAKey(Long memberId, String privateKey) {
        rsaKeyRepository.save(RSAKey.of(memberId, privateKey));
    }

    public String findPrivateKey(Long memberId) {
        RSAKey rsaKey = rsaKeyRepository.findById(memberId)
                .orElseThrow(() -> new RSAKeyException(ErrorCode.RSAKEY_NOT_FOUND));
        return rsaKey.getPrivateKey();
    }
}
