package com.ssafy.idk.global.util;

import javax.crypto.Cipher;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.HashMap;

public class RSAUtil {

    public static HashMap<String, String> generateKeyPair() {

        HashMap<String, String> pairKey = new HashMap<>();

        try {
            SecureRandom secureRandom = new SecureRandom();
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048, secureRandom);
            KeyPair keyPair = keyPairGenerator.genKeyPair();

            pairKey.put("publicKey", encodeBase64(keyPair.getPublic().getEncoded()));
            pairKey.put("privateKey", encodeBase64(keyPair.getPrivate().getEncoded()));
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
        return pairKey;
    }

    public static String encode(String publicKey, String text) {
        try {
            Cipher cipher = Cipher.getInstance("RSA");
            cipher.init(Cipher.ENCRYPT_MODE, generatePublicKey(publicKey));
            return encodeBase64(cipher.doFinal(text.getBytes()));
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }

    public static String decode(String publicKey, String encodedText) {
        try {
            Cipher cipher = Cipher.getInstance("RSA");
            cipher.init(Cipher.DECRYPT_MODE, generatePrivateKey(publicKey));
            return new String(cipher.doFinal(Base64.getDecoder().decode(encodedText.getBytes())));
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }

    private static PublicKey generatePublicKey(String publicKey) throws NoSuchAlgorithmException, InvalidKeySpecException {
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        byte[] publicKeyBytes = Base64.getDecoder().decode(publicKey.getBytes());
        return keyFactory.generatePublic(new X509EncodedKeySpec(publicKeyBytes));
    }

    private static PrivateKey generatePrivateKey(String privateKey) throws NoSuchAlgorithmException, InvalidKeySpecException {
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        byte[] privateKeyBytes = Base64.getDecoder().decode(privateKey.getBytes());
        return keyFactory.generatePrivate(new PKCS8EncodedKeySpec(privateKeyBytes));
    }

    private static String encodeBase64(byte[] data) {
        return Base64.getEncoder().encodeToString(data);
    }
}

