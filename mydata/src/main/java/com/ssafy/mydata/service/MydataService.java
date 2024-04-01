package com.ssafy.mydata.service;

import com.ssafy.mydata.dto.request.AgreeRequestDto;
import com.ssafy.mydata.dto.request.SignupRequestDto;
import com.ssafy.mydata.dto.request.VerifyAuthRequestDto;
import com.ssafy.mydata.entity.Member;
import com.ssafy.mydata.entity.Organization;
import com.ssafy.mydata.entity.Permission;
import com.ssafy.mydata.exception.MydataException;
import com.ssafy.mydata.global.error.ErrorCode;
import com.ssafy.mydata.repository.MemberRepository;
import com.ssafy.mydata.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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
        Member member = memberRepository.findByNameAndPhoneNumberAndConnectionInformation(requestDto.getName(), requestDto.getPhoneNumber(), requestDto.getConnectionInformation())
                .orElseThrow(() -> new MydataException(ErrorCode.MYDATA_USER_NOT_FOUND));

        // 동의 하기
        member.updateIsAgree();
    }

    // 통합인증 권한 검증 요청
    public void vertifyAuth(VerifyAuthRequestDto requestDto) {

        // 아이디로 기관 조회
        Organization organization = organizationRepository.findByClientId(requestDto.getClientId())
                .orElseThrow(() -> new MydataException(ErrorCode.MYDATA_ORG_NOT_FOUND));

        // 코드와 비밀번호 같은지 체크
        if (!organization.getOrgCode().equals(requestDto.getOrgCode()) ||
                !organization.getClientSecret().equals(requestDto.getClientSecret())) {
            throw new MydataException(ErrorCode.MYDATA_ORG_INVALID);
        }

        // 권한이 있는 지 체크
        String authorityStr = requestDto.getAuthority();
        try {
            Permission authority = Permission.valueOf(authorityStr);
            System.out.println("authority = " + authority);
            System.out.println("organization = " + organization.getPermissions());


            if (!organization.getPermissions().contains(authority)) {
                throw new MydataException(ErrorCode.MYDATA_ORG_NO_AUTHORITY);
            }
        } catch (IllegalArgumentException e) {
            // enum으로 변환할 수 없는 값이 전달된 경우
            throw new MydataException(ErrorCode.MYDATA_INVALID_AUTHORITY);
        }
    }

    @Transactional
    public void signup(SignupRequestDto requestDto) {
        
        // 중복 회원 체크
        Optional<Member> isExist = memberRepository.findByConnectionInformation(requestDto.getConnectionInformation());
        if (isExist.isPresent()) {
            throw new MydataException(ErrorCode.MYDATA_USER_DUPLICATED);
        }

        // 없으면 회원 저장
        Member member = Member.builder()
                .name(requestDto.getName())
                .phoneNumber(requestDto.getPhoneNumber())
                .birthDate(requestDto.getBirthDate())
                .connectionInformation(requestDto.getConnectionInformation())
                .build();

        memberRepository.save(member);
    }
}
