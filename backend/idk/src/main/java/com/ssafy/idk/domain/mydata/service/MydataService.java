package com.ssafy.idk.domain.mydata.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.idk.domain.account.service.RSAKeyService;
import com.ssafy.idk.domain.client.dto.request.AgreeRequestToMydataDto;
import com.ssafy.idk.domain.client.dto.request.SignRequestDto;
import com.ssafy.idk.domain.client.dto.request.SignRequestDto.ConsentInfoDto;
import com.ssafy.idk.domain.client.service.ClientCaService;
import com.ssafy.idk.domain.client.service.ClientMydataService;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.service.AuthenticationService;
import com.ssafy.idk.domain.mydata.entity.Asset;
import com.ssafy.idk.domain.mydata.dto.response.MydataGetResponseDto;
import com.ssafy.idk.domain.mydata.dto.response.MydataGetResponseDto.MydataAssetDto;
import com.ssafy.idk.domain.mydata.entity.Mydata;
import com.ssafy.idk.domain.mydata.entity.Organization;
import com.ssafy.idk.domain.mydata.exception.MydataException;
import com.ssafy.idk.domain.mydata.repository.MydataRepository;
import com.ssafy.idk.domain.mydata.repository.OrganizationRepository;
import com.ssafy.idk.global.error.ErrorCode;
import com.ssafy.idk.global.util.RSAUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;

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


    @org.springframework.beans.factory.annotation.Value("${spring.mydata.agree-terms}")
    private String agreement;


    // 마이데이터 약관 동의
    @Transactional
    public void agreeMydata(String name, String connectionInformation) {

        // 마이데이터 서버에 동의 요청
//        clientMydataService.agreeMydata(name, connectionInformation);

        Member member = authenticationService.getMemberByAuthentication();

        // 회원 정보 수정
        member.updateMydataAgreed();
    }

    // 마이데이터 자산 연결
    @Transactional
    public void connectMydata(List<String> orgList) {

        // 1. 전자서명 만들기
        // 해당 유저의 동의
        System.out.println("agreement = " + agreement);

        // 유저 조회
        Member member = authenticationService.getMemberByAuthentication();

        // 기관 목록을 순회하며 코드와 Type 저장
        List<ConsentInfoDto> consentInfoList = new ArrayList<>();
        for (String orgName : orgList) {
            System.out.println("orgName = " + orgName);
            Organization organization = organizationRepository.findByOrgName(orgName)
                    .orElseThrow(() -> new MydataException(ErrorCode.MYDATA_ORG_NOT_FOUND));

            ConsentInfoDto consentInfoDto = new ConsentInfoDto();
            consentInfoDto.setOrgCode(organization.getOrgCode());
            consentInfoDto.setOrgType(String.valueOf(organization.getOrgType()));

            consentInfoList.add(consentInfoDto);
        }

        // 주민등록번호 복호화
        String privateKey = rsaKeyService.findPrivateKey(member.getMemberId());
        String birthDate = RSAUtil.decode(privateKey, member.getBirthDate());

        // 전자서명 요청 Dto 생성
        SignRequestDto signRequestDto = SignRequestDto.builder()
                .agreement(agreement)
                .name(member.getName())
                .birthDate(birthDate)
                .phoneNumber(member.getPhoneNumber())
                .connectionInformation(member.getConnectionInformation())
                .consentInfoList(consentInfoList)
                .build();

        // signedDate 얻기
        List<Map<String, String>> signedDataList = clientCaService.signRequest(signRequestDto);

        // JSON 변환
        ObjectMapper mapper = new ObjectMapper();
        String json = null;
        try {
            json = mapper.writeValueAsString(signedDataList);
        } catch (Exception e) {
            throw new MydataException(ErrorCode.MYDATA_SIGN_TRANSFORM_FAILED);
        }

        // Base64 인코딩
        String digitalSignature = Base64.getEncoder().encodeToString(json.getBytes());

        // 전자서명 저장
        member.updateDigitalSignature(digitalSignature);

        // 2. idk -> mydata -> bank or card 로 전자서명 보내기(접근 토큰 발급을 위함)
        // 통합인증 요청
//        clientMydataService.certify();
    }

    // 마이데이터 연결 자산 정보 조회
    public MydataGetResponseDto getMydata() {

        // 유저 조회
        Member member = authenticationService.getMemberByAuthentication();

        // idk -> mydata
        clientMydataService.getData();

        // mydata 연결 자산 조회
        List<Mydata> mydataList = member.getMydataList();
        List<MydataAssetDto> assetInfo = new ArrayList<>();
        for (Mydata mydata : mydataList) {

            Organization organization = mydata.getOrganization();
            String orgName = organization.getOrgName();
            List<Asset> assetList = mydata.getAssetList();

            MydataAssetDto assetDto = MydataAssetDto.builder()
                                            .orgName(orgName)
                                            .assetList(assetList)
                                            .build();
            assetInfo.add(assetDto);
        }
        return MydataGetResponseDto.of(assetInfo);
    }
}
