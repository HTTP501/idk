package com.ssafy.ca.util;

import com.ssafy.ca.exception.CaException;
import com.ssafy.ca.global.error.ErrorCode;
import org.springframework.core.io.ClassPathResource;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;
import java.util.logging.Logger;

public class DigitalSignature {

    private static final Logger LOGGER = Logger.getLogger(DigitalSignature.class.getName());

    // 전자서명 생성
    public static byte[] signData(byte[] data) {

        try {
            String privateKeyPath = "src/main/resources/certs/ca_private.key";

            // 파일 존재 여부 확인
            if (!Files.exists(Paths.get(privateKeyPath))) {
                LOGGER.severe("개인 키 파일이 존재하지 않습니다: " + privateKeyPath);
                throw new CaException(ErrorCode.CA_PRIVATE_KEY_NOT_EXIST);
            }

            // 개인 키 로드
            byte[] privateKeyBytes = Files.readAllBytes(Paths.get(privateKeyPath));

            // PEM 형식의 개인 키 디코딩
            String privateKeyPEM = new String(privateKeyBytes);
            privateKeyPEM = privateKeyPEM.replace("-----BEGIN PRIVATE KEY-----", "");
            privateKeyPEM = privateKeyPEM.replace("-----END PRIVATE KEY-----", "");

            // 개행문자 제거
            privateKeyPEM = privateKeyPEM.replaceAll("\\s", "");

            // Base64 디코딩
            byte[] decodedPrivateKey = Base64.getDecoder().decode(privateKeyPEM);

            // 개인 키 스펙 생성
            PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(decodedPrivateKey);
            KeyFactory kf = KeyFactory.getInstance("RSA"); // 알고리즘 지정
            LOGGER.info("개인 키 로딩 완료");

            // 데이터 서명
            PrivateKey privateKey = kf.generatePrivate(spec);
            Signature signature = Signature.getInstance("SHA256withRSA"); // 알고리즘 지정
            signature.initSign(privateKey);
            signature.update(data);

            LOGGER.info("데이터 서명 완료");

            return signature.sign();
        } catch (Exception e) {
            LOGGER.severe("전자 서명 생성 중 오류 발생: " + e.getMessage());
            throw new CaException(ErrorCode.CA_SIGN_ERROR);
        }
    }

    // 전자서명 검증
    public static boolean verifySignature(byte[] data, byte[] signature) {

        try {
            String certificatePath = "src/main/resources/certs/ca_certificate.pem";

            // 파일 존재 여부 확인
            if (!Files.exists(Paths.get(certificatePath))) {
                LOGGER.severe("인증서 파일이 존재하지 않습니다: " + certificatePath);
                throw new CaException(ErrorCode.CA_CERTIFICATION_NOT_EXIST);
            }

            // 공개 키 로드
            CertificateFactory factory = CertificateFactory.getInstance("X.509");
            X509Certificate certificate = (X509Certificate) factory.generateCertificate(Files.newInputStream(Paths.get(certificatePath)));
            PublicKey publicKey = certificate.getPublicKey();

            LOGGER.info("공개 키 로딩 완료");

            // 서명 검증
            Signature sig = Signature.getInstance("SHA256withRSA"); // 알고리즘 지정
            sig.initVerify(publicKey);
            sig.update(data);

            boolean result = sig.verify(signature);
            LOGGER.info("서명 검증 결과: " + result);

            return result;

        } catch (Exception e) {
            LOGGER.severe("전자 서명 검증 중 오류 발생: " + e.getMessage());
            throw new CaException(ErrorCode.CA_SIGN_VERIFY_ERROR);
        }
    }
}
