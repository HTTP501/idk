package com.ssafy.mydata.service;

import com.ssafy.mydata.dto.response.ClientCertifyResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ClientProviderService {

    @Value("${spring.mydata.bank-url}")
    private String bankUrl;

    @Value("${spring.mydata.card-url}")
    private String cardUrl;

    private final RestTemplate restTemplate;

    // bank 통합인증 요청
    public String certifyToBank(String orgCode, Map<String, String> consent, List<Map<String, String>> signatureInfoList) {

        String bankServerUrl = bankUrl.concat("/api/bank/certify");

        // HttpHeaders 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 요청 본문 구성
        Map<String, Object> requestBody = Map.of(
                "orgCode", orgCode,
                "consent", consent,
                "signatureInfoList", signatureInfoList
        );

        // HttpEntity에 헤더와 요청 본문 추가
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        // 요청 후 응답
        ClientCertifyResponseDto response = restTemplate.postForObject(bankServerUrl, requestEntity, ClientCertifyResponseDto.class);
        String token = response.getData().getToken();
        return token;
    }

    // card 통합인증 요청
    public String certifyToCard(String orgCode, Map<String, String> consent, List<Map<String, String>> signatureInfoList) {

        String cardServerUrl = cardUrl.concat("/api/card/certify");

        // HttpHeaders 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 요청 본문 구성
        Map<String, Object> requestBody = Map.of(
                "orgCode", orgCode,
                "consent", consent,
                "signatureInfoList", signatureInfoList
        );

        // HttpEntity에 헤더와 요청 본문 추가
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        // 요청 후 응답
        ClientCertifyResponseDto response = restTemplate.postForObject(cardServerUrl, requestEntity, ClientCertifyResponseDto.class);
        String token = response.getData().getToken();
        return token;
    }
}
