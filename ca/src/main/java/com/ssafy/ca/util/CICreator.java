package com.ssafy.ca.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;

public class CICreator {

    public static String generateCI(String name, String birthDate, String phoneNumber) {
        try {
            // 현재 시간을 밀리세컨드로 가져와서 문자열로 변환
            String currentTime = String.valueOf(Instant.now().toEpochMilli());

            // 사용자 정보와 현재 시간을 조합
            String source = name + birthDate + phoneNumber + currentTime;

            // SHA-256 MessageDigest 인스턴스 생성
            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            // 소스 데이터를 바이트 배열로 변환하여 해시 계산
            byte[] hash = digest.digest(source.getBytes(StandardCharsets.UTF_8));

            // 바이트 배열을 16진수 문자열로 변환
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if(hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }

            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 알고리즘이 존재하지 않습니다.", e);
        }
    }
}
