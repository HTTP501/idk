package com.ssafy.mydata.service;

import com.ssafy.mydata.dto.request.AgreeRequestDto;
import com.ssafy.mydata.dto.request.CertifyRequestDto;
import com.ssafy.mydata.dto.response.CertifyResponseDto;
import com.ssafy.mydata.dto.response.CertifyResponseDto.CertifyResult;
import com.ssafy.mydata.entity.Member;
import com.ssafy.mydata.entity.Organization;
import com.ssafy.mydata.exception.MydataException;
import com.ssafy.mydata.global.error.ErrorCode;
import com.ssafy.mydata.repository.MemberRepository;
import com.ssafy.mydata.repository.OrganizationRepository;
import com.ssafy.mydata.util.MydataUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MydataService {

    private final MemberRepository memberRepository;
    private final OrganizationRepository organizationRepository;
    private final ClientProviderService clientProviderService;

    // 마이데이터 이용 동의
    @Transactional
    public void agree(AgreeRequestDto requestDto) {

        // 사용자 체크
        System.out.println("requestDto.getName() = " + requestDto.getName());
        System.out.println("requestDto.getPhoneNumber() = " + requestDto.getPhoneNumber());
        System.out.println("requestDto.getConnectionInformation() = " + requestDto.getConnectionInformation());
        Member member = memberRepository.findByNameAndPhoneNumberAndConnectionInformation(requestDto.getName(), requestDto.getPhoneNumber(), requestDto.getConnectionInformation())
                .orElseThrow(() -> new MydataException(ErrorCode.MYDATA_USER_NOT_FOUND));

        // 동의 하기
        member.updateIsAgree();
    }

    // 통합인증 요청
    public CertifyResponseDto certify(CertifyRequestDto requestDto) {

        // 1. 사용자 마이데이터 동의 여부 체크
        Member member = memberRepository.findByConnectionInformation(requestDto.getConnectionInformation())
                .orElseThrow(() -> new MydataException(ErrorCode.MYDATA_USER_NOT_FOUND));

        if (!member.getIsAgree()) {
            throw new MydataException(ErrorCode.MYDATA_USER_DISAGREE);
        }

        // 2. 서비스 등록 여부 체크
        Organization organization = organizationRepository.findByClientId(requestDto.getClientId())
                .orElseThrow(() -> new MydataException(ErrorCode.MYDATA_ORG_NOT_FOUND));

        if (!organization.getClientSecret().equals(requestDto.getClientSecret())) {
            throw new MydataException(ErrorCode.MYDATA_SECRET_INVALID);
        }

        // 3. 마이데이터 사업자 권한 체크

        // 전송요구 내역, 서명 내역 순서대로 각 정보제공자 API 호출
        // ci, consentInfo, digitalSignature


        // 전송내역 역직렬화
        String consentInfo = requestDto.getConsentInfo();
        List<Map<String, String>> consentInfoList = MydataUtil.convertJsonToList(consentInfo);

        // 전자서명 역직렬화
        String digitalSignature = requestDto.getDigitalSignature();
        List<Map<String, String>> signatureInfoList = MydataUtil.convertJsonToList(digitalSignature);

        // 기관과 토큰 정보를 함께 담아서 리스트에 저장
        List<CertifyResult> resultList = new ArrayList<>();

        for (Map<String, String> consent : consentInfoList) {

            String orgCode = consent.get("orgCode");
            String orgType = consent.get("orgType");

            String token;
            if (orgType.equals("BANK")) {
                // Bank API 호출
                token = clientProviderService.certifyToBank(orgCode, consent, signatureInfoList);
            } else {
                // Card API 호출
                token = clientProviderService.certifyToCard(orgCode, consent, signatureInfoList);
            }

            CertifyResult result = CertifyResult.builder()
                    .orgCode(orgCode)
                    .token(token)
                    .build();

            resultList.add(result);
        }
        return CertifyResponseDto.of(resultList);
    }
}
