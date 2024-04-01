package com.ssafy.idk.domain.client.service;

import com.ssafy.idk.domain.client.dto.request.AgreeRequestToMydataDto;
import com.ssafy.idk.domain.client.dto.request.CertifyRequestToMydataDto;
import com.ssafy.idk.domain.client.dto.request.SignupRequestDto;
import com.ssafy.idk.domain.client.dto.response.CertifyResponseFromMydataDto;
import com.ssafy.idk.domain.mydata.exception.MydataException;
import com.ssafy.idk.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ClientMydataService {

    private final RestTemplate restTemplate;

    @Value("${spring.mydata.mydata-url}")
    private String mydataUrl;


    // 회원가입
    public void signupMydata(String name, String phoneNumber, String birthDate, String connectionInformation) {
        String signupApiUrl = mydataUrl.concat("/api/mydata/signup");
        SignupRequestDto signupRequestDto = SignupRequestDto.of(name, phoneNumber, birthDate, connectionInformation);
        ResponseEntity<Void> responseEntity = restTemplate.postForEntity(signupApiUrl, signupRequestDto, Void.class);

        if (responseEntity.getStatusCode() != HttpStatus.OK) {
            throw new MydataException(ErrorCode.MYDATA_FAILED);
        }
    }

    // 마이데이터 이용 동의 요청 (POST)
    public void agreeMydata(String name, String phoneNumber, String connectionInformation) {

        // MYDATA 서버에 사용자가 동의했음을 알리기
        String mydataServerUrl = mydataUrl.concat("/api/mydata/agree");

        // 요청 본문 생성
        AgreeRequestToMydataDto agreeToMydataRequestDto = AgreeRequestToMydataDto.of(name, phoneNumber, connectionInformation);

        // MYDATA 서버에 요청, 응답
        ResponseEntity<Void> responseEntity = restTemplate.postForEntity(mydataServerUrl, agreeToMydataRequestDto, Void.class);

        // HTTP 상태 코드가 실패인지 확인
        if (responseEntity.getStatusCode() != HttpStatus.OK) {
            throw new MydataException(ErrorCode.MYDATA_FAILED);
        }
    }
}
