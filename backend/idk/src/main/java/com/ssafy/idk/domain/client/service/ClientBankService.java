package com.ssafy.idk.domain.client.service;

import com.ssafy.idk.domain.client.dto.request.AutoTransferInfoRequestToBankDto;
import com.ssafy.idk.domain.client.dto.request.CertifyRequestToBankDto;
import com.ssafy.idk.domain.client.dto.request.SignupRequestDto;
import com.ssafy.idk.domain.client.dto.response.AccountInfoResponseDto;
import com.ssafy.idk.domain.client.dto.response.AutoTransferInfoDto;
import com.ssafy.idk.domain.client.dto.response.AutoTransferInfoResponseFromBankDto;
import com.ssafy.idk.domain.client.dto.response.CertifyResponseFromBankDto;
import com.ssafy.idk.domain.client.exception.ClientException;
import com.ssafy.idk.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ClientBankService {

    private final RestTemplate restTemplate;

    @Value("${spring.mydata.bank-url}")
    private String bankUrl;

    // 회원 생성, 은행사 계좌 더미데이터 생성 요청
    public void signup(String name, String phoneNumber, String birthDate, String connectionInformation) {
        String signupApiUrl = bankUrl.concat("/api/bank/signup");
        SignupRequestDto signupRequestDto = SignupRequestDto.of(name, phoneNumber, birthDate, connectionInformation);
        ResponseEntity<Void> responseEntity = restTemplate.postForEntity(signupApiUrl, signupRequestDto, Void.class);

        if (responseEntity.getStatusCode() != HttpStatus.OK) {
            throw new ClientException(ErrorCode.CLIENT_BANK_SIGNUP_FAILED);
        }
    }

    // 통합인증 요청(토큰 발급)
    public String certifyToBank(String connectionInformation, String receiverOrgCode,
                                String providerOrgCode, String clientId,
                                String clientSecret, Map<String, String> consent, String signedConsent)
    {
        String certifyApiUrl = bankUrl.concat("/api/bank/certify");

        // 요청 헤더
        HttpHeaders headers = new HttpHeaders();
        MediaType mediaType = new MediaType("application", "json", StandardCharsets.UTF_8);
        headers.setContentType(mediaType);

        // 요청 본문
        CertifyRequestToBankDto certifyRequestToBankDto = CertifyRequestToBankDto.of(connectionInformation, receiverOrgCode, providerOrgCode, clientId, clientSecret, consent, signedConsent);

        HttpEntity<CertifyRequestToBankDto> requestEntity = new HttpEntity<>(certifyRequestToBankDto, headers);

        // 요청, 응답
        ResponseEntity<CertifyResponseFromBankDto> responseEntity = restTemplate.exchange(certifyApiUrl, HttpMethod.POST, requestEntity, CertifyResponseFromBankDto.class);

        if (responseEntity.getStatusCode() != HttpStatus.OK) {
            throw new ClientException(ErrorCode.CLIENT_BANK_SIGNUP_FAILED);
        }

        return Objects.requireNonNull(responseEntity.getBody()).getData().getAccessToken();
    }

    // 자동이체 목록 요청
    public List<AutoTransferInfoDto> getAutoTransferInfo(String name, String connectionInformation) {

        String autoTransferInfoRequestApiUrl = bankUrl.concat("/api/bank/auto-transfer");

        String urlTemplate = UriComponentsBuilder.fromHttpUrl(autoTransferInfoRequestApiUrl)
                .queryParam("name", "{name}")
                .queryParam("connectionInformation", "{connectionInformation}")
                .encode()
                .toUriString();

        HttpHeaders headers = new HttpHeaders();
        MediaType mediaType = new MediaType("application", "json", StandardCharsets.UTF_8);
        headers.setContentType(mediaType);

        HttpEntity<?> request = new HttpEntity<>(headers);

        Map<String, String> param = new HashMap<>();
        param.put("name", name);
        param.put("connectionInformation", connectionInformation);

        ResponseEntity<AutoTransferInfoResponseFromBankDto> responseEntity = restTemplate.exchange(urlTemplate, HttpMethod.GET, request, AutoTransferInfoResponseFromBankDto.class, param);

        if (responseEntity.getStatusCode() != HttpStatus.OK) {
            throw new ClientException(ErrorCode.CLIENT_AUTO_TRANSFER_INFO_FAILED);
        }
        AutoTransferInfoResponseFromBankDto response = responseEntity.getBody();

        return Objects.requireNonNull(responseEntity.getBody()).getData().getAutoTransferList();
    }

    // 계좌 목록 조회

    // 계좌 명의 조회(은행 이름, 계좌번호)
    public String getaccountInfo(String orgName, String accountNumber) {

        String bankGetAccountInfoApiUrl = bankUrl.concat("/api/bank/account");

        String urlTemplate = UriComponentsBuilder.fromHttpUrl(bankGetAccountInfoApiUrl)
                .queryParam("orgName", "{orgName}")
                .queryParam("accountNumber", "{accountNumber}")
                .encode()
                .toUriString();

        HttpHeaders headers = new HttpHeaders();
        MediaType mediaType = new MediaType("application", "json", StandardCharsets.UTF_8);
        headers.setContentType(mediaType);

        HttpEntity<?> request = new HttpEntity<>(headers);

        Map<String, String> param = new HashMap<>();
        param.put("orgName", orgName);
        param.put("accountNumber", accountNumber);

        ResponseEntity<AccountInfoResponseDto> responseEntity = restTemplate.exchange(urlTemplate, HttpMethod.GET, request, AccountInfoResponseDto.class, param);

        AccountInfoResponseDto accountInfoResponseDto = responseEntity.getBody();

        assert accountInfoResponseDto != null;
        return accountInfoResponseDto.getData().getAccountNumber();
    }

    // 고객의 자동이체(상세정보 포함) 목록 조회

}
