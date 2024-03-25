package com.ssafy.ca.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.ca.domain.Member;
import com.ssafy.ca.dto.*;
import com.ssafy.ca.dto.SignRequestDto.ConsentInfoDto;
import com.ssafy.ca.exception.CaException;
import com.ssafy.ca.global.error.ErrorCode;
import com.ssafy.ca.repository.MemberRepository;
import com.ssafy.ca.util.CICreator;
import com.ssafy.ca.util.DigitalSignature;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CaService {

    private final MemberRepository memberRepository;

    // CI 생성
    // 회원가입과 유사
    public CreateCIResponseDto createCI(CreateCIRequestDto requestDto) {

        // connection Information 생성
        String connectionInformation = CICreator.generateCI(requestDto.getName(), requestDto.getBirthDate(), requestDto.getPhoneNumber());

        Member member = Member.builder()
                .name(requestDto.getName())
                .birthDate(requestDto.getBirthDate())
                .phoneNumber(requestDto.getPhoneNumber())
                .connectionInformation(connectionInformation)
                .digitalSignature(null)
                .build();

        memberRepository.save(member);

        return CreateCIResponseDto.of(connectionInformation);
    }

    // CI 조회
    public GetCIResponseDto getCI(GetCIRequestDto requestDto) {
        Member member = memberRepository.findByNameAndBirthDateAndPhoneNumber(requestDto.getName(), requestDto.getBirthDate(), requestDto.getPhoneNumber())
                .orElseThrow(() -> new CaException(ErrorCode.asdf));
        return GetCIResponseDto.of(member.getConnectionInformation());
    }

    // 전자서명 요청(생성)
    public SignResponseDto signRequest(SignRequestDto requestDto) throws JsonProcessingException {

        Member member = memberRepository.findByNameAndBirthDateAndPhoneNumber(requestDto.getName(), requestDto.getBirthDate(), requestDto.getPhoneNumber())
                .orElseThrow(() -> new CaException(ErrorCode.asdf));

        // ci 검증
        if (member.getConnectionInformation() != requestDto.getConnectionInformation()) {
            throw new CaException(ErrorCode.asdf);
        }

        // 전자서명 데이터 준비 (요청 데이터를 바탕으로 생성)
        String dataToSign = prepareSignData(requestDto);

        // 전자서명 생성
        byte[] signedData = null;
        try {
            signedData = DigitalSignature.signData(dataToSign.getBytes());
        } catch (Exception e) {
            throw new CaException(ErrorCode.CA_SIGN_ERROR);
        }

        String encodedSignedData = Base64.getEncoder().encodeToString(signedData);
        member.updateDigitalSignature(encodedSignedData);
        memberRepository.save(member);

        return SignResponseDto.of(encodedSignedData);
    }

    // 전자서명 검증


    // 전자서명 데이터 준비 메서드 (필요에 따라 구현)
    private String prepareSignData(SignRequestDto requestDto) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();

        String agreement = requestDto.getAgreement();
        String name = requestDto.getName();
        String birthDate = requestDto.getBirthDate();
        String phoneNumber = requestDto.getPhoneNumber();
        String connectionInformation = requestDto.getConnectionInformation();

        List<ConsentInfoDto> consentInfoList = requestDto.getConsentInfoList();

        // SignData 객체 생성
        SignData signData = new SignData();
        signData.setAgreement(agreement);
        signData.setName(name);
        signData.setBirthDate(birthDate);
        signData.setPhoneNumber(phoneNumber);
        signData.setConnectionInformation(connectionInformation);
        signData.setConsentInfoList(consentInfoList);

        // SignData 객체를 JSON으로 변환
        String jsonData = mapper.writeValueAsString(signData);

        return jsonData;
    }

    // SignData 객체
    @Getter
    @Setter
    class SignData {

        private String agreement;
        private String name;
        private String birthDate;
        private String phoneNumber;
        private String connectionInformation;
        private List<ConsentInfoDto> consentInfoList;
    }
}
