package com.ssafy.idk.domain.autodebit.service;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.account.service.RSAKeyService;
import com.ssafy.idk.domain.autodebit.dto.request.AutoDebitCreateRequestDto;
import com.ssafy.idk.domain.autodebit.dto.response.AutoDebitCreateResponseDto;
import com.ssafy.idk.domain.autodebit.dto.response.AutoDebitGetDetailResponseDto;
import com.ssafy.idk.domain.autodebit.dto.response.AutoDebitGetListResponseDto;
import com.ssafy.idk.domain.autodebit.entity.AutoDebit;
import com.ssafy.idk.domain.autodebit.exception.AutoDebitException;
import com.ssafy.idk.domain.autodebit.repository.AutoDebitRepository;
import com.ssafy.idk.domain.autotransfer.exception.AutoTransferException;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.repository.MemberRepository;
import com.ssafy.idk.domain.member.service.AuthenticationService;
import com.ssafy.idk.domain.mydata.entity.Organization;
import com.ssafy.idk.domain.mydata.exception.MydataException;
import com.ssafy.idk.domain.mydata.repository.OrganizationRepository;
import com.ssafy.idk.global.error.ErrorCode;
import com.ssafy.idk.global.util.RSAUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AutoDebitService {

    private final MemberRepository memberRepository;
    private final AccountRepository accountRepository;
    private final RSAKeyService rsaKeyService;
    private final OrganizationRepository organizationRepository;
    private final AutoDebitRepository autoDebitRepository;
    private final AuthenticationService authenticationService;

    @Transactional
    public AutoDebitCreateResponseDto createAutoDebit(AutoDebitCreateRequestDto requestDto) {

        // 유저 정보 확인
        Member member = memberRepository.findByConnectionInformation(requestDto.getConnectionInformation())
                .orElseThrow(() -> new AutoDebitException(ErrorCode.MEMBER_NOT_FOUND));

        // 계좌 번호 검증
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));
        String privateKey = rsaKeyService.findPrivateKey(member.getMemberId());
        String accountNumberOfMember = RSAUtil.decode(privateKey, account.getNumber());
        if (!accountNumberOfMember.equals(requestDto.getAccountNumber()))
            throw new AutoDebitException(ErrorCode.ACCOUNT_NOT_FOUND);

        // 기관 코드 검증
        Organization organization = organizationRepository.findByOrgCode(requestDto.getOrgCode())
                .orElseThrow(() -> new MydataException(ErrorCode.MYDATA_ORG_NOT_FOUND));

        // 납부자 번호 검증
        if (autoDebitRepository.findByPayerNumber(requestDto.getPayerNumber()).isPresent())
            throw new AutoTransferException(ErrorCode.AUTO_DEBIT_PAYER_NUMBER_EXISTS);

        // 자동결제 저장
        AutoDebit autoDebit = AutoDebit.builder()
                .account(account)
                .financeAgency(organization.getOrgName())
                .orgCode(requestDto.getOrgCode())
                .payerNumber(requestDto.getPayerNumber())
                .build();
        AutoDebit savedAutoDebit = autoDebitRepository.save(autoDebit);

        return AutoDebitCreateResponseDto.of(savedAutoDebit.getAutoDebitId());
    }

    public AutoDebitGetDetailResponseDto getDetailAutoDebit(Long autoDebitId) {

        Member member = authenticationService.getMemberByAuthentication();

        AutoDebit autoDebit = autoDebitRepository.findById(autoDebitId)
                .orElseThrow(() -> new AutoDebitException(ErrorCode.AUTO_DEBIT_NOT_FOUND));

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Account account = autoDebit.getAccount();
        if (member != account.getMember())
            throw new AutoTransferException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        return AutoDebitGetDetailResponseDto.of(
                autoDebit.getAutoDebitId(),
                autoDebit.getFinanceAgency(),
                autoDebit.getOrgCode(),
                autoDebit.getPayerNumber()
        );
    }

    @Transactional
    public void deleteAutoDebit(Long autoDebitId) {

        Member member = authenticationService.getMemberByAuthentication();

        AutoDebit autoDebit = autoDebitRepository.findById(autoDebitId)
                .orElseThrow(() -> new AutoDebitException(ErrorCode.AUTO_DEBIT_NOT_FOUND));

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Account account = autoDebit.getAccount();
        if (member != account.getMember())
            throw new AutoTransferException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        autoDebitRepository.delete(autoDebit);
        
        // CARD 서버에 등록되어 있는 계좌번호 수정 요청 필요

    }

    public AutoDebitGetListResponseDto getArrayAutoDebit(Long accountId) {

        Member member = authenticationService.getMemberByAuthentication();

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));
        if (member != account.getMember())
            throw new AutoTransferException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        List<AutoDebit> arrayAutoDebit = account.getArrayAutoDebit();
        List<AutoDebitGetDetailResponseDto> arrayAutoDebitResponseDto = new ArrayList<>();
        for (AutoDebit autoDebit : arrayAutoDebit) {
            arrayAutoDebitResponseDto.add(
                    AutoDebitGetDetailResponseDto.of(
                            autoDebit.getAutoDebitId(),
                            autoDebit.getFinanceAgency(),
                            autoDebit.getOrgCode(),
                            autoDebit.getPayerNumber()
                    )
            );
        }

        return AutoDebitGetListResponseDto.of( arrayAutoDebitResponseDto );

    }
}
