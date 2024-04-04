package com.ssafy.card.domain.bill.service;

import com.ssafy.card.domain.bill.dto.response.PaymentGetArrayResponseDto;
import com.ssafy.card.domain.bill.dto.response.PaymentResponseDto;
import com.ssafy.card.domain.bill.entity.Bill;
import com.ssafy.card.domain.bill.repository.BillRepository;
import com.ssafy.card.domain.company.entity.Company;
import com.ssafy.card.domain.company.repository.CompanyRepository;
import com.ssafy.card.domain.credit.dto.request.CreditRequestDto;
import com.ssafy.card.domain.credit.entity.Credit;
import com.ssafy.card.domain.member.entity.Member;
import com.ssafy.card.domain.member.repository.MemberRepository;
import com.ssafy.card.domain.organization.entity.Organization;
import com.ssafy.card.domain.organization.repository.OrganizationRepository;
import com.ssafy.card.global.error.CardServerException;
import com.ssafy.card.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BillService {

    private final BillRepository billRepository;
    private final MemberRepository memberRepository;
    private final OrganizationRepository organizationRepository;
    private final CompanyRepository companyRepository;

    // [MYDATA] 해당 사용자의 결제정보 조회
    public PaymentGetArrayResponseDto getPayment(String connectionInformation, String orgCode) {

        // 전자서명?으로 해당 사용자 확인 필요
        String CI = connectionInformation;
        Member member = memberRepository.findByConnectionInformation(CI)
                .orElseThrow(() -> new CardServerException(ErrorCode.MEMBER_NOT_FOUND));

        // 해당 orgCode를 가진 신용카드사 찾기
        Organization organization = organizationRepository.findByOrgCode(orgCode)
                .orElseThrow(() -> new CardServerException(ErrorCode.ORGANIZATION_NOT_FOUND));

        Company company = companyRepository.findByOrganization(organization)
                .orElseThrow(() -> new CardServerException(ErrorCode.COMPANY_NOT_FOUND));

        // 해당 정보를 가진 청구내역 찾기
        List<Bill> arrayBill = billRepository.findByMemberAndCompanyOrderByPayDueDateDesc(member, company)
                .orElseThrow(() -> new CardServerException(ErrorCode.PAYMENT_NOT_FOUND));

        List<PaymentResponseDto> arrayPaymentResponseDto = new ArrayList<>();
        for (Bill bill : arrayBill) {
            Credit credit = bill.getCredit();
            Organization organization1 = organizationRepository.findByOrgCode(credit.getAccountOrgCode())
                    .orElseThrow(() -> new CardServerException(ErrorCode.COMPANY_NOT_FOUND));
            arrayPaymentResponseDto.add(
                    PaymentResponseDto.of(
                            credit.getCompany().getName(),
                            credit.getCompany().getName(),
                            credit.getCardNumber(),
                            bill.getChargeAmt(),
                            bill.getPayDueDate(),
                            credit.getAccountNum(),
                            organization1.getOrgName(),
                            credit.getAccountOrgCode()
                    )
            );
        }

        return PaymentGetArrayResponseDto.of(arrayPaymentResponseDto);
    }
}
