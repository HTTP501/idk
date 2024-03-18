package com.ssafy.idk.global.util;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class RSAKeyPair {

    private final String publicKey;
    private final String privateKey;
}
