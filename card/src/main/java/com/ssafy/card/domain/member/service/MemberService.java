package com.ssafy.card.domain.member.service;


import com.ssafy.card.domain.member.dto.request.MemberSignupRequestDto;
import com.ssafy.card.domain.member.entity.Member;
import com.ssafy.card.domain.member.repository.MemberRepository;
import com.ssafy.card.global.error.CardServerException;
import com.ssafy.card.global.error.ErrorCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public void signup(MemberSignupRequestDto requestDto) {

        // 이미 존재하는 주민번호일 때
        if (memberRepository.findByBirthDate(requestDto.getBirthDate()).isPresent())
            throw new CardServerException(ErrorCode.MEMBER_BIRTH_DATE_EXISTS);
        
        // 이미 존재하는 전화번호일 때
        if (memberRepository.findByPhoneNumber(requestDto.getPhoneNumber()).isPresent())
            throw new CardServerException(ErrorCode.MEMBER_PHONE_NUMBER_EXISTS);
        
        // 이미 존재하는 CI일 때
        if (memberRepository.findByConnectionInformation(requestDto.getConnectionInformation()).isPresent())
            throw new CardServerException(ErrorCode.MEMBER_CI_EXISTS);

        // 회원정보 저장
        Member member = Member.builder()
                .name(requestDto.getName())
                .birthDate(requestDto.getBirthDate())
                .phoneNumber(requestDto.getPhoneNumber())
                .connectionInformation(requestDto.getConnectionInformation())
                .build();
        memberRepository.save(member);

    }
}
