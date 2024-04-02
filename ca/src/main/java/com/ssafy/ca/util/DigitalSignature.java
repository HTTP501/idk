package com.ssafy.ca.util;

import com.ssafy.ca.exception.CaException;
import com.ssafy.ca.global.error.ErrorCode;
import org.bouncycastle.asn1.*;
import org.bouncycastle.asn1.cms.AttributeTable;
import org.bouncycastle.asn1.cms.CMSAttributes;
import org.bouncycastle.asn1.x509.AlgorithmIdentifier;
import org.bouncycastle.cert.X509CertificateHolder;
import org.bouncycastle.cert.jcajce.JcaCertStore;
import org.bouncycastle.cms.*;
import org.bouncycastle.cms.jcajce.JcaSignerInfoGeneratorBuilder;
import org.bouncycastle.cms.jcajce.JcaSimpleSignerInfoVerifierBuilder;
import org.bouncycastle.operator.ContentSigner;
import org.bouncycastle.operator.DigestCalculator;
import org.bouncycastle.operator.jcajce.JcaContentSignerBuilder;
import org.bouncycastle.operator.jcajce.JcaDigestCalculatorProviderBuilder;
import org.bouncycastle.util.Store;
import org.bouncycastle.asn1.cms.Attribute;

import java.io.OutputStream;
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
            // URL resourceUrl  = DigitalSignature.class.getClassLoader().getResource("certs/ca_private.key");
            // File privateKeyFile = new File(resourceUrl.toURI());
            // String privateKeyPath2 = privateKeyFile.getAbsolutePath();
            LOGGER.severe("상대경로 : " + privateKeyPath);
            // LOGGER.severe("절대경로로 : " + privateKeyPath2);
            
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
            String certificatePath = "./src/main/resources/certs/ca_certificate.pem";

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

//    // 전자서명 생성
//    public static byte[] signData(byte[] data) {
//
//        try {
//            String privateKeyPath = "src/main/resources/certs/ca_private.key";
//
//            // 파일 존재 여부 확인
//            if (!Files.exists(Paths.get(privateKeyPath))) {
//                LOGGER.severe("개인 키 파일이 존재하지 않습니다: " + privateKeyPath);
//                throw new CaException(ErrorCode.CA_PRIVATE_KEY_NOT_EXIST);
//            }
//
//            // 개인 키 로드
//            byte[] privateKeyBytes = Files.readAllBytes(Paths.get(privateKeyPath));
//
//            // PEM 형식 개인 키에서 헤더와 푸터 제거 및 개행문자 제거
//            String privateKeyPEM = new String(privateKeyBytes)
//                    .replace("-----BEGIN PRIVATE KEY-----", "")
//                    .replace("-----END PRIVATE KEY-----", "")
//                    .replaceAll("\\s", "");
//
//            // Base64 디코딩
//            byte[] decodedPrivateKey = Base64.getDecoder().decode(privateKeyPEM);
//
//            // 개인 키 스펙 생성 및 RSA 알고리즘을 사용하여 개인 키 생성
//            PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(decodedPrivateKey);
//            KeyFactory kf = KeyFactory.getInstance("RSA");
//            PrivateKey privateKey = kf.generatePrivate(spec);
//            LOGGER.info("개인 키 로딩 완료");
//
//            // CMS 서명 생성기 초기화
//            CMSSignedDataGenerator gen = new CMSSignedDataGenerator();
//            ContentSigner sha256Signer = new JcaContentSignerBuilder("SHA256withRSA").build(privateKey);
//
//            // 공개 키 파일의 경로 설정
//            String certificatePath = "src/main/resources/certs/ca_certificate.pem";
//
//            // 공개 키 파일 존재 여부 확인
//            if (!Files.exists(Paths.get(certificatePath))) {
//                LOGGER.severe("인증서 파일이 존재하지 않습니다: " + certificatePath);
//                throw new CaException(ErrorCode.CA_CERTIFICATION_NOT_EXIST);
//            }
//
//            // 인증서 로드 및 공개 키 추출
//            CertificateFactory factory = CertificateFactory.getInstance("X.509");
//            X509Certificate certificate = (X509Certificate) factory.generateCertificate(Files.newInputStream(Paths.get(certificatePath)));
//
//            // 서명 정보 생성기 추가 (Bouncy Castle 라이브러리 사용)
//            JcaSignerInfoGeneratorBuilder signerInfoBuilder = new JcaSignerInfoGeneratorBuilder(
//                    new JcaDigestCalculatorProviderBuilder().setProvider("BC").build());
//            gen.addSignerInfoGenerator(signerInfoBuilder.build(sha256Signer, certificate));
//
//            // 속성을 담을 ASN1EncodableVector 생성
//            ASN1EncodableVector vector = new ASN1EncodableVector();
//
//            // contentType 속성 추가
//            vector.add(new Attribute(CMSAttributes.contentType, new DERSet(new CMSProcessableByteArray(data).getContentType())));
//
//            // signingTime 속성 추가
//            vector.add(new Attribute(CMSAttributes.signingTime, new DERSet(new org.bouncycastle.asn1.cms.Time(new Date()))));
//
//            // DigestCalculator 생성 및 데이터 처리
//            DigestCalculator digestCalculator = new JcaDigestCalculatorProviderBuilder().build().get(AlgorithmIdentifier.getInstance(CMSAttributes.messageDigest));
//            OutputStream outputStream = digestCalculator.getOutputStream();
//            outputStream.write(data);
//            outputStream.close();
//
//            // 해시 계산 완료 후 결과 가져오기
//            byte[] digest = digestCalculator.getDigest();
//
//            // messageDigest 속성 추가
//            ASN1Encodable digestValue = new DEROctetString(digest);
//            vector.add(new Attribute(CMSAttributes.messageDigest, new DERSet(digestValue)));
//
//            // ASN1EncodableVector를 사용하여 AttributeTable 생성
//            AttributeTable signedAttributes = new AttributeTable(new DERSet(vector));
//
//            signerInfoBuilder.setSignedAttributeGenerator(new DefaultSignedAttributeTableGenerator(signedAttributes));
//
//            // 인증서 체인을 CMS 서명 데이터에 포함시키기 위한 코드 추가
//            Store certs = new JcaCertStore(Collections.singletonList(certificate));
//            gen.addCertificates(certs);
//
//            // 전자서명 대상 데이터 준비
//            CMSTypedData cmsData = new CMSProcessableByteArray(data);
//
//            // 전자서명 생성
//            CMSSignedData cms = gen.generate(cmsData, true);
//            byte[] signedData = cms.getEncoded();
//
//            LOGGER.info("데이터 서명 완료");
//
//            return signedData;
//        } catch (Exception e) {
//            LOGGER.severe("전자 서명 생성 중 오류 발생: " + e.getMessage());
//            throw new CaException(ErrorCode.CA_SIGN_ERROR);
//        }
//    }
//
//    // 전자서명 검증
//    public static boolean verifySignature(byte[] originalData, byte[] signedData) {
//
//        try {
//            // 공개 키 파일의 경로 설정
//            String certificatePath = "src/main/resources/certs/ca_certificate.pem";
//
//            // 공개 키 파일 존재 여부 확인
//            if (!Files.exists(Paths.get(certificatePath))) {
//                LOGGER.severe("인증서 파일이 존재하지 않습니다: " + certificatePath);
//                throw new CaException(ErrorCode.CA_CERTIFICATION_NOT_EXIST);
//            }
//
//            // 인증서 로드
//            CertificateFactory factory = CertificateFactory.getInstance("X.509");
//            X509Certificate certificate = (X509Certificate) factory.generateCertificate(Files.newInputStream(Paths.get(certificatePath)));
//            PublicKey publicKey = certificate.getPublicKey();
//            LOGGER.info("공개 키 로딩 완료");
//
//            // 서명된 데이터에서 CMS 서명 데이터 추출
//            CMSSignedData cms = new CMSSignedData(signedData);
//            Store<X509CertificateHolder> certStore = cms.getCertificates();
//            SignerInformationStore signers = cms.getSignerInfos();
//            Collection<SignerInformation> signerCollection = signers.getSigners();
//
//            for (SignerInformation signer : signerCollection) {
//                Collection<X509CertificateHolder> certCollection = certStore.getMatches(signer.getSID());
//                Iterator<X509CertificateHolder> certIt = certCollection.iterator();
//                X509CertificateHolder certHolder = certIt.next();
//
//                // 서명 검증 준비
//                SignerInformationVerifier verifier = new JcaSimpleSignerInfoVerifierBuilder().setProvider("BC").build(certHolder);
//
//                // 서명 검증
//                if (!signer.verify(verifier)) {
//                    LOGGER.severe("서명 검증 실패");
//                    return false; // 서명 검증 실패
//                }
//            }
//
//            // 원본 데이터와 서명된 데이터의 내용 비교
//            CMSTypedData cmsData = cms.getSignedContent();
//            byte[] signedContentData = (byte[]) cmsData.getContent();
//
//            if (!Arrays.equals(originalData, signedContentData)) {
//                LOGGER.severe("원본 데이터와 서명된 데이터가 일치하지 않습니다.");
//                return false; // 데이터 불일치
//            }
//
//            LOGGER.info("서명 검증 성공");
//            return true; // 서명 검증 성공
//        } catch (Exception e) {
//            LOGGER.severe("전자 서명 검증 중 오류 발생: " + e.getMessage());
//            throw new CaException(ErrorCode.CA_SIGN_VERIFY_ERROR);
//        }
//    }





//    // 전자서명 생성
//    public static byte[] signData(byte[] data) {
//
//        try {
//            String privateKeyPath = "src/main/resources/certs/ca_private.key";
//
//            // 파일 존재 여부 확인
//            if (!Files.exists(Paths.get(privateKeyPath))) {
//                LOGGER.severe("개인 키 파일이 존재하지 않습니다: " + privateKeyPath);
//                throw new CaException(ErrorCode.CA_PRIVATE_KEY_NOT_EXIST);
//            }
//
//            // 개인 키 로드
//            byte[] privateKeyBytes = Files.readAllBytes(Paths.get(privateKeyPath));
//
//            // PEM 형식의 개인 키 디코딩
//            String privateKeyPEM = new String(privateKeyBytes);
//            privateKeyPEM = privateKeyPEM.replace("-----BEGIN PRIVATE KEY-----", "");
//            privateKeyPEM = privateKeyPEM.replace("-----END PRIVATE KEY-----", "");
//
//            // 개행문자 제거
//            privateKeyPEM = privateKeyPEM.replaceAll("\\s", "");
//
//            // Base64 디코딩
//            byte[] decodedPrivateKey = Base64.getDecoder().decode(privateKeyPEM);
//
//            // 개인 키 스펙 생성
//            PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(decodedPrivateKey);
//            KeyFactory kf = KeyFactory.getInstance("RSA"); // 알고리즘 지정
//            LOGGER.info("개인 키 로딩 완료");
//
//            // 데이터 서명
//            PrivateKey privateKey = kf.generatePrivate(spec);
//            Signature signature = Signature.getInstance("SHA256withRSA"); // 알고리즘 지정
//            signature.initSign(privateKey);
//            signature.update(data);
//
//            LOGGER.info("데이터 서명 완료");
//
//            return signature.sign();
//        } catch (Exception e) {
//            LOGGER.severe("전자 서명 생성 중 오류 발생: " + e.getMessage());
//            throw new CaException(ErrorCode.CA_SIGN_ERROR);
//        }
//    }
//
//    // 전자서명 검증
//    public static boolean verifySignature(byte[] data, byte[] signature) {
//
//        try {
//            String certificatePath = "src/main/resources/certs/ca_certificate.pem";
//
//            // 파일 존재 여부 확인
//            if (!Files.exists(Paths.get(certificatePath))) {
//                LOGGER.severe("인증서 파일이 존재하지 않습니다: " + certificatePath);
//                throw new CaException(ErrorCode.CA_CERTIFICATION_NOT_EXIST);
//            }
//
//            // 공개 키 로드
//            CertificateFactory factory = CertificateFactory.getInstance("X.509");
//            X509Certificate certificate = (X509Certificate) factory.generateCertificate(Files.newInputStream(Paths.get(certificatePath)));
//            PublicKey publicKey = certificate.getPublicKey();
//
//            LOGGER.info("공개 키 로딩 완료");
//
//            // 서명 검증
//            Signature sig = Signature.getInstance("SHA256withRSA"); // 알고리즘 지정
//            sig.initVerify(publicKey);
//            sig.update(data);
//
//            boolean result = sig.verify(signature);
//            LOGGER.info("서명 검증 결과: " + result);
//
//            return result;
//
//        } catch (Exception e) {
//            LOGGER.severe("전자 서명 검증 중 오류 발생: " + e.getMessage());
//            throw new CaException(ErrorCode.CA_SIGN_VERIFY_ERROR);
//        }
//    }
}
