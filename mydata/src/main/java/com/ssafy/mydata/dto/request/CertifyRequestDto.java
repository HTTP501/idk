package com.ssafy.mydata.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CertifyRequestDto {

    // 기관 인증을 위한 정보
    private String clientId;
    private String clientSecret;

    // 타 기관에 보낼 정보
    private String connectionInformation; // 사용자 ci
    private String consentInfo; // 전송요구목록
    private String digitalSignature; // 서명목록

}
