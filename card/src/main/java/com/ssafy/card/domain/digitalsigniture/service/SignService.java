package com.ssafy.card.domain.digitalsigniture.service;

import com.ssafy.card.domain.client.service.ClientService;
import com.ssafy.card.domain.digitalsigniture.dto.request.AuthenticationRequestDto;
import com.ssafy.card.domain.digitalsigniture.dto.response.AuthenticationResponseDto;
import com.ssafy.card.domain.digitalsigniture.jwt.JwtTokenProvider;
import com.ssafy.card.domain.member.entity.Member;
import com.ssafy.card.domain.member.repository.MemberRepository;
import com.ssafy.card.domain.organization.entity.Organization;
import com.ssafy.card.domain.organization.repository.OrganizationRepository;
import com.ssafy.card.global.error.CardServerException;
import com.ssafy.card.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SignService {

    private final MemberRepository memberRepository;
    private final OrganizationRepository organizationRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final ClientService clientService;

    // 통합 인증 요청
    @Transactional
    public AuthenticationResponseDto authentication(AuthenticationRequestDto requestDto) {

        // ci 일치하는 고객 있는지 체크
        Member member = memberRepository.findByConnectionInformation(requestDto.getConnectionInformation())
                .orElseThrow(() -> new CardServerException(ErrorCode.MEMBER_NOT_FOUND));

        // 기관 체크
        Organization organization = organizationRepository.findByOrgCode(requestDto.getReceiverOrgCode())
                .orElseThrow(() -> new CardServerException(ErrorCode.ORGANIZATION_NOT_FOUND));

        // MYDATA(종합포털)에 마이데이터 사업자 권한 검증 요청
        if (!clientService.verifyAuthority(requestDto.getClientId(), requestDto.getClientSecret(), requestDto.getReceiverOrgCode())) {
            throw new CardServerException(ErrorCode.MYDATA_AUTH_INVALID);
        }

        Map<String, String> consentInfo = new HashMap<>();
        consentInfo.put("orgCode", organization.getOrgCode());
        consentInfo.put("orgName", organization.getOrgName());
        consentInfo.put("orgType", organization.getOrgType().name());

        // CA(인증기관) 서버에 전자서명 검증 요청
        if (!clientService.verifySignature(member.getName(), member.getPhoneNumber(), member.getConnectionInformation(), requestDto.getConsent(), requestDto.getSignedConsent())) {
            throw new CardServerException(ErrorCode.MYDATA_SIGN_INVALID);
        }

        // 검증 완료 되면 토큰 발급
        String accessToken = jwtTokenProvider.createToken(requestDto.getReceiverOrgCode(), requestDto.getConnectionInformation(), requestDto.getProviderOrgCode());

        // 토큰 저장
        Organization organization1 = organizationRepository.findByOrgCode(requestDto.getProviderOrgCode())
                .orElseThrow(() -> new CardServerException(ErrorCode.ORGANIZATION_NOT_FOUND));

        organization1.updateAccessToken(accessToken);

        return AuthenticationResponseDto.of(accessToken);
    }
}
