package com.ssafy.ca;

import com.ssafy.ca.util.DigitalSignature;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class DigitalSignatureTest {

    public static void main(String[] args) {
//        try {
//
//            // 테스트할 메시지 정의
//            String testMessage = "이것은 전자서명 테스트 메시지입니다.";
//
//            // 메시지를 바이트 배열로 변환
//            byte[] messageBytes = testMessage.getBytes(StandardCharsets.UTF_8);
//
//            // 메시지 서명
//            byte[] signedData = DigitalSignature.signData(messageBytes);
//            String encodedSignedData = Base64.getEncoder().encodeToString(signedData);
//            System.out.println("서명된 데이터 (Base64 인코딩): " + encodedSignedData);
//
//            // 디코딩 후 출력
//            String decodedSignedData = new String(Base64.getDecoder().decode(encodedSignedData));
//            System.out.println("서명된 데이터 (디코딩 후): " + decodedSignedData);
//
//            // 서명 검증
//            boolean isVerified = DigitalSignature.verifySignature(messageBytes, signedData);
//            System.out.println("서명 검증 결과: " + (isVerified ? "성공" : "실패"));
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            System.out.println("예외 발생: " + e.getMessage());
//        }
    }
}
