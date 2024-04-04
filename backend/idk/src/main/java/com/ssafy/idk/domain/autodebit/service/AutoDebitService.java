package com.ssafy.idk.domain.autodebit.service;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.account.entity.Category;
import com.ssafy.idk.domain.account.entity.Transaction;
import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.account.repository.TransactionRepository;
import com.ssafy.idk.domain.account.service.AccountService;
import com.ssafy.idk.domain.account.service.RSAKeyService;
import com.ssafy.idk.domain.autodebit.dto.request.AutoDebitCreateRequestDto;
import com.ssafy.idk.domain.autodebit.dto.request.AutoDebitPaymentRequestDto;
import com.ssafy.idk.domain.autodebit.dto.response.AutoDebitCreateResponseDto;
import com.ssafy.idk.domain.autodebit.dto.response.AutoDebitGetDetailResponseDto;
import com.ssafy.idk.domain.autodebit.dto.response.AutoDebitGetListResponseDto;
import com.ssafy.idk.domain.autodebit.dto.response.AutoDebitPaymentResponseDto;
import com.ssafy.idk.domain.autodebit.entity.AutoDebit;
import com.ssafy.idk.domain.autodebit.exception.AutoDebitException;
import com.ssafy.idk.domain.autodebit.repository.AutoDebitRepository;
import com.ssafy.idk.domain.autotransfer.exception.AutoTransferException;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.repository.MemberRepository;
import com.ssafy.idk.domain.member.service.AuthenticationService;
import com.ssafy.idk.domain.mydata.entity.Mydata;
import com.ssafy.idk.domain.mydata.entity.Organization;
import com.ssafy.idk.domain.mydata.exception.MydataException;
import com.ssafy.idk.domain.mydata.repository.MydataRepository;
import com.ssafy.idk.domain.mydata.repository.OrganizationRepository;
import com.ssafy.idk.domain.pocket.entity.Pocket;
import com.ssafy.idk.domain.pocket.repository.PocketRepository;
import com.ssafy.idk.global.error.ErrorCode;
import com.ssafy.idk.global.util.RSAUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AutoDebitService {

    private final MemberRepository memberRepository;
    private final AccountRepository accountRepository;
    private final RSAKeyService rsaKeyService;
    private final OrganizationRepository organizationRepository;
    private final AutoDebitRepository autoDebitRepository;
    private final AuthenticationService authenticationService;
    private final MydataRepository mydataRepository;
    private final PocketRepository pocketRepository;
    private final AccountService accountService;
    private final TransactionRepository trnsactionRepository;

    @Transactional
    public AutoDebitCreateResponseDto createAutoDebit(AutoDebitCreateRequestDto requestDto) {

        // 유저 정보 확인
        Member member = memberRepository.findByConnectionInformation(requestDto.getConnectionInformation())
                .orElseThrow(() -> new AutoDebitException(ErrorCode.MEMBER_NOT_FOUND));

        // 계좌 번호 검증
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));
//        String privateKey = rsaKeyService.findPrivateKey(member.getMemberId());
//        String accountNumberOfMember = RSAUtil.decode(privateKey, account.getNumber());
//        if (!accountNumberOfMember.equals(requestDto.getAccountNumber()))
//            throw new AutoDebitException(ErrorCode.ACCOUNT_NOT_FOUND);
        if(!account.getNumber().equals(requestDto.getAccountNumber()))
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

    @Transactional
    public AutoDebitPaymentResponseDto paymentAutoDebit(AutoDebitPaymentRequestDto requestDto) {

        // 신용카드 기관 검증
        Organization organization = organizationRepository.findByOrgCode(requestDto.getFinanceAgency())
                .orElseThrow(() -> new MydataException(ErrorCode.ORGANIZATION_INVALID));

        // 해당 청구자번호 자동결제 자동이체를 찾기
        AutoDebit autoDebit = autoDebitRepository.findByPayerNumber(requestDto.getPayerNumber())
                .orElseThrow(() -> new AutoDebitException(ErrorCode.AUTO_DEBIT_NOT_FOUND));

        // 해당 사용자의 신용카드 마이데이터 조회 가능 여부 확인
        Member member = autoDebit.getAccount().getMember();
        Optional<Mydata> optionalMydata = mydataRepository.findByMemberAndOrganization(member, organization);

        // 만약 신용카드 마이데이터를 조회하고 있다면
        if (optionalMydata.isPresent()) {

            Mydata mydata = optionalMydata.get();

            // 해당 신용카드 마이데이터에 대한 돈 포켓 생성 여부 확인
            Optional<Pocket> optionalPocket = pocketRepository.findByMydata(mydata);

            // 해당 돈 포켓이 있다면
            if (optionalPocket.isPresent()) {

                Pocket pocket = optionalPocket.get();

                // 해당 돈 포켓에서 돈을 가지고 있다면
                if (pocket.isActivated() && pocket.isDeposited()) {
                    if (pocket.getTarget() == requestDto.getChargeAmt()) {
                        pocket.withdraw();
                        pocket.setPaid(true);
                        pocketRepository.save(pocket);
                        return AutoDebitPaymentResponseDto.builder()
                                .paidAmt(requestDto.getChargeAmt())
                                .build();
                    }
                }
            }
        }

        // 돈포켓을 통해 출금하지 않았다면
        Account account = autoDebit.getAccount();
        if (account.getBalance() >= requestDto.getChargeAmt()) {

            Account withdrawedAccount = accountService.withdraw(member.getMemberId(), requestDto.getChargeAmt());
            Transaction transaction = Transaction.builder()
                    .category(Category.출금)
                    .content(organization.getOrgName() + " 대금")
                    .amount(requestDto.getChargeAmt())
                    .balance(withdrawedAccount.getBalance())
                    .createdAt(LocalDateTime.now())
                    .account(withdrawedAccount)
                    .build();
            trnsactionRepository.save(transaction);

            return AutoDebitPaymentResponseDto.builder()
                    .paidAmt(requestDto.getChargeAmt())
                    .build();
        } else {
            Long amount = account.getBalance();
            Account withdrawedAccount = accountService.withdraw(member.getMemberId(), amount);
            Transaction transaction = Transaction.builder()
                    .category(Category.출금)
                    .content(organization.getOrgName() + " 대금")
                    .amount(amount)
                    .balance(withdrawedAccount.getBalance())
                    .createdAt(LocalDateTime.now())
                    .account(withdrawedAccount)
                    .build();
            trnsactionRepository.save(transaction);

            return AutoDebitPaymentResponseDto.builder()
                    .paidAmt(requestDto.getChargeAmt())
                    .build();
        }
    }
}
