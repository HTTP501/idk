package com.ssafy.idk.domain.client.service;

import com.ssafy.idk.domain.client.dto.request.SignupRequestDto;
import com.ssafy.idk.domain.client.dto.response.*;
import com.ssafy.idk.domain.client.exception.ClientException;
import com.ssafy.idk.domain.mydata.dto.response.PaymentInfoDto;
import com.ssafy.idk.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ClientCardService {

    private final RestTemplate restTemplate;

    @Value("${spring.mydata.card-url}")
    private String cardUrl;

    public List<PaymentInfoDto> getCardsInfo(String connectionInformation, String orgCode) {

        String cardsInfoApiUrl = cardUrl.concat("/api/card/payment");

        String urlTemplate = UriComponentsBuilder.fromHttpUrl(cardsInfoApiUrl)
                .queryParam("connectionInformation", "{connectionInformation}")
                .queryParam("orgCode", "{orgCode}")
                .encode()
                .toUriString();

        HttpHeaders headers = new HttpHeaders();
        MediaType mediaType = new MediaType("application", "json", StandardCharsets.UTF_8);
        headers.setContentType(mediaType);

        HttpEntity<?> request = new HttpEntity<>(headers);

        Map<String, String> param = new HashMap<>();
        param.put("connectionInformation", connectionInformation);
        param.put("orgCode", orgCode);

        ResponseEntity<PaymentInfoListDto> responseEntity = restTemplate.exchange(urlTemplate, HttpMethod.GET, request, PaymentInfoListDto.class, param);

        if (responseEntity.getStatusCode() != HttpStatus.OK) {
            throw new ClientException(ErrorCode.CLIENT_CARDS_INFO_FAILED);
        }

        return Objects.requireNonNull(responseEntity.getBody()).getData().getPaymentInfoDtoList();
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
