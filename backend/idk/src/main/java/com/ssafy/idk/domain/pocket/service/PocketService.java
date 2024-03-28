package com.ssafy.idk.domain.pocket.service;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.autotransfer.entity.AutoTransfer;
import com.ssafy.idk.domain.autotransfer.exception.AutoTransferException;
import com.ssafy.idk.domain.autotransfer.repository.AutoTransferRepository;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.service.AuthenticationService;
import com.ssafy.idk.domain.pocket.dto.request.PocketCreateAutoTransferRequestDto;
import com.ssafy.idk.domain.pocket.dto.request.PocketUpdateNameRequestDto;
import com.ssafy.idk.domain.pocket.dto.response.*;
import com.ssafy.idk.domain.pocket.entity.Pocket;
import com.ssafy.idk.domain.pocket.entity.PocketTransaction;
import com.ssafy.idk.domain.pocket.exception.PocketException;
import com.ssafy.idk.domain.pocket.repository.PocketRepository;
import com.ssafy.idk.domain.pocket.repository.PocketTransactionRepository;
import com.ssafy.idk.domain.targetsaving.entity.TargetSaving;
import com.ssafy.idk.global.error.ErrorCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PocketService {

    private final PocketRepository pocketRepository;
    private final PocketTransactionRepository pocketTransactionRepository;
    private final AuthenticationService authenticationService;
    private final AutoTransferRepository autoTransferRepository;
    private final AccountRepository accountRepository;
    @Transactional
    public Pocket createByTargetSaving(TargetSaving targetSaving, Account account) {

        return Pocket.builder()
                .account(account)
                .targetSaving(targetSaving)
                .name(targetSaving.getName() + "의 돈포켓")
                .target(targetSaving.getMonthlyAmount())
                .expectedDate(targetSaving.getDate())
                .isActivated(false)
                .isDeposited(false)
                .isPaid(false)
                .orderNumber(account.getArrayPocketOrders().size())
                .build();
    }

    @Transactional
    public PocketCreateAutoTransferResponseDto createByAutoTransfer(PocketCreateAutoTransferRequestDto requestDto) {

        Member member = authenticationService.getMemberByAuthentication();

        // 자동이체 여부 확인
        AutoTransfer autoTransfer = autoTransferRepository.findById(requestDto.getAutoTransferId())
                .orElseThrow(() -> new PocketException(ErrorCode.POCKET_AUTO_TRANSFER_NOT_FOUND));

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Account account = autoTransfer.getAccount();
        if (member != account.getMember())
            throw new PocketException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        // 해당 자동이체의 돈 포켓이 이미 존재할 때
        if (pocketRepository.findByAutoTransfer(autoTransfer).isPresent())
            throw new PocketException(ErrorCode.POCKET_AUTO_TRANSFER_EXISTS);

        Pocket pocket = Pocket.builder()
                .account(account)
                .autoTransfer(autoTransfer)
                .name(autoTransfer.getName() + "의 돈포켓")
                .target(autoTransfer.getAmount())
                .expectedDate(autoTransfer.getDate())
                .orderNumber(account.getArrayPocketOrders().size())
                .build();
        Pocket savedPocket = pocketRepository.save(pocket);

        return PocketCreateAutoTransferResponseDto.of(
                savedPocket.getPocketId(),
                savedPocket.getName(),
                savedPocket.getTarget()
        );
    }

    public PocketGetDetailResponseDto getPocketDetail(Long pocketId) {

        Member member = authenticationService.getMemberByAuthentication();

        // 포켓 유무 확인
        Pocket pocket = pocketRepository.findById(pocketId)
                .orElseThrow(() -> new PocketException(ErrorCode.POCKET_NOT_FOUND));

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Account account = pocket.getAccount();
        if (member != account.getMember())
            throw new PocketException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        // 예상 결제일
        LocalDate expectedDate = LocalDate.of(LocalDate.now().getYear(), LocalDate.now().getMonth(), pocket.getExpectedDate());
        if (expectedDate.isBefore(LocalDate.now())) expectedDate = expectedDate.plusMonths(1);

        // 돈 포켓 입출금 내역
        List<PocketTransaction> arrayPocketTransaction = pocket.getArrayPocketTranscation();
        List<PocketTransactionResponseDto> arrayPocketTransactionResponseDto = new ArrayList<>();
        for (PocketTransaction pocketTransaction : arrayPocketTransaction) {
            arrayPocketTransactionResponseDto.add(
                    PocketTransactionResponseDto.of(
                            pocketTransaction.getPocketTransactionId(),
                            pocketTransaction.getPocket().getPocketId(),
                            pocketTransaction.getCreatedAt(),
                            pocketTransaction.getAmount(),
                            pocketTransaction.getBalance(),
                            pocketTransaction.getContent()
                    )
            );
        }

        return PocketGetDetailResponseDto.of(
                pocket.getPocketId(),
                pocket.getName(),
                pocket.getBalance(),
                pocket.getTarget(),
                expectedDate,
                pocket.isActivated(),
                pocket.isDeposited(),
                pocket.isPaid(),
                arrayPocketTransactionResponseDto
        );
    }

    public PocketTransactionResponseDto getPocketTransactionDetail(Long pocketId, Long transactionId) {

        Member member = authenticationService.getMemberByAuthentication();

        // 포켓 유무 확인
        Pocket pocket = pocketRepository.findById(pocketId)
                .orElseThrow(() -> new PocketException(ErrorCode.POCKET_NOT_FOUND));

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Account account = pocket.getAccount();
        if (member != account.getMember())
            throw new PocketException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        // 돈 포켓 입출금 내역 유무 확인
        PocketTransaction pocketTransaction = pocketTransactionRepository.findById(transactionId)
                .orElseThrow(() -> new PocketException(ErrorCode.POCKET_TRANSACTION_NOT_FOUND));

        return PocketTransactionResponseDto.of(
                pocketTransaction.getPocketTransactionId(),
                pocketTransaction.getPocket().getPocketId(),
                pocketTransaction.getCreatedAt(),
                pocketTransaction.getAmount(),
                pocketTransaction.getBalance(),
                pocketTransaction.getContent()
        );
    }

    public PocketAutoTransferDeleteResponseDto deletePocketAutoTransfer(Long pocketId) {

        Member member = authenticationService.getMemberByAuthentication();

        // 포켓 유무 확인
        Pocket pocket = pocketRepository.findById(pocketId)
                .orElseThrow(() -> new PocketException(ErrorCode.POCKET_NOT_FOUND));

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Account account = pocket.getAccount();
        if (member != account.getMember())
            throw new PocketException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        // 돈 포켓 납입액 계좌로 이동
        if (pocket.getBalance() != 0) account.deposit(pocket.getBalance());
        accountRepository.save(account);

        pocketRepository.delete(pocket);

        return PocketAutoTransferDeleteResponseDto.of(
                account.getAccountId(),
                account.getBalance()
        );
    }

    public PocketUpdateNameResponseDto updatePocketName(PocketUpdateNameRequestDto requestDto, Long pocketId) {

        Member member = authenticationService.getMemberByAuthentication();

        // 포켓 유무 확인
        Pocket pocket = pocketRepository.findById(pocketId)
                .orElseThrow(() -> new PocketException(ErrorCode.POCKET_NOT_FOUND));

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Account account = pocket.getAccount();
        if (member != account.getMember())
            throw new PocketException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        pocket.setName(requestDto.getName());
        Pocket savedPocket = pocketRepository.save(pocket);

        return PocketUpdateNameResponseDto.of(
                savedPocket.getPocketId(),
                savedPocket.getName()
        );
    }
}
