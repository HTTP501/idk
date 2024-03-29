package com.ssafy.idk.domain.mydata.service;

import com.ssafy.idk.domain.account.service.RSAKeyService;
import com.ssafy.idk.domain.client.dto.request.SignRequestDto;
import com.ssafy.idk.domain.client.service.ClientCaService;
import com.ssafy.idk.domain.client.service.ClientMydataService;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.entity.Signature;
import com.ssafy.idk.domain.member.repository.SignatureRepository;
import com.ssafy.idk.domain.member.service.AuthenticationService;
import com.ssafy.idk.domain.mydata.entity.Asset;
import com.ssafy.idk.domain.mydata.dto.response.MydataGetResponseDto;
import com.ssafy.idk.domain.mydata.dto.response.MydataGetResponseDto.MydataAssetDto;
import com.ssafy.idk.domain.mydata.entity.Mydata;
import com.ssafy.idk.domain.mydata.entity.Organization;
import com.ssafy.idk.domain.mydata.exception.MydataException;
import com.ssafy.idk.domain.mydata.repository.MydataRepository;
import com.ssafy.idk.domain.mydata.repository.OrganizationRepository;
import com.ssafy.idk.domain.mydata.util.MydataUtil;
import com.ssafy.idk.global.error.ErrorCode;
import com.ssafy.idk.global.util.RSAUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MydataService {

    private final RestTemplate restTemplate;
    private final AuthenticationService authenticationService;
    private final OrganizationRepository organizationRepository;
    private final ClientCaService clientCaService;
    private final RSAKeyService rsaKeyService;
    private final MydataRepository mydataRepository;
    private final ClientMydataService clientMydataService;
    private final SignatureRepository signatureRepository;


    @Value("${spring.mydata.agree-terms}")
    private String agreement;

    // 마이데이터 약관 동의
    @Transactional
    public void agreeMydata() {

        Member member = authenticationService.getMemberByAuthentication();

        // 마이데이터 서버에 동의 요청
        clientMydataService.agreeMydata(member.getName(), member.getPhoneNumber(), member.getConnectionInformation());


        // 회원 정보 수정
        member.updateMydataAgreed();
    }

    // 마이데이터 자산 연결
    @Transactional
    public void connectMydata(List<String> orgList) {

        // 1. 전자서명 만들기

        // 유저 조회
        Member member = authenticationService.getMemberByAuthentication();

        // 주민등록번호 복호화
        String privateKey = rsaKeyService.findPrivateKey(member.getMemberId());
        String birthDate = RSAUtil.decode(privateKey, member.getBirthDate());

        // 원본데이터 리스트 만들기
        List<Map<String, String>> originalDataList = new ArrayList<>();

        // 기관 목록을 순회하며 코드와 Type 저장
        for (String orgName : orgList) {
            Organization organization = organizationRepository.findByOrgName(orgName)
                    .orElseThrow(() -> new MydataException(ErrorCode.MYDATA_ORG_NOT_FOUND));

            // 원본데이터 = 전송요구내역
            Map<String, String> originalData = new HashMap<>();
            originalData.put("orgCode", organization.getOrgCode());
            originalData.put("orgName", organization.getOrgName());
            originalData.put("orgType", String.valueOf(organization.getOrgType()));

            originalDataList.add(originalData);
        }

        // 원본데이트 리스트 json 변환
        String consentInfo = MydataUtil.convertToJson(originalDataList);

        // 전자서명 요청 Dto 생성
        SignRequestDto signRequestDto = SignRequestDto.builder()
                .connectionInformation(member.getConnectionInformation())
                .consentInfo(consentInfo)
                .build();

        // CA 서버에 전자서명 요청
        List<Map<String, String>> signedDataList = clientCaService.signRequest(signRequestDto);

        // json 변환
        String digitalSignature = MydataUtil.convertToJson(signedDataList);

        // 원본데이터 저장
        // 전자서명 저장
        Signature signature = Signature.builder()
                .consentInfo(consentInfo)
                .digitalSignature(digitalSignature)
                .member(member)
                .build();
        signatureRepository.save(signature);

        // 2. idk -> mydata
        // 통합인증 요청
         clientMydataService.certify(member.getConnectionInformation(), consentInfo, digitalSignature);
    }
}
