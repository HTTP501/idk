package com.ssafy.idk.domain.autodebit.service;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.account.service.RSAKeyService;
import com.ssafy.idk.domain.autodebit.dto.request.AutoDebitCreateRequestDto;
import com.ssafy.idk.domain.autodebit.entity.AutoDebit;
import com.ssafy.idk.domain.autodebit.exception.AutoDebitException;
import com.ssafy.idk.domain.autodebit.repository.AutoDebitRepository;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.repository.MemberRepository;
import com.ssafy.idk.domain.mydata.entity.Organization;
import com.ssafy.idk.domain.mydata.exception.MydataException;
import com.ssafy.idk.domain.mydata.repository.OrganizationRepository;
import com.ssafy.idk.global.error.ErrorCode;
import com.ssafy.idk.global.util.RSAUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AutoDebitService {

    private final MemberRepository memberRepository;
    private final AccountRepository accountRepository;
    private final RSAKeyService rsaKeyService;
    private final OrganizationRepository organizationRepository;
    private final AutoDebitRepository autoDebitRepository;

    @Transactional
    public void createAutoDebit(AutoDebitCreateRequestDto requestDto) {

        // 유저 정보 확인
        Member member = memberRepository.findByConnectionInformation(requestDto.getConnectionInformation())
                .orElseThrow(() -> new AutoDebitException(ErrorCode.MEMBER_NOT_FOUND));

        // 계좌 번호 검증
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));
        String privateKey = rsaKeyService.findPrivateKey(member.getMemberId());
        String accountNumberOfMember = RSAUtil.decode(privateKey, account.getNumber());
        if (!accountNumberOfMember.equals(requestDto.getAccountNumber()))
            throw new AutoDebitException(ErrorCode.AUTO_DEBIT_INVALID_ACCOUNT);

        // 기관 코드 검증
        Organization organization = organizationRepository.findByOrgCode(requestDto.getOrgCode())
                .orElseThrow(() -> new MydataException(ErrorCode.MYDATA_ORG_NOT_FOUND));

        // 자동결제 저장
        AutoDebit autoDebit = AutoDebit.builder()
                .account(account)
                .financeAgency(organization.getOrgName())
                .orgCode(requestDto.getOrgCode())
                .payerNumber(requestDto.getPayerNumber())
                .build();
        autoDebitRepository.save(autoDebit);

    }
}
