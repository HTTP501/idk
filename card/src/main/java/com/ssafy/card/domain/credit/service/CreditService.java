package com.ssafy.card.domain.credit.service;


import com.ssafy.card.domain.company.entity.Company;
import com.ssafy.card.domain.company.repository.CompanyRepository;
import com.ssafy.card.domain.credit.dto.request.CreditCreateRequestDto;
import com.ssafy.card.domain.credit.dto.request.CreditRequestDto;
import com.ssafy.card.domain.credit.dto.request.CreditUpdateRequestDto;
import com.ssafy.card.domain.credit.dto.response.CreditDetailResponseDto;
import com.ssafy.card.domain.credit.dto.response.CreditArrayResponseDto;
import com.ssafy.card.domain.credit.dto.response.CreditInfoResponseDto;
import com.ssafy.card.domain.credit.dto.response.CreditUpdateAccountNumResponseDto;
import com.ssafy.card.domain.credit.entity.Credit;
import com.ssafy.card.domain.credit.repository.CreditRepository;
import com.ssafy.card.domain.member.entity.Member;
import com.ssafy.card.domain.member.repository.MemberRepository;
import com.ssafy.card.domain.organization.entity.Organization;
import com.ssafy.card.domain.organization.repository.OrganizationRepository;
import com.ssafy.card.global.error.CardServerException;
import com.ssafy.card.global.error.ErrorCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CreditService {

    private final CreditRepository creditRepository;
    private final MemberRepository memberRepository;
    private final CompanyRepository companyRepository;
    private final OrganizationRepository organizationRepository;

    @Transactional
    public void createCredit(CreditCreateRequestDto requestDto) {

        // 계좌 유효성 검증 (BANK SERVER 생성 시 구현 필요)


        // CI 값으로 사용자 찾기
        Member member = memberRepository.findByConnectionInformation(requestDto.getConnectionInformation())
                .orElseThrow(() -> new CardServerException(ErrorCode.MEMBER_NOT_FOUND));

        // 기관코드로 신용카드사 찾기
        Organization organization = organizationRepository.findByOrgCode(requestDto.getCardCompanyOrgCode())
                .orElseThrow(() -> new CardServerException(ErrorCode.ORGANIZATION_NOT_FOUND));

        Company company = companyRepository.findByOrganization(organization)
                .orElseThrow(() -> new CardServerException(ErrorCode.COMPANY_NOT_FOUND));


        // 카드 번호 생성 (Unique)
        String cardNumber;
        while (true) {
            cardNumber = RandomStringUtils.random(16, false, true);
            if (creditRepository.findByCardNumber(cardNumber).isEmpty()) break;
        }

        // 납부자 번호 생성
        String payerNumber;
        while (true) {
            payerNumber = RandomStringUtils.random(20, false, true);
            if (creditRepository.findByCardNumber(payerNumber).isEmpty()) break;
        }

        // 신용카드 가입
        Credit credit = Credit.builder()
                .member(member)
                .company(company)
                .cardNumber(cardNumber)
                .accountNum(requestDto.getAccountNum())
                .accountOrgCode(requestDto.getAccountOrgCode())
                .payerNumber(payerNumber)
                .chargeDay(requestDto.getChargeDay())
                .build();
        creditRepository.save(credit);

        // 출금동의 자동이체 정보 등록 요청 (IDK 반영 후 구현 필요)

    }

    @Transactional
    public CreditUpdateAccountNumResponseDto updateAccountNum(CreditUpdateRequestDto requestDto, Long creditId) {

        // 해당 API 요청에 대한 접근권한 확인 방법이 없음


        // 해당 신용카드 찾기
        Credit credit = creditRepository.findById(creditId)
                .orElseThrow(() -> new CardServerException(ErrorCode.CREDIT_NOT_FOUND));

        // 계좌 유효성 검증 (BANK SERVER 생성 시 구현 필요)


        // 신용카드 정보 업데이트
        credit.setAccountNum(requestDto.getAccountNum());
        credit.setAccountOrgCode(requestDto.getAccountOrgCode());
        Credit savedCredit = creditRepository.save(credit);

        return CreditUpdateAccountNumResponseDto.of(
                savedCredit.getCreditId(),
                savedCredit.getAccountNum(),
                savedCredit.getAccountOrgCode()
        );
    }

    // [MYDATA] 신용카드 목록 조회
    public CreditArrayResponseDto getArrayCredit(CreditRequestDto requestDto) {

        // 전자서명?으로 해당 사용자 확인 필요
        String CI = "";
        Member member = memberRepository.findByConnectionInformation(CI)
                .orElseThrow(() -> new CardServerException(ErrorCode.MEMBER_NOT_FOUND));

        // 해당 orgCode를 가진 신용카드사 찾기
        Organization organization = organizationRepository.findByOrgCode(requestDto.getOrgCode())
                .orElseThrow(() -> new CardServerException(ErrorCode.ORGANIZATION_NOT_FOUND));

        Company company = companyRepository.findByOrganization(organization)
                .orElseThrow(() -> new CardServerException(ErrorCode.COMPANY_NOT_FOUND));

        // 해당 member와 company를 가진 credit 목록을 찾기
        List<Credit> arrayCredit = creditRepository.findByMemberAndCompany(member, company);

        // 카드 목록 DTO 생성
        List<CreditInfoResponseDto> arrayCreditResponseDto = new ArrayList<>();
        for (Credit credit : arrayCredit) {
            arrayCreditResponseDto.add(
                    CreditInfoResponseDto.of(
                            credit.getCreditId(),
                            credit.getCardNumber()
                    ));
        }

        return CreditArrayResponseDto.of(arrayCreditResponseDto);
    }

    // [MYDATA] 신용카드 기본정보 조회
    public CreditDetailResponseDto getCreditDetail(CreditRequestDto requestDto, Long creditId) {

        // 전자서명?으로 해당 사용자 확인 필요
        String CI = "";
        Member member = memberRepository.findByConnectionInformation(CI)
                .orElseThrow(() -> new CardServerException(ErrorCode.MEMBER_NOT_FOUND));

        // 해당 orgCode를 가진 신용카드사 찾기
        Organization organization = organizationRepository.findByOrgCode(requestDto.getOrgCode())
                .orElseThrow(() -> new CardServerException(ErrorCode.ORGANIZATION_NOT_FOUND));

        Company company = companyRepository.findByOrganization(organization)
                .orElseThrow(() -> new CardServerException(ErrorCode.COMPANY_NOT_FOUND));

        // 해당 credit 찾기
        Credit credit = creditRepository.findById(creditId)
                .orElseThrow(() -> new CardServerException(ErrorCode.CREDIT_NOT_FOUND));

        // 해당 신용카드의 기관코드와 일치하는지 확인하기
        if (credit.getCompany().getOrganization() != organization)
            throw new CardServerException(ErrorCode.ORGANIZATION_INCORRECT);

        return CreditDetailResponseDto.of(
                credit.getCreditId(),
                credit.getAccountNum(),
                credit.getAccountOrgCode(
                ));
    }
}
