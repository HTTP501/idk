package com.ssafy.idk.domain.mydata.controller;

import com.ssafy.idk.domain.client.dto.response.AutoTransferInfoDto;
import com.ssafy.idk.domain.client.dto.response.AutoTransferInfoListResponseDto;
import com.ssafy.idk.domain.client.service.ClientBankService;
import com.ssafy.idk.domain.client.service.ClientCaService;
import com.ssafy.idk.domain.client.service.ClientCardService;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.entity.Signature;
import com.ssafy.idk.domain.member.repository.SignatureRepository;
import com.ssafy.idk.domain.member.service.AuthenticationService;
import com.ssafy.idk.domain.mydata.dto.request.MydataConnectRequestDto;
import com.ssafy.idk.domain.mydata.dto.response.MydataGetResponseDto;
import com.ssafy.idk.domain.mydata.entity.Organization;
import com.ssafy.idk.domain.mydata.entity.OrganizationType;
import com.ssafy.idk.domain.mydata.exception.MydataException;
import com.ssafy.idk.domain.mydata.repository.MydataRepository;
import com.ssafy.idk.domain.mydata.repository.OrganizationRepository;
import com.ssafy.idk.domain.mydata.service.MydataService;
import com.ssafy.idk.domain.mydata.util.MydataUtil;
import com.ssafy.idk.global.error.ErrorCode;
import com.ssafy.idk.global.result.ResultCode;
import com.ssafy.idk.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/idk/mydata")
@Slf4j
public class MydataController {

    @Value("${spring.idk.org-code}")
    private String idkOrgCode;

    @Value("${spring.idk.client-id}")
    private String clientId;
    @Value("${spring.idk.client-secret}")
    private String clientSecret;



    private final MydataService mydataService;
    private final AuthenticationService authenticationService;
    private final OrganizationRepository organizationRepository;
    private final SignatureRepository signatureRepository;
    private final ClientCaService clientCaService;
    private final ClientBankService clientBankService;
    private final ClientCardService clientCardService;
    private final MydataRepository mydataRepository;

    @Operation(summary = "마이데이터 동의")
    @PostMapping("/agree")
    public ResponseEntity<ResultResponse> agreeMydata() {

        mydataService.agreeMydata();
        return ResponseEntity.ok(ResultResponse.of(ResultCode.IDK_MYDATA_AGREE_SUCCESS));
    }

    @Operation(summary = "마이데이터 자산 연결")
    @PostMapping("/connect")
    public ResponseEntity<ResultResponse> connectMydata(@Valid @RequestBody MydataConnectRequestDto requestDto) {

        Member member = authenticationService.getMemberByAuthentication();

        List<String> orgList = requestDto.getOrgList();

        // 전송요구 목록 생성
        List<Map<String, String>> consentList = mydataService.createConsentList(member, orgList);

        // 전자서명 요청
        List<Map<String, String>> signedInfoList = clientCaService.signRequest(member.getConnectionInformation(), consentList);

        // 서명 원본, 전자서명 저장
        mydataService.saveSignature(member, consentList, signedInfoList);

        // 각 정보제공자에게 통합인증 요청
        for (int i = 0; i < signedInfoList.size(); i++) {
            Map<String, String> consent = consentList.get(i);
            Map<String, String> signedInfo = signedInfoList.get(i);

            String orgType = signedInfo.get("orgType");
            String orgCode = signedInfo.get("orgCode");
            String signedConsent = signedInfo.get("signedConsent");
            String accessToken = null;
            if (orgType.equals(OrganizationType.BANK.name())) {
                accessToken = clientBankService.certifyToBank(member.getConnectionInformation(), idkOrgCode, orgCode, clientId, clientSecret, consent, signedConsent);
            } else if (orgType.equals(OrganizationType.CARD.name())) {
//                accessToken = clientCardService.certifyToCard();
            }

            // 토큰 저장
            Organization organization = organizationRepository.findByOrgCode(orgCode)
                    .orElseThrow(() -> new MydataException(ErrorCode.MYDATA_ORG_NOT_FOUND));
            mydataService.saveMydata(member, organization, accessToken);
        }

        return ResponseEntity.ok(ResultResponse.of(ResultCode.IDK_MYDATA_CONNECT_SUCCESS));
    }

    @Operation(summary = "마이데이터 조회")
    @GetMapping("")
    public ResponseEntity<ResultResponse> getMydata() {

        // 고객이 연결한 모든 기관에 정보제공 요청
        Member member = authenticationService.getMemberByAuthentication();

        // 멤버가 가지고 있는 모든 서명 목록 조회
        List<Signature> signatureList = signatureRepository.findByMember(member);

        // 서명 목록 순회하면서 기관 코드 추출하고 정보 제공 요청 보내기
        List<AutoTransferInfoDto> autoTransferInfoDtoList = new ArrayList<>();

        List<AutoTransferInfoDto> autoTransferInfoDtos = new ArrayList<>();
        // 은행은 자동이체 목록
        autoTransferInfoDtos = clientBankService.getAutoTransferInfo(member.getName(), member.getConnectionInformation());
        autoTransferInfoDtoList.addAll(autoTransferInfoDtos);
        // 카드사는 청구계좌
        autoTransferInfoDtos = clientCardService.getAutoTransferInfo(member.getName(), member.getConnectionInformation());
        autoTransferInfoDtoList.addAll(autoTransferInfoDtos);

        // 저장
        mydataService.saveAssetList(member, autoTransferInfoDtoList);

        // 응답데이터 만들기

        MydataGetResponseDto mydataGetResponseDto = mydataService.getAssetListInfo(member, autoTransferInfoDtoList);

        return ResponseEntity.ok(ResultResponse.of(ResultCode.IDK_MYDATA_GET_SUCCESS, AutoTransferInfoListResponseDto.of(autoTransferInfoDtoList)));
    }
}
