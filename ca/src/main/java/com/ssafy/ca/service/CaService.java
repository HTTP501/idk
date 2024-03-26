package com.ssafy.ca.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.ca.domain.Member;
import com.ssafy.ca.domain.Organization;
import com.ssafy.ca.domain.OrganizationMember;
import com.ssafy.ca.domain.SignData;
import com.ssafy.ca.dto.*;
import com.ssafy.ca.dto.SignRequestDto.ConsentInfoDto;
import com.ssafy.ca.exception.CaException;
import com.ssafy.ca.global.error.ErrorCode;
import com.ssafy.ca.repository.MemberRepository;
import com.ssafy.ca.repository.OrganizationMemberRepositoy;
import com.ssafy.ca.repository.OrganizationRepository;
import com.ssafy.ca.util.CICreator;
import com.ssafy.ca.util.DigitalSignature;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CaService {

    private final MemberRepository memberRepository;
    private final OrganizationRepository organizationRepository;
    private final OrganizationMemberRepositoy organizationMemberRepositoy;

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

        // 유효성 검증
        isValidInput(requestDto.getName(), requestDto.getBirthDate(), requestDto.getPhoneNumber());

        // 사용자 조회
        Member member = memberRepository.findByNameAndBirthDateAndPhoneNumber(requestDto.getName(), requestDto.getBirthDate(), requestDto.getPhoneNumber())
                .orElseThrow(() -> new CaException(ErrorCode.CA_MEMBER_NOT_FOUND));

        String memberCI = member.getConnectionInformation();
        String requestCI = requestDto.getConnectionInformation();

        // null 체크, ci 검증
        if (memberCI == null || !memberCI.equals(requestCI)) {
            throw new CaException(ErrorCode.CA_CI_INVALID);
        }

        // 전송 요청 내용 목록
        String agreement = requestDto.getAgreement();
        List<ConsentInfoDto> consentInfoList = requestDto.getConsentInfoList();

        // 전자서명 데이터 준비 (요청 데이터를 바탕으로 생성)
        List<Map<String, String>> signedDataList = prepareSignData(member, agreement, consentInfoList);

        return SignResponseDto.of(signedDataList);
    }

    // 데이터 전처리 및 전자서명 생성
    @Transactional
    private List<Map<String, String>> prepareSignData(Member member, String agreement, List<ConsentInfoDto> consentInfoList) throws Exception {

        // (전송 요청 대상 + 서명) 목록
        List<Map<String, String>> orgDataList = new ArrayList<>();

        // 전자서명 묶음 생성
        for (ConsentInfoDto consentInfoDto : consentInfoList) {

            // db 저장용 서명 데이터
            Map<String, String> signDataMap = new HashMap<>();

            // 응답 데이터용
            Map<String, String> orgData = new HashMap<>();

            signDataMap.put("agreement", agreement);
            signDataMap.put("name", member.getName());
            signDataMap.put("birthDate", member.getBirthDate());
            signDataMap.put("phoneNumber", member.getPhoneNumber());
            signDataMap.put("connectionInformation", member.getConnectionInformation());

            signDataMap.put("orgCode", consentInfoDto.getOrgCode());
            signDataMap.put("orgType", consentInfoDto.getType());

            // 기관 정보를 Map 형태로 저장
            orgData.put("orgCode", consentInfoDto.getOrgCode());
            orgData.put("orgType", consentInfoDto.getType());

            // 기관 조회
            Organization organization = organizationRepository.findByOrgCode(consentInfoDto.getOrgCode())
                    .orElseThrow(() -> new CaException(ErrorCode.CA_ORGANIZATION_NOT_FOUND));

            // 서명 데이터 문자열로 변환
            String signData = signDataMap.toString();

            // 중개테이블에 저장
            OrganizationMember organizationMember = OrganizationMember.builder()
                    .member(member)
                    .organization(organization)
                    .signData(signData)
                    .build();
            organizationMemberRepositoy.save(organizationMember);

            // 전자서명 생성, Base64 인코딩
            byte[] signedDataByte = DigitalSignature.signData(signData.getBytes());
            String encodedSignedData = Base64.getEncoder().encodeToString(signedDataByte);

            orgData.put("signedData", encodedSignedData);
            orgDataList.add(orgData);
        }

        return orgDataList;
    }

    // 전자서명 검증
    public SignVerifyResponseDto signVerify(SignVerifyRequestDto requestDto) throws Exception {

        // 요청으로부터 기관 코드(orgCode), 사용자 정보(ci), 전자서명(signedData)를 추출합니다.
        String orgCode = requestDto.getOrgCode();
        String ci = requestDto.getConnectionInformation();
        String digitalSignature = requestDto.getDigitalSignature();

        // 해당 기관 조회
        Organization organization = organizationRepository.findByOrgCode(orgCode)
                .orElseThrow(() -> new CaException(ErrorCode.CA_ORGANIZATION_NOT_FOUND));

        // 해당 ci 사용자 조회
        Member member = memberRepository.findByConnectionInformation(ci)
                .orElseThrow(() -> new CaException(ErrorCode.CA_MEMBER_NOT_FOUND));

        OrganizationMember organizationMember = organizationMemberRepositoy.findByMemberAndOrganization(member, organization)
                .orElseThrow(() -> new CaException(ErrorCode.CA_SIGNATURE_NOT_FOUND));

        // 원본 데이터
        String signData = organizationMember.getSignData();

        // 원본 데이터 바이트로 전환
        byte[] originalData = signData.getBytes();

        // 전자서명 데이터 디코딩
        byte[] signedData = Base64.getDecoder().decode(digitalSignature);

        // 무결성 검증 + 데이터 검증
        boolean result = DigitalSignature.verifySignature(originalData, signedData);

        return SignVerifyResponseDto.of(result);
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
