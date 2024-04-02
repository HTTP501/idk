package com.ssafy.idk.domain.client.service;

import com.ssafy.idk.domain.client.dto.request.SignupRequestDto;
import com.ssafy.idk.domain.client.dto.response.AutoTransferInfoDto;
import com.ssafy.idk.domain.client.exception.ClientException;
import com.ssafy.idk.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientCardService {

    private final RestTemplate restTemplate;

    @Value("${spring.mydata.bank-url}")
    private String bankUrl;

    @Value("${spring.mydata.card-url}")
    private String cardUrl;

    public List<AutoTransferInfoDto> getAutoTransferInfo(String name, String connectionInformation) {
        return new ArrayList<>();

    }

    // 회원 생성 (생성 요청 시 카드 더미도 같이 만들어야지 - 어제의 용훈이가 내일의 용훈이에게)
    public void signup(String name, String phoneNumber, String birthDate, String connectionInformation) {
        String signupApiUrl = cardUrl.concat("/api/card/signup");
        SignupRequestDto signupRequestDto = SignupRequestDto.of(name, phoneNumber, birthDate, connectionInformation);
        ResponseEntity<Void> responseEntity = restTemplate.postForEntity(signupApiUrl, signupRequestDto, Void.class);

        if (responseEntity.getStatusCode() != HttpStatus.OK) {
            throw new ClientException(ErrorCode.CLIENT_BANK_SIGNUP_FAILED);
        }
    }

    // 카드 목록 조회

    // 카드 상세 정보 조회
}
