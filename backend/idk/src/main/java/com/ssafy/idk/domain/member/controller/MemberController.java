package com.ssafy.idk.domain.member.controller;

import com.ssafy.idk.domain.account.service.RSAKeyService;
import com.ssafy.idk.domain.client.service.ClientBankService;
import com.ssafy.idk.domain.client.service.ClientCaService;
import com.ssafy.idk.domain.client.service.ClientMydataService;
import com.ssafy.idk.domain.member.dto.request.*;
import com.ssafy.idk.domain.member.dto.response.SignupResponseDto;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.exception.MemberException;
import com.ssafy.idk.domain.member.repository.MemberRepository;
import com.ssafy.idk.domain.member.service.MemberService;
import com.ssafy.idk.global.error.ErrorCode;
import com.ssafy.idk.global.result.ResultCode;
import com.ssafy.idk.global.result.ResultResponse;
import com.ssafy.idk.global.util.RSAUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/member")
@Slf4j
public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final ClientBankService clientBankService;
    private final ClientCaService clientCaService;
    private final ClientMydataService clientMydataService;
    private final RSAKeyService rsaKeyService;

    @Operation(summary = "회원가입")
    @PostMapping("/signup")
    public ResponseEntity<ResultResponse> signup(@Valid @RequestBody SignupRequestDto requestDto, HttpServletResponse response) {

        // idk 회원가입
        SignupResponseDto signupResponseDto = memberService.signup(requestDto, response);

        // 종합포털 회원가입
        Member member = memberRepository.findByPhoneNumber(requestDto.getPhoneNumber())
                        .orElseThrow(() -> new MemberException(ErrorCode.MEMBER_NOT_FOUND));

        clientMydataService.signupMydata(member.getName(), member.getPhoneNumber(), requestDto.getBirthDate(), member.getConnectionInformation());

        String privateKey = rsaKeyService.findPrivateKey(member.getMemberId());
        String birthDate = RSAUtil.decode(privateKey, member.getBirthDate());

        // 타 은행 회원가입
        clientBankService.signup(member.getName(), member.getPhoneNumber(), birthDate, member.getConnectionInformation());

        return ResponseEntity.ok(ResultResponse.of(ResultCode.MEMBER_SIGNUP_SUCCESS, signupResponseDto));
    }

    @Operation(summary = "폰 본인인증 요청")
    @PostMapping("/phone")
    public ResponseEntity<ResultResponse> requestPhoneVerification(@Valid @RequestBody PhoneVerificationRequestDto requestDto) {

        memberService.verifyByPhone(requestDto);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.MEMBER_PHONE_VERIFICATION_REQUEST_SUCCESS));
    }

    @Operation(summary = "폰 인증코드 검증")
    @PostMapping("/phone/code")
    public ResponseEntity<ResultResponse> verifyPhoneVerificationCode(@Valid @RequestBody PhoneCodeVerificationRequestDto requestDto) {
        memberService.verifyCode(requestDto);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.MEMBER_PHONE_CODE_VERIFICATION_SUCCESS));
    }

    @Operation(summary = "PIN 로그인")
    @PostMapping("/login/pin")
    public ResponseEntity<ResultResponse> loginByPin(@Valid @RequestBody LoginByPinRequestDto requestDto, HttpServletResponse response) {

        return ResponseEntity.ok(ResultResponse.of(ResultCode.MEMBER_LOGIN_PIN_SUCCESS, memberService.loginByPin(requestDto, response)));
    }

    @Operation(summary = "생체 인증 로그인")
    @PostMapping("/login/bio")
    public ResponseEntity<ResultResponse> loginByBio(@Valid @RequestBody LoginByBioRequestDto requestDto, HttpServletResponse response) {

        return ResponseEntity.ok(ResultResponse.of(ResultCode.MEMBER_LOGIN_BIO_SUCCESS, memberService.loginByBio(requestDto, response)));
    }

    @Operation(summary = "토큰 재발행")
    @PostMapping("/reissue")
    public ResponseEntity<ResultResponse> reissueToken(@Valid @RequestBody ReissueTokenRequestDto requestDto, HttpServletRequest request, HttpServletResponse response) {

        Cookie[] cookies = request.getCookies();
        String refreshToken = null;

        // 쿠키에서 리프레시 토큰 찾기
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refreshToken")) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }

        return ResponseEntity.ok(ResultResponse.of(ResultCode.MEMEBER_RENEW_TOKEN_SUCCESS, memberService.reissueToken(refreshToken, requestDto.getPhoneNumber(), response)));
    }

    @Operation(summary = "자동이체 알림 설정 변경")
    @PutMapping("/push/auto-transfer")
    public ResponseEntity<ResultResponse> autoTransferPush() {
        memberService.autoTransferPush();
        return ResponseEntity.ok(ResultResponse.of(ResultCode.MEMBER_AUTO_TRANSFER_PUSH_SUCCESS));
    }

    @Operation(summary = "입출금 알림 설정 변경")
    @PutMapping("/push/transaction")
    public ResponseEntity<ResultResponse> transactionPush() {
        memberService.transactionPush();
        return ResponseEntity.ok(ResultResponse.of(ResultCode.MEMBER_TRANSACTION_PUSH_SUCCESS));
    }

    @Operation(summary = "회원 정보 조회")
    @GetMapping("/push")
    public ResponseEntity<ResultResponse> getMemberInfo() {

        return ResponseEntity.ok(ResultResponse.of(ResultCode.MEMBER_GET_INFO_SUCCESS, memberService.getMemberInfo()));
    }
}
