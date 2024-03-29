package com.ssafy.ca.service;


import com.ssafy.ca.domain.Member;
import com.ssafy.ca.domain.Organization;
import com.ssafy.ca.dto.request.CreateCIRequestDto;
import com.ssafy.ca.dto.request.SignRequestDto;
import com.ssafy.ca.dto.request.SignVerifyRequestDto;
import com.ssafy.ca.dto.response.CreateCIResponseDto;
import com.ssafy.ca.dto.response.GetCIResponseDto;
import com.ssafy.ca.dto.response.SignResponseDto;
import com.ssafy.ca.exception.CaException;
import com.ssafy.ca.global.error.ErrorCode;
import com.ssafy.ca.repository.MemberRepository;
import com.ssafy.ca.repository.OrganizationRepository;
import com.ssafy.ca.util.CICreator;
import com.ssafy.ca.util.CaUtil;
import com.ssafy.ca.util.DigitalSignature;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CaService {

    private final MemberRepository memberRepository;
    private final OrganizationRepository organizationRepository;

    // CI 생성
    // 회원가입과 유사
    @Transactional
    public CreateCIResponseDto createCI(CreateCIRequestDto requestDto) {

        String name = requestDto.getName();
        String phoneNumber = requestDto.getPhoneNumber();
        String birthDate = requestDto.getBirthDate();

        // 이름, 전화번호, 주민번호 유효성 검사
        isValidInput(name, birthDate, phoneNumber);

        // 유저 중복 체크
        memberRepository.findByNameAndBirthDateAndPhoneNumber(name, birthDate, phoneNumber)
                .ifPresent(member -> {
                    throw new CaException(ErrorCode.CA_MEMBER_DUPLICATED);
                });

        // ci 생성
        String connectionInformation = CICreator.generateCI(name, birthDate, phoneNumber);

        Member member = Member.builder()
                .name(name)
                .birthDate(birthDate)
                .phoneNumber(phoneNumber)
                .connectionInformation(connectionInformation)
                .build();

        // 유저 저장
        memberRepository.save(member);

        return CreateCIResponseDto.of(connectionInformation);
    }

    // CI 조회
    public GetCIResponseDto getCI(String name, String birthDate, String phoneNumber) {

        // 이름, 전화번호, 주민번호 유효성 검사
        isValidInput(name, birthDate, phoneNumber);

        Member member = memberRepository.findByNameAndBirthDateAndPhoneNumber(name, birthDate, phoneNumber)
                .orElseThrow(() -> new CaException(ErrorCode.CA_MEMBER_NOT_FOUND));

        // NULL 체크
        String userCI = member.getConnectionInformation();
        if (userCI == null) {
            throw new CaException(ErrorCode.CA_CI_NOT_EXIST);
        }
        return GetCIResponseDto.of(userCI);
    }

    // 전자서명 요청(생성)
    public SignResponseDto signRequest(SignRequestDto requestDto) throws Exception {

        // Json 데이터 받기
        List<Map<String, String>> consentInfoList = CaUtil.convertJsonToList(requestDto.getConsentInfo());

        // 사용자 조회
        String requestCI = requestDto.getConnectionInformation();
        Member member = memberRepository.findByConnectionInformation(requestCI)
                .orElseThrow(() -> new CaException(ErrorCode.CA_MEMBER_NOT_FOUND));

        String memberCI = member.getConnectionInformation();

        // null 체크, ci 검증
        if (memberCI == null || !memberCI.equals(requestCI)) {
            throw new CaException(ErrorCode.CA_CI_INVALID);
        }

        // 전자서명 생성
        List<Map<String, String>> signedDataList = new ArrayList<>();
        for (Map<String, String> consentInfo : consentInfoList) {

            // 기관 체크
            Organization organization = organizationRepository.findByOrgCode(consentInfo.get("orgCode"))
                    .orElseThrow(() -> new CaException(ErrorCode.CA_ORGANIZATION_NOT_FOUND));

            // 원본데이터에 유저정보 추가
            consentInfo.put("memberName", member.getName());
            consentInfo.put("memberPhoneNumber", member.getPhoneNumber());
            consentInfo.put("memberCI", memberCI);

            // 원본 데이터 문자열로 변환
            String signData = CaUtil.convertToJson(consentInfo);
            // 전자서명 생성
            byte[] signature = DigitalSignature.signData(signData.getBytes());
            // 전자서명 인코딩
            String signedData = Base64.getEncoder().encodeToString(signature);

            // 기관 정보와 함께 반환
            Map<String, String> orgData = new HashMap<>();
            orgData.put("orgCode", organization.getOrgCode());
            orgData.put("orgName", organization.getOrgName());
            orgData.put("orgType", String.valueOf(organization.getOrgType()));
            orgData.put("signedData", signedData);

            signedDataList.add(orgData);
        }

        return SignResponseDto.of(signedDataList);
    }

    // 전자서명 검증
    public void signVerify(SignVerifyRequestDto requestDto) throws Exception {

        // 원본데이터
        String consentInfo = requestDto.getConsentInfo();
        byte[] consentInfoListBytes = consentInfo.getBytes();
        Map<String, String> consentInfoList = CaUtil.convertJsonToMap(consentInfo);

        // 전자서명 데이터
        String digitalSignature = requestDto.getDigitalSignature();
        byte[] digitalSignatureBytes = Base64.getDecoder().decode(digitalSignature);


        // 해당 기관 조회
        Organization organization = organizationRepository.findByOrgCode(consentInfoList.get("orgCode"))
                .orElseThrow(() -> new CaException(ErrorCode.CA_ORGANIZATION_NOT_FOUND));

        // 해당 ci 사용자 조회
        Member member = memberRepository.findByConnectionInformation(consentInfoList.get("connectionInformation"))
                .orElseThrow(() -> new CaException(ErrorCode.CA_MEMBER_NOT_FOUND));

        // 무결성 검증 + 데이터 검증
        boolean result = DigitalSignature.verifySignature(consentInfoListBytes, digitalSignatureBytes);

        // 검증 실패
        if (!result) {
            throw new CaException(ErrorCode.CA_SIGN_VERIFY_FAILED);
        }
    }

    public void isValidInput(String name, String birthDate, String phoneNumber) {
        // 이름은 한 자리 이상의 문자열인지 확인
        if (name == null || name.isEmpty()) {
            throw new CaException(ErrorCode.CA_REQUEST_INVALID);
        }

        // 생년월일은 13자리의 문자열인지 확인
        if (birthDate == null || birthDate.length() != 13) {
            throw new CaException(ErrorCode.CA_REQUEST_INVALID);
        }

        // 전화번호는 11자리의 문자열인지 확인
        if (phoneNumber == null || phoneNumber.length() != 11) {
            throw new CaException(ErrorCode.CA_REQUEST_INVALID);
        }
    }
}
