package com.ssafy.idk.domain.member.service;

import com.ssafy.idk.domain.account.service.RSAKeyService;
import com.ssafy.idk.domain.member.domain.Member;
import com.ssafy.idk.domain.member.dto.request.*;
import com.ssafy.idk.domain.member.dto.response.*;
import com.ssafy.idk.domain.member.exception.MemberException;
import com.ssafy.idk.domain.member.jwt.JwtTokenProvider;
import com.ssafy.idk.domain.member.repository.MemberRepository;
import com.ssafy.idk.global.error.ErrorCode;
import com.ssafy.idk.global.util.RSAUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final SMSService smsService;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final RedisService redisService;
    private final TokenService tokenService;
    private final AuthenticationService authenticationService;
    private final RSAKeyService rsaKeyService;

    // 회원가입
    public SignupResponseDto signup(SignupRequestDto requestDto, HttpServletResponse response) {

        // RSAKey 생성
        HashMap<String, String> keyPair = RSAUtil.generateKeyPair();
        String publicKey = keyPair.get("publicKey");
        String privateKey = keyPair.get("privateKey");

        Member member = Member.builder()
                .name(requestDto.getName())
                .birthDate(RSAUtil.encode(publicKey, requestDto.getBirthDate()))
                .pin(bCryptPasswordEncoder.encode(requestDto.getPin()))
                .phoneNumber(requestDto.getPhoneNumber())
                .hasBiometric(requestDto.getHasBiometric())
                .transactionPushEnabled(false)
                .autoTransferPushEnabled(false)
                .build();

        // 중복 회원 검증
        Optional<Member> existingMember = memberRepository.findByPhoneNumber(member.getPhoneNumber());
        if (existingMember.isPresent()) {
            throw new MemberException(ErrorCode.MEMBER_PHONE_ALREADY_VERIFIED);
        }

        Member savedMember = memberRepository.save(member);
        rsaKeyService.saveRSAKey(savedMember.getMemberId(), privateKey);

        String accessToken = tokenService.issueToken(response, member);

        return SignupResponseDto.of(accessToken);
    }

    // PIN 로그인
    public LoginByPinResponseDto loginByPin(LoginByPinRequestDto requestDto, HttpServletResponse response) {

        // 회원 조회
        Member member = memberRepository.findByPhoneNumber(requestDto.getPhoneNumber())
                .orElseThrow(() -> new MemberException(ErrorCode.MEMBER_NOT_FOUND));

        // pin 검증
        if (!bCryptPasswordEncoder.matches(requestDto.getPin(), member.getPin())) {
            throw new MemberException(ErrorCode.MEMBER_INVALID_PIN);
        }

        String accessToken = tokenService.issueToken(response, member);

        return LoginByPinResponseDto.of(accessToken);
    }

    // 생체 인증 로그인
    public LoginByBioResponseDto loginByBio(LoginByBioRequestDto requestDto, HttpServletResponse response) {

        // 회원 조회
        Member member = memberRepository.findByPhoneNumber(requestDto.getPhoneNumber())
                .orElseThrow(() -> new MemberException(ErrorCode.MEMBER_NOT_FOUND));

        String accessToken = tokenService.issueToken(response, member);

        return LoginByBioResponseDto.of(accessToken);
    }

    // 폰 본인인증 요청
    public void verifyByPhone(PhoneVerificationRequestDto requestDto) {

        String phoneNumber = requestDto.getPhoneNumber();
        String verificationCode = generateVerificationCode();

        redisService.saveVerificationCodeToRedis(phoneNumber, verificationCode);

        // 문자 전송
        try {
            smsService.sendSMS(phoneNumber, "[IDK] 본인인증 코드: " + verificationCode);
        } catch (Exception e) {
            throw new MemberException(ErrorCode.MEMBER_SMS_SEND_FAILED);
        }
    }

    // 인증 코드 생성
    private String generateVerificationCode() {
        // 6자리 랜덤 숫자 생성
        SecureRandom random = new SecureRandom();
        int code = random.nextInt(900000) + 100000; // 100000 ~ 999999
        return String.valueOf(code);
    }

    // 폰 인증코드 검증
    public void verifyCode(PhoneCodeVerificationRequestDto requestDto) {

        String phoneNumber = requestDto.getPhoneNumber();
        String inputVerificationCode = requestDto.getVerificationCode();

        // Redis에서 해당 phoneNumber에 대한 저장된 본인인증 코드 가져오기
        String storedVerificationCode = redisService.getVerificationCodeFromRedis(phoneNumber);

        // Redis에 저장된 코드가 없거나 입력된 코드와 일치하지 않으면 예외 발생
        if (storedVerificationCode == null || !storedVerificationCode.equals(inputVerificationCode)) {
            throw new MemberException(ErrorCode.MEMBER_SMS_INVALID_CODE);
        } else {
            redisService.deleteVerificationCode(phoneNumber);

            // 중복 회원 체크
            Optional<Member> member = memberRepository.findByPhoneNumber(phoneNumber);
            if (member.isPresent()) {
                throw new MemberException(ErrorCode.MEMBER_PHONE_ALREADY_VERIFIED);
            }
        }
    }

    // 토큰 재발급
    public ReissueTokenResponseDto reissueToken(String refreshToken, String phoneNumber, HttpServletResponse response) {

        // 리프레시 토큰이 없는 경우
        if (refreshToken == null) {
            throw new MemberException(ErrorCode.MEMBER_UNAUTHORIZED);
        }

        // 리프레시 토큰 검증
        if (jwtTokenProvider.isExpired(refreshToken)) {
            throw new MemberException(ErrorCode.MEMBER_TOKEN_EXPIRED);
        }

        // 리프래시 토큰이 맞는지 체크
        String category = jwtTokenProvider.getCategory(refreshToken);
        if (!category.equals("refresh")) {
            throw new MemberException(ErrorCode.MEMBER_TOKEN_INVALID);
        }

        // 휴대폰 번호 체크
        String storedPhoneNumber = jwtTokenProvider.getPhoneNumber(refreshToken);
        if (!storedPhoneNumber.equals(phoneNumber)) {
            throw new MemberException(ErrorCode.MEMBER_NOT_FOUND);
        }

        Member member = authenticationService.getMemberByAuthentication();
        String accessToken = tokenService.issueToken(response, member);

        return ReissueTokenResponseDto.of(accessToken);
    }

    // 자동이체 알림 설정 변경
    @Transactional
    public void autoTransferPush() {
        Member member = authenticationService.getMemberByAuthentication();
        member.updateAutoTransferPushEnabled();
    }

    // 입출금 알림 설정 변경
    @Transactional
    public void transactionPush() {
        Member member = authenticationService.getMemberByAuthentication();
        member.updateTransactionPushEnabled();
    }

    // 회원 정보 조회
    public MemberInfoResponseDto getMemberInfo() {
        Member member = authenticationService.getMemberByAuthentication();
        return MemberInfoResponseDto.of(member.getTransactionPushEnabled(), member.getAutoTransferPushEnabled());
    }


}
