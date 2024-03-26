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
    public CreateCIResponseDto createCI(CreateCIRequestDto requestDto) {

        // connection Information 생성
        String connectionInformation = CICreator.generateCI(requestDto.getName(), requestDto.getBirthDate(), requestDto.getPhoneNumber());

        Member member = Member.builder()
                .name(requestDto.getName())
                .birthDate(requestDto.getBirthDate())
                .phoneNumber(requestDto.getPhoneNumber())
                .connectionInformation(connectionInformation)
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
    public SignResponseDto signRequest(SignRequestDto requestDto) throws Exception {

        // 사용자 조회
        Member member = memberRepository.findByNameAndBirthDateAndPhoneNumber(requestDto.getName(), requestDto.getBirthDate(), requestDto.getPhoneNumber())
                .orElseThrow(() -> new CaException(ErrorCode.CA_MEMBER_NOT_FOUND));

        // ci 검증
        if (!member.getConnectionInformation().equals(requestDto.getConnectionInformation())) {
            throw new CaException(ErrorCode.CA_CI_INVALID);
        }

        // 전자서명 데이터 준비 (요청 데이터를 바탕으로 생성)
        List<Map<String, String>> signedDataList = prepareSignData(requestDto, member);

        return SignResponseDto.of(signedDataList);
    }
    @Transactional
    private List<Map<String, String>> prepareSignData(SignRequestDto requestDto, Member member) throws Exception {

        String agreement = requestDto.getAgreement();
        String name = requestDto.getName();
        String birthDate = requestDto.getBirthDate();
        String phoneNumber = requestDto.getPhoneNumber();
        String connectionInformation = requestDto.getConnectionInformation();

        List<ConsentInfoDto> consentInfoList = requestDto.getConsentInfoList();

        // 전자서명 묶음 생성
        List<Map<String, String>> orgDataList = new ArrayList<>();
        for (ConsentInfoDto consentInfoDto : consentInfoList) {

            // 유저 정보를 Map 형태로 저장
            Map<String, String> signDataMap = new HashMap<>();
            Map<String, String> orgData = new HashMap<>();

            signDataMap.put("agreement", agreement);
            signDataMap.put("name", name);
            signDataMap.put("birthDate", birthDate);
            signDataMap.put("phoneNumber", phoneNumber);
            signDataMap.put("connectionInformation", connectionInformation);

            signDataMap.put("orgCode", consentInfoDto.getOrgCode());
            signDataMap.put("orgType", consentInfoDto.getType());

            // 기관 정보를 Map 형태로 저장
            orgData.put("orgCode", consentInfoDto.getOrgCode());
            orgData.put("orgType", consentInfoDto.getType());

            // 기관 조회
            Organization organization = organizationRepository.findByOrgCode(consentInfoDto.getOrgCode())
                    .orElseThrow(() -> new CaException(ErrorCode.CA_ORGANIZATION_NOT_FOUND));

            String signData = signDataMap.toString();

            // 중개테이블에 저장
            OrganizationMember organizationMember = OrganizationMember.builder()
                    .member(member)
                    .organization(organization)
                    .signData(signData)
                    .build();
            organizationMemberRepositoy.save(organizationMember);

            // 전자서명 생성
            byte[] signedDataByte = DigitalSignature.signData(signData.getBytes());
            String encodedSignedData = Base64.getEncoder().encodeToString(signedDataByte);

            orgData.put("signedData", encodedSignedData);

            orgDataList.add(orgData);
        }

        return orgDataList;
    }


//     전자서명 검증
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
}
