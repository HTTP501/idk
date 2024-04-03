package com.ssafy.idk.domain.autotransfer.service;

import com.ssafy.idk.domain.account.dto.request.AutoTransferRequestDto;
import com.ssafy.idk.domain.account.dto.request.TransferRequestDto;
import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.account.entity.Category;
import com.ssafy.idk.domain.account.entity.Transaction;
import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.account.service.AccountService;
import com.ssafy.idk.domain.autotransfer.dto.request.AutoTransferCreateRequestDto;
import com.ssafy.idk.domain.autotransfer.dto.response.AutoTransferCreateResponseDto;
import com.ssafy.idk.domain.autotransfer.dto.response.AutoTransferGetResponseDto;
import com.ssafy.idk.domain.autotransfer.dto.response.AutoTransferListResponseDto;
import com.ssafy.idk.domain.autotransfer.entity.AutoTransfer;
import com.ssafy.idk.domain.autotransfer.repository.AutoTransferRepository;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.service.AuthenticationService;
import com.ssafy.idk.domain.autotransfer.exception.AutoTransferException;
import com.ssafy.idk.domain.piggybank.dto.response.PiggyBankTransactionResponseDto;
import com.ssafy.idk.domain.piggybank.entity.PiggyBankTransaction;
import com.ssafy.idk.domain.pocket.entity.Pocket;
import com.ssafy.idk.domain.pocket.repository.PocketRepository;
import com.ssafy.idk.domain.pocket.service.PocketService;
import com.ssafy.idk.global.error.ErrorCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AutoTransferService {

    private final AuthenticationService authenticationService;
    private final AutoTransferRepository autoTransferRepository;
    private final AccountRepository accountRepository;
    private final PocketRepository pocketRepository;
    private final AccountService accountService;
    private final PocketService pocketService;

    @Transactional
    public AutoTransferCreateResponseDto createAutoTransfer(AutoTransferCreateRequestDto requestDto) {

        Member member = authenticationService.getMemberByAuthentication();

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Long accountId = requestDto.getAccountId();
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));
        if (member != account.getMember())
            throw new AutoTransferException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        // 자동이체 계좌가 유효하지 않을 때 (추후 적용)

        // 자동이체 금액을 0원 이하로 등록할 때
        if (requestDto.getAmount() <= 0)
            throw new AutoTransferException(ErrorCode.AUTO_TRANSFER_AMOUNT_NEED_TO_EXCEED_ZERO);

        // 날짜 변환
        LocalDate startYearMonth = YearMonth.parse(requestDto.getStartYearMonth()).atDay(requestDto.getDate());
        LocalDate endYearMonth = YearMonth.parse(requestDto.getEndYearMonth()).atDay(requestDto.getDate());

        // 자동이체 기간이 유효하지 않을 때
        if (startYearMonth.compareTo(endYearMonth) >= 0         // 시작 날짜가 종료 날짜보다 이후일 때
            || LocalDate.now().compareTo(startYearMonth) >= 0)    // 시작년월은 당일 이전으로 설정할 수 없음
            throw new AutoTransferException(ErrorCode.AUTO_TRANSFER_INVALID_TERM);


        AutoTransfer autoTransfer = AutoTransfer.builder()
                .account(account)
                .name(requestDto.getShowMyBankAccount())
                .toAccount(requestDto.getToAccount())
                .toAccountBank(requestDto.getToAccountBank())
                .startYearMonth(startYearMonth)
                .endYearMonth(endYearMonth)
                .amount(requestDto.getAmount())
                .date(requestDto.getDate())
                .showRecipientBankAccount(requestDto.getShowRecipientBankAccount())
                .showMyBankAccount(requestDto.getShowMyBankAccount())
                .build();
        AutoTransfer savedAutoTransfer = autoTransferRepository.save(autoTransfer);

        return AutoTransferCreateResponseDto.of(
                savedAutoTransfer.getAutoTransferId(),
                savedAutoTransfer.getName(),
                savedAutoTransfer.getToAccount(),
                savedAutoTransfer.getToAccountBank(),
                savedAutoTransfer.getAmount(),
                savedAutoTransfer.getDate(),
                savedAutoTransfer.getStartYearMonth(),
                savedAutoTransfer.getEndYearMonth()
        );
    }

    @Transactional
    public void deleteAutoTransfer(Long autoTransferId) {

        Member member = authenticationService.getMemberByAuthentication();

        // 자동이체 유무 확인
        AutoTransfer autoTransfer = autoTransferRepository.findById(autoTransferId)
                .orElseThrow(() -> new AutoTransferException(ErrorCode.AUTO_TRANSFER_NOT_FOUND));

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Account account = autoTransfer.getAccount();
        if (member != account.getMember())
            throw new AutoTransferException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        autoTransferRepository.deleteById(autoTransferId);
    }

    public AutoTransferGetResponseDto getAutoTransfer(Long autoTransferId) {

        Member member = authenticationService.getMemberByAuthentication();

        // 자동이체 유무 확인
        AutoTransfer autoTransfer = autoTransferRepository.findById(autoTransferId)
                .orElseThrow(() -> new AutoTransferException(ErrorCode.AUTO_TRANSFER_NOT_FOUND));

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Account account = autoTransfer.getAccount();
        if (member != account.getMember())
            throw new AutoTransferException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        return AutoTransferGetResponseDto.of(
                autoTransfer.getAutoTransferId(),
                autoTransfer.getName(),
                autoTransfer.getToAccount(),
                autoTransfer.getToAccountBank(),
                autoTransfer.getStartYearMonth(),
                autoTransfer.getEndYearMonth(),
                autoTransfer.getAmount(),
                autoTransfer.getDate(),
                autoTransfer.getShowRecipientBankAccount(),
                autoTransfer.getShowMyBankAccount(),
                (autoTransfer.getPocket() == null ? null : autoTransfer.getPocket().getPocketId())
        );
    }

    public AutoTransferListResponseDto getArrayAutoTransfer(Long accountId) {

        Member member = authenticationService.getMemberByAuthentication();

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));
        if (member != account.getMember())
            throw new AutoTransferException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        List<AutoTransfer> arrayAutoTransfer = account.getArrayAutoTransfer();
        List<AutoTransferGetResponseDto> arrayAutoTransferResponseDto = new ArrayList<>();
        for (AutoTransfer autoTransfer : arrayAutoTransfer) {
            arrayAutoTransferResponseDto.add(
                    AutoTransferGetResponseDto.of(
                            autoTransfer.getAutoTransferId(),
                            autoTransfer.getName(),
                            autoTransfer.getToAccount(),
                            autoTransfer.getToAccountBank(),
                            autoTransfer.getStartYearMonth(),
                            autoTransfer.getEndYearMonth(),
                            autoTransfer.getAmount(),
                            autoTransfer.getDate(),
                            autoTransfer.getShowRecipientBankAccount(),
                            autoTransfer.getShowMyBankAccount(),
                            (autoTransfer.getPocket() == null ? null : autoTransfer.getPocket().getPocketId())
                    )
            );
        }

        return AutoTransferListResponseDto.of(arrayAutoTransferResponseDto);
    }

    @Transactional
    public HashSet<Long> autoTransfer(Integer systemDay) {

        HashSet<Long> members = new HashSet<>();

        List<AutoTransfer> autoTransfers = autoTransferRepository.findByDate(systemDay);
        for (AutoTransfer autoTransfer : autoTransfers) {
            Account account = autoTransfer.getAccount();

            // 1. 돈 포켓 금액 확인
            Optional<Pocket> optionalPocket = pocketRepository.findByAutoTransfer(autoTransfer);
            if (optionalPocket.isPresent()) {
                Pocket pocket = optionalPocket.get();
                // 활성화 되어 있고, 입금되어 있을 때
                if (pocket.isActivated() && pocket.isDeposited()) {

                    // 돈 포켓 -> 계좌 출금
                    pocketService.withdrawPocket(pocket.getPocketId());
                    pocket.withdraw();

                    // 계좌이체
                    Account savedAccount = accountService.autoTransfer(AutoTransferRequestDto.of(
                            autoTransfer.getAccount().getAccountId(),
                            null,
                            autoTransfer.getToAccount(),
                            autoTransfer.getToAccountBank(),
                            autoTransfer.getAmount(),
                            autoTransfer.getShowRecipientBankAccount(),
                            autoTransfer.getShowMyBankAccount()
                    ));

                    // 결제 완료 표시
                    pocket.setPaid(true);
                    pocketRepository.save(pocket);

                    // 업데이트된 멤버 아이디 추가
                    members.add(autoTransfer.getAccount().getMember().getMemberId());

                // 돈 포켓이 활성화 되어 있지 않거나, 돈이 없을 때
                } else {
                    // 이체할 돈이 없을 때
                    if (account.getBalance() < autoTransfer.getAmount()) continue;

                    // 계좌 자동이체
                    Account savedAccount = accountService.autoTransfer(AutoTransferRequestDto.of(
                            autoTransfer.getAccount().getAccountId(),
                            null,
                            autoTransfer.getToAccount(),
                            autoTransfer.getToAccountBank(),
                            autoTransfer.getAmount(),
                            autoTransfer.getShowRecipientBankAccount(),
                            autoTransfer.getShowMyBankAccount()
                    ));

                    // 결제 완료 표시
                    pocket.setPaid(true);
                    pocketRepository.save(pocket);

                    // 업데이트된 멤버 아이디 추가
                    members.add(autoTransfer.getAccount().getMember().getMemberId());

                }
            // Pocket이 존재하지 않을 때
            } else {
                // 이체할 돈이 없을 때
                if (account.getBalance() < autoTransfer.getAmount()) continue;

                // 계좌이체
                accountService.autoTransfer(AutoTransferRequestDto.of(
                        autoTransfer.getAccount().getAccountId(),
                        null,
                        autoTransfer.getToAccount(),
                        autoTransfer.getToAccountBank(),
                        autoTransfer.getAmount(),
                        autoTransfer.getShowRecipientBankAccount(),
                        autoTransfer.getShowMyBankAccount()
                ));

                // 업데이트된 멤버 아이디 추가
                members.add(autoTransfer.getAccount().getMember().getMemberId());

            }

        }

        return members;
    }
}
