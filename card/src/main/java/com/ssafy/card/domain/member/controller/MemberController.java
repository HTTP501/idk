package com.ssafy.card.domain.member.controller;


import com.ssafy.card.domain.member.dto.request.MemberSignupRequestDto;
import com.ssafy.card.domain.member.service.MemberService;
import com.ssafy.card.global.result.ResultCode;
import com.ssafy.card.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/card/member")
@Slf4j
public class MemberController {

    private final MemberService memberService;

    @Operation(summary = "카드사 회원가입 (IDK 회원가입 시 자동 호출)")
    @PostMapping("/signup")
    public ResponseEntity<ResultResponse> signup(@RequestBody MemberSignupRequestDto requestDto) {
        memberService.signup(requestDto);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.MEMBER_SIGNUP_SUCCESS));
    }

}
