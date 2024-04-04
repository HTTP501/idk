package com.ssafy.idk.domain.mydata.service;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.account.service.RSAKeyService;
import com.ssafy.idk.domain.autotransfer.entity.AutoTransfer;
import com.ssafy.idk.domain.autotransfer.repository.AutoTransferRepository;
import com.ssafy.idk.domain.client.dto.request.SignRequestDto;
import com.ssafy.idk.domain.client.dto.response.AutoTransferInfoDto;
import com.ssafy.idk.domain.client.service.ClientCaService;
import com.ssafy.idk.domain.client.service.ClientMydataService;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.entity.Signature;
import com.ssafy.idk.domain.member.repository.SignatureRepository;
import com.ssafy.idk.domain.member.service.AuthenticationService;
import com.ssafy.idk.domain.mydata.dto.response.MydataGetResponseDto.MydataAssetDto.AssetDto;
import com.ssafy.idk.domain.mydata.dto.response.PaymentInfoDto;
import com.ssafy.idk.domain.mydata.entity.Asset;
import com.ssafy.idk.domain.mydata.dto.response.MydataGetResponseDto;
import com.ssafy.idk.domain.mydata.dto.response.MydataGetResponseDto.MydataAssetDto;
import com.ssafy.idk.domain.mydata.entity.Mydata;
import com.ssafy.idk.domain.mydata.entity.Organization;
import com.ssafy.idk.domain.mydata.exception.MydataException;
import com.ssafy.idk.domain.mydata.repository.AssetRepository;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MydataService {

    private final AuthenticationService authenticationService;
    private final OrganizationRepository organizationRepository;
    private final MydataRepository mydataRepository;
    private final ClientMydataService clientMydataService;
    private final SignatureRepository signatureRepository;
    private final AssetRepository assetRepository;
    private final AccountRepository accountRepository;
    private final AutoTransferRepository autoTransferRepository;

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

    // 전송요구목록 생성
    @Transactional
    public List<Map<String, String>> createConsentList(Member member, List<String> orgList) {

        // 전송요구내역(name, phoneNumber, connectionInformation, orgCode, orgName, orgType) 리스트 만들기
        List<Map<String, String>> consentList = new ArrayList<>();
        for (String orgName : orgList) {
            System.out.println("orgName = " + orgName);
            Organization organization = organizationRepository.findByOrgName(orgName)
                    .orElseThrow(() -> new MydataException(ErrorCode.MYDATA_ORG_NOT_FOUND));
            Map<String, String> consent = new HashMap<>();
            consent.put("name", member.getName());
            consent.put("phoneNumber", member.getPhoneNumber());
            consent.put("connectionInformation", member.getConnectionInformation());
            consent.put("orgCode", organization.getOrgCode());
            consent.put("orgName", organization.getOrgName());
            consent.put("orgType", organization.getOrgType().name());
            consentList.add(consent);
        }

        return consentList;
    }

    @Transactional
    public void saveSignature(Member member, List<Map<String, String>> consentList, List<Map<String, String>> signedConsentList) {

        for (int i = 0; i < consentList.size(); i++) {
            String jsonSignedConsent = MydataUtil.convertToJson(signedConsentList.get(i));
            String jsonConsent = MydataUtil.convertToJson(consentList.get(i));

            Signature signature = Signature.builder()
                    .consent(jsonConsent)
                    .signedConsent(jsonSignedConsent)
                    .member(member)
                    .build();

            signatureRepository.save(signature);
        }
    }

    @Transactional
    public void saveMydata(Member member, Organization organization, String accessToken) {
        Mydata mydata = Mydata.builder()
                .member(member)
                .organization(organization)
                .accessToken(accessToken)
                .build();
        mydataRepository.save(mydata);
    }

    // 자산 목록 저장
    @Transactional
    public void saveAssetList(Member member, List<AutoTransferInfoDto> autoTransferInfoDtoList) {

        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        // 기존 자산 목록
        List<Mydata> mydatas = mydataRepository.findByMember(member);

        List<AutoTransfer> autoTransfers = autoTransferRepository.findByAccount(account);
        for (AutoTransferInfoDto autoTransferInfoDto : autoTransferInfoDtoList) {

            Boolean isLinked = false;
            for (AutoTransfer autoTransfer : autoTransfers) {

                if (isLinkedAutoTransfer(autoTransferInfoDto, autoTransfer)) {
                    isLinked = true;
                    break;
                }
            }

            // db에 있는지 조회
//            assetRepository.findMy

            Asset asset = Asset.builder()
                    .accountNumber(autoTransferInfoDto.getAccountNumber())
                    .designatedOrgName(autoTransferInfoDto.getDesignatedOrgName())
                    .designatedOrgCode(autoTransferInfoDto.getDesignatedOrgCode())
                    .scheduledAmount(autoTransferInfoDto.getAutoTransferAmount())
                    .scheduledDate(autoTransferInfoDto.getAutoTransferDate())
                    .isLinked(isLinked)
                    .build();

            assetRepository.save(asset);
        }
    }

    // 연결 확인 메서드
    private boolean isLinkedAutoTransfer(AutoTransferInfoDto autoTransferInfoDto, AutoTransfer autoTransfer) {
        return autoTransferInfoDto.getAccountNumber().equals(autoTransfer.getToAccount()) &&
                autoTransferInfoDto.getAutoTransferAmount().equals(autoTransfer.getAmount()) &&
                autoTransferInfoDto.getAutoTransferDate().equals(autoTransfer.getDate());
    }

    // 자동이체 목록 조회
    public MydataGetResponseDto getAssetListInfo(List<String> orgCodeList, Member member, List<AutoTransferInfoDto> autoTransferInfoDtoList, List<PaymentInfoDto> paymentInfoDtoList) {

        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        List<MydataAssetDto> mydataAssetDtoList = new ArrayList<>();

        for (int i = 0; i < orgCodeList.size(); i++) {

            Organization organization = organizationRepository.findByOrgCode(orgCodeList.get(i))
                    .orElseThrow(() -> new MydataException(ErrorCode.MYDATA_ORG_NOT_FOUND));
            String orgName = organization.getOrgName();

            List<AssetDto> assetInfo = new ArrayList<>();
            for (AutoTransferInfoDto autoTransferInfoDto : autoTransferInfoDtoList) {

                if (autoTransferInfoDto.getBankName().equals(orgName)) {

                    Boolean isLinked = false;
                    List<AutoTransfer> autoTransfers = autoTransferRepository.findByAccount(account);
                    for (AutoTransfer autoTransfer : autoTransfers) {

                        if (isLinkedAutoTransfer(autoTransferInfoDto, autoTransfer)) {
                            isLinked = true;
                            break;
                        }
                    }

                    assetInfo.add(AssetDto.of(
                            autoTransferInfoDto.getAccountNumber(),
                            autoTransferInfoDto.getAutoTransferAmount(),
                            autoTransferInfoDto.getAutoTransferDate(),
                            autoTransferInfoDto.getDesignatedOrgName(),
                            autoTransferInfoDto.getDesignatedOrgCode(),
                            isLinked
                    ));
                }
            }

            MydataAssetDto mydataAssetDto = MydataAssetDto.of(orgName, assetInfo);
            mydataAssetDtoList.add(mydataAssetDto);
        }
        return MydataGetResponseDto.of(mydataAssetDtoList);
    }






//        for (AutoTransferInfoDto autoTransferInfoDto : autoTransferInfoDtoList) {
//            String orgName = autoTransferInfoDto.getDesignatedOrgName();
//
//            // 조직명이 목록에 이미 존재하는지 확인
//            MydataAssetDto mydataAssetDto = mydataAssetDtoList.stream()
//                    .filter(assetDto -> assetDto.getOrgName().equals(orgName))
//                    .findFirst()
//                    .orElse(null);
//
//            // 조직명이 목록에 없으면 새로운 MydataAssetDto 생성
//            if (mydataAssetDto == null) {
//                mydataAssetDto = MydataAssetDto.of(orgName, new ArrayList<>());
//                mydataAssetDtoList.add(mydataAssetDto);
//            }
//
//            // Asset 엔티티에서 isLinked 값을 가져옴
////            Boolean isLinked = getIsLinkedValueFromAsset(account, autoTransferInfoDto.getAccountNumber(), orgName);
//
//            //
//            Boolean isLinked = false;
//            List<AutoTransfer> autoTransfers = autoTransferRepository.findByAccount(account);
//            for (AutoTransfer autoTransfer : autoTransfers) {
//
//                if (isLinkedAutoTransfer(autoTransferInfoDto, autoTransfer)) {
//                    isLinked = true;
//                    break;
//                }
//            }
//
//            // AssetDto를 생성하고 MydataAssetDto의 assetInfo 목록에 추가
//            MydataAssetDto.AssetDto assetDto = MydataAssetDto.AssetDto.of(
//                    autoTransferInfoDto.getAccountNumber(),
//                    autoTransferInfoDto.getAutoTransferAmount(),
//                    autoTransferInfoDto.getAutoTransferDate(),
//                    autoTransferInfoDto.getDesignatedOrgName(),
//                    autoTransferInfoDto.getDesignatedOrgCode(),
//                    isLinked
//            );
//            mydataAssetDto.getAssetInfo().add(assetDto);
//        }
//
//        return MydataGetResponseDto.of(mydataAssetDtoList);
//    }

    // Asset 엔티티에서 isLinked 값을 가져옴
    private Boolean getIsLinkedValueFromAsset(Account account, String accountNumber, String orgName) {
        Asset asset = assetRepository.findByAccountNumberAndDesignatedOrgName(accountNumber, orgName)
                .orElseThrow(() -> new MydataException(ErrorCode.MYDATA_ASSET_NOT_FOUND));
        return asset != null && asset.getIsLinked();
    }

    // 마이데이터 연결 기관들 코드 목록 조회
    public List<String> getConnectedOrgCodeList() {

        Member member = authenticationService.getMemberByAuthentication();

        List<Mydata> mydataList = mydataRepository.findByMember(member);

        return mydataList.stream()
                .filter(mydata -> mydata.getAccessToken() != null)
                .map(mydata -> mydata.getOrganization().getOrgCode())
                .collect(Collectors.toList());
    }

    public void updateMydata(Member member, Organization organization, String accessToken) {
        Mydata mydata = mydataRepository.findByMemberAndOrganization(member, organization)
                .orElseThrow(() -> new MydataException(ErrorCode.MYDATA_NOT_FOUND));
        mydata.updateAccessToken(accessToken);
    }
}
