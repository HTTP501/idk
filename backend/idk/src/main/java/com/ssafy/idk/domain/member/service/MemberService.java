package com.ssafy.idk.domain.member.service;

import com.ssafy.idk.domain.member.domain.Member;
import com.ssafy.idk.domain.member.dto.request.*;
import com.ssafy.idk.domain.member.dto.response.LoginByBioResponseDto;
import com.ssafy.idk.domain.member.dto.response.LoginByPinResponseDto;
import com.ssafy.idk.domain.member.dto.response.ReissueTokenResponseDto;
import com.ssafy.idk.domain.member.dto.response.SignupResponseDto;
import com.ssafy.idk.domain.member.exception.MemberException;
import com.ssafy.idk.domain.member.jwt.JwtTokenProvider;
import com.ssafy.idk.domain.member.repository.MemberRepository;
import com.ssafy.idk.global.error.ErrorCode;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final SMSService smsService;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final RedisService redisService;


    // 회원가입
    public SignupResponseDto signup(SignupRequestDto requestDto, HttpServletResponse response) {

        Member member = Member.builder()
                .name(requestDto.getName())
                .birth(requestDto.getBirth())
                .pin(bCryptPasswordEncoder.encode(requestDto.getPin()))
                .phoneNumber(requestDto.getPhoneNumber())
                .hasBiometric(requestDto.getHasBiometric())
                .transactionPushEnabled(requestDto.getTransactionPushEnabled())
                .autoTransferPushEnabled(requestDto.getAutoTransferPushEnabled())
                .build();

        // 중복 회원 검증
        Optional<Member> existingMember = memberRepository.findByPhoneNumber(member.getPhoneNumber());

        if (existingMember.isPresent()) {
            throw new MemberException(ErrorCode.MEMBER_PHONE_ALREADY_VERIFIED);
        }

        String accessToken = jwtTokenProvider.createToken("access", requestDto.getPhoneNumber());
        String refreshToken = jwtTokenProvider.createToken("refresh", requestDto.getPhoneNumber());

        // 리프래시 쿠키에 저장
        addRefreshTokenCookieToResponse(response, refreshToken);

        // 리프래시 토큰 저장
        redisService.saveRefreshTokenToRedis(member.getPhoneNumber(), refreshToken);

        // 토큰 조회해서 출력해보기
        System.out.println(redisService.getRefreshTokenFromRedis(member.getPhoneNumber()));

        memberRepository.save(member);
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

        // 검증 통과하면 토큰 발급
        String accessToken = jwtTokenProvider.createToken("access", requestDto.getPhoneNumber());
        String refreshToken = jwtTokenProvider.createToken("refresh", requestDto.getPhoneNumber());

        addRefreshTokenCookieToResponse(response, refreshToken);

        redisService.saveRefreshTokenToRedis(member.getPhoneNumber(), refreshToken);

        return LoginByPinResponseDto.of(accessToken);
    }

    // 생체 인증 로그인
    public LoginByBioResponseDto loginByBio(LoginByBioRequestDto requestDto, HttpServletResponse response) {

        // 회원 조회
        Member member = memberRepository.findByPhoneNumber(requestDto.getPhoneNumber())
                .orElseThrow(() -> new MemberException(ErrorCode.MEMBER_NOT_FOUND));

        // 토큰 발급
        String accessToken = jwtTokenProvider.createToken("access", requestDto.getPhoneNumber());
        String refreshToken = jwtTokenProvider.createToken("refresh", requestDto.getPhoneNumber());

        addRefreshTokenCookieToResponse(response, refreshToken);

        redisService.saveRefreshTokenToRedis(member.getPhoneNumber(), refreshToken);

        return LoginByBioResponseDto.of(accessToken);
    }

    // 폰 본인인증 요청
    public void verifyByPhone(PhoneVerificationRequestDto requestDto) {

        // 폰 번호 추출
        String phoneNumber = requestDto.getPhoneNumber();

        // 인증 코드 생성
        String verificationCode = generateVerificationCode();

        // 인증 코드 임시 저장
        redisService.saveVerificationCodeToRedis(phoneNumber, verificationCode);

        // 문자 전송
        try {
            smsService.sendSMS(phoneNumber, "[IDK] 본인인증 코드: " + verificationCode);
            return;
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

        String category = jwtTokenProvider.getCategory(refreshToken);
        if (!category.equals("refresh")) {
            throw new MemberException(ErrorCode.MEMBER_TOKEN_INVALID);
        }

        String storedPhoneNumber = jwtTokenProvider.getPhoneNumber(refreshToken);
        if (!storedPhoneNumber.equals(phoneNumber)) {
            throw new MemberException(ErrorCode.MEMBER_NOT_FOUND);
        }

        // 토큰 발급
        String accessToken = jwtTokenProvider.createToken("access", phoneNumber);
        String newRefreshToken = jwtTokenProvider.createToken("refresh", phoneNumber);

        // 리프래시 토큰은 쿠키로 보내기
        addRefreshTokenCookieToResponse(response, newRefreshToken);

        return ReissueTokenResponseDto.of(accessToken);
    }

    // 리프레시 토큰을 쿠키로 추가하는 메서드
    private void addRefreshTokenCookieToResponse(HttpServletResponse response, String refreshToken) {
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setMaxAge((int) jwtTokenProvider.calculateRemainingTime(refreshToken) / 1000);
        refreshTokenCookie.setPath("/");
        response.addCookie(refreshTokenCookie);
    }
}
