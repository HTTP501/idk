package com.ssafy.bank.service;

import com.ssafy.bank.dto.request.VerifyAuthRequestDtoToMydata;
import com.ssafy.bank.dto.request.VerifySignatureRequestDtoToCa;
import com.ssafy.bank.dto.response.VerifyAuthResponseDtoFromMydata;
import com.ssafy.bank.exception.BankException;
import com.ssafy.bank.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final RestTemplate restTemplate;

    @Value("${spring.mydata.ca-url}")
    private String caUrl;

    @Value("${spring.mydata.mydata-url}")
    private String mydataUrl;

    // to mydata(종합 포털) 마이데이터 사업자 권한 검증 요청
    public Boolean verifyAuthority(String clientId, String clientSecret, String orgCode) {
        String mydataApiUrl = mydataUrl.concat("/api/mydata/verify_authority");

        // 요청 본문 생성
        VerifyAuthRequestDtoToMydata verifyAuthRequestDtoToMydata = VerifyAuthRequestDtoToMydata.of(clientId, clientSecret, orgCode, "MY_DATA_RECEIVER");

        // HttpHeaders 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 헤더와 본문 추가
        HttpEntity<VerifyAuthRequestDtoToMydata> requestEntity = new HttpEntity<>(verifyAuthRequestDtoToMydata, headers);

        ResponseEntity<Void> response = restTemplate.exchange(mydataApiUrl, HttpMethod.POST, requestEntity, Void.class);

        // HTTP 상태 코드가 실패인지 확인
        if (response.getStatusCode() != HttpStatus.OK) {
            throw new BankException(ErrorCode.BANK_MYDATA_REQUEST_FAILED);
        }

        // 응답 결과 추출
//        Boolean result = response.getBody().getData().getResult();

//        return result;

        return true;
    }


    // to ca(인증 기관) 전자서명 검증 요청
    public Boolean verifySignature(String name, String phoneNumber, String connectionInformation, Map<String, String> consent, String signedConsent) {
        String caApiUrl = caUrl.concat("/api/ca/sign_verify");
        System.out.println("signedConsent = " + signedConsent);
        VerifySignatureRequestDtoToCa verifySignatureRequestDtoToCa = VerifySignatureRequestDtoToCa.of(name, phoneNumber, connectionInformation, consent, signedConsent);
        System.out.println("verifySignatureRequestDtoToCa.getSignedConsent() = " + verifySignatureRequestDtoToCa.getSignedConsent());

        // HttpHeaders 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 헤더와 본문 추가
        HttpEntity<VerifySignatureRequestDtoToCa> requestEntity = new HttpEntity<>(verifySignatureRequestDtoToCa, headers);

        ResponseEntity<Void> response = restTemplate.exchange(caApiUrl, HttpMethod.POST, requestEntity, Void.class);

        // HTTP 상태 코드가 실패인지 확인
        if (response.getStatusCode() != HttpStatus.OK) {
            return false;
        }

        return true;
    }
}
