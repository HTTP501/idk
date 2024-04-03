package com.ssafy.idk.domain.targetsaving.service;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.account.entity.Category;
import com.ssafy.idk.domain.account.entity.Transaction;
import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.account.repository.TransactionRepository;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.service.AuthenticationService;
import com.ssafy.idk.domain.pocket.entity.Pocket;
import com.ssafy.idk.domain.pocket.entity.PocketTransaction;
import com.ssafy.idk.domain.pocket.exception.PocketException;
import com.ssafy.idk.domain.pocket.repository.PocketRepository;
import com.ssafy.idk.domain.pocket.repository.PocketTransactionRepository;
import com.ssafy.idk.domain.pocket.service.PocketService;
import com.ssafy.idk.domain.targetsaving.dto.request.TargetSavingCreateRequestDto;
import com.ssafy.idk.domain.targetsaving.dto.response.TargetSavingCreateResponseDto;
import com.ssafy.idk.domain.targetsaving.dto.response.TargetSavingDeleteResponseDto;
import com.ssafy.idk.domain.targetsaving.dto.response.TargetSavingGetListResponseDto;
import com.ssafy.idk.domain.targetsaving.dto.response.TargetSavingGetResponseDto;
import com.ssafy.idk.domain.targetsaving.entity.TargetSaving;
import com.ssafy.idk.domain.targetsaving.exception.TargetSavingException;
import com.ssafy.idk.domain.targetsaving.repository.TargetSavingRepository;
import com.ssafy.idk.global.error.ErrorCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TargetSavingService {

    private final AuthenticationService authenticationService;
    private final TargetSavingRepository targetSavingRepository;
    private final AccountRepository accountRepository;
    private final PocketService pocketService;
    private final TransactionRepository transactionRepository;
    private final PocketRepository pocketRepository;
    private final PocketTransactionRepository pocketTransactionRepository;

    @Transactional
    public TargetSavingCreateResponseDto createTargetSaving(TargetSavingCreateRequestDto requestDto) {

        Member member = authenticationService.getMemberByAuthentication();

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Long accountId = requestDto.getAccountId();
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new TargetSavingException(ErrorCode.ACCOUNT_NOT_FOUND));
        if (member != account.getMember())
            throw new TargetSavingException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        // date 유효성 검증 (1일 ~ 31일)
        if (requestDto.getDate() < 1 || requestDto.getDate() > 31)
            throw new TargetSavingException(ErrorCode.TARGET_SAVING_INVALID_DATE);

        // 저축개월 최대 1 ~ 36개월
        if (requestDto.getTerm() < 1 || requestDto.getTerm() > 36)
            throw new TargetSavingException(ErrorCode.TARGET_SAVING_INVALID_TERM);

        // 목표저축 금액과 월 납입액 * 저축개월 일치 여부 확인
        if (requestDto.getGoalAmount() != requestDto.getMonthlyAmount() * requestDto.getTerm())
            throw new TargetSavingException(ErrorCode.TARGET_SAVING_INCORRECT_AMOUNT);

        TargetSaving targetSaving = TargetSaving.builder()
                .name(requestDto.getName())
                .date(requestDto.getDate())
                .term(requestDto.getTerm())
                .monthlyAmount(requestDto.getMonthlyAmount())
                .goalAmount(requestDto.getGoalAmount())
                .itemId(requestDto.getItemId())
                .createdAt(LocalDateTime.now())
                .account(account)
                .build();

        TargetSaving savedTargetSaving = targetSavingRepository.save(targetSaving);

        // 돈 포켓 동시 생성
        Pocket pocket = pocketService.createByTargetSaving(savedTargetSaving, member);
        savedTargetSaving.setPocket(pocket);
        targetSavingRepository.save(savedTargetSaving);

        return TargetSavingCreateResponseDto.of(
                savedTargetSaving.getTargetSavingId(),
                savedTargetSaving.getName(),
                savedTargetSaving.getDate(),
                savedTargetSaving.getTerm(),
                savedTargetSaving.getMonthlyAmount(),
                savedTargetSaving.getGoalAmount()
                );
    }

    @Transactional
    public TargetSavingDeleteResponseDto deleteTargetSaving(Long targetSavingId) {

        Member member = authenticationService.getMemberByAuthentication();

        TargetSaving targetSaving = targetSavingRepository.findById(targetSavingId)
                .orElseThrow(() -> new TargetSavingException(ErrorCode.TARGET_SAVING_NOT_FOUND));

        Account account = targetSaving.getAccount();

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        if (member != account.getMember())
            throw new TargetSavingException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        // 돈 포켓 재정렬
        pocketService.reOrderArrayPocket(member, targetSaving.getPocket());

        // 목표저축 납입액 계좌로 이동
        Long amount = targetSaving.getCount() * targetSaving.getMonthlyAmount();
        targetSavingRepository.deleteById(targetSavingId);

        account.deposit(amount);
        accountRepository.save(account);

        // 계좌 입출금 내역 저장
        Transaction transaction = Transaction.builder()
                .category(Category.목표저축)
                .content("목표저축 해지")
                .amount(amount)
                .balance(account.getBalance() + amount)
                .createdAt(LocalDateTime.now())
                .account(account)
                .build();
        transactionRepository.save(transaction);

        return TargetSavingDeleteResponseDto.of(account.getBalance());
    }

    public TargetSavingGetResponseDto getTargetSaving(Long targetSavingId) {

        Member member = authenticationService.getMemberByAuthentication();

        TargetSaving targetSaving = targetSavingRepository.findById(targetSavingId)
                .orElseThrow(() -> new TargetSavingException(ErrorCode.TARGET_SAVING_NOT_FOUND));

        Account account = targetSaving.getAccount();

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        if (member != account.getMember())
            throw new TargetSavingException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        return TargetSavingGetResponseDto.of(
                targetSavingId,
                targetSaving.getName(),
                targetSaving.getDate(),
                targetSaving.getCreatedAt(),
                targetSaving.getTerm(),
                targetSaving.getCount(),
                targetSaving.getMonthlyAmount(),
                targetSaving.getGoalAmount()
        );
    }

    public TargetSavingGetListResponseDto getTargetSavingList(Long accountId) {

        Member member = authenticationService.getMemberByAuthentication();

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new TargetSavingException(ErrorCode.ACCOUNT_NOT_FOUND));
        if (member != account.getMember())
            throw new TargetSavingException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        List<TargetSaving> arrayTargetSaving = account.getArrayTargetSaving();

        List<TargetSavingGetResponseDto> arrayTargetSavingGetResponseDto = new ArrayList<>();
        for (TargetSaving targetSaving : arrayTargetSaving) {
            arrayTargetSavingGetResponseDto.add(
                    TargetSavingGetResponseDto.of(
                            targetSaving.getTargetSavingId(),
                            targetSaving.getName(),
                            targetSaving.getDate(),
                            targetSaving.getCreatedAt(),
                            targetSaving.getTerm(),
                            targetSaving.getCount(),
                            targetSaving.getMonthlyAmount(),
                            targetSaving.getGoalAmount()
                    ));
        }

        return TargetSavingGetListResponseDto.of(arrayTargetSavingGetResponseDto);
    }

    public List<Long> autoWithdrawTargetSaving(Integer date) {

        ArrayList<Long> members = new ArrayList<>();
        List<TargetSaving> targetSavings = targetSavingRepository.findAll();

        for (TargetSaving targetSaving : targetSavings) {
            if (Objects.equals(date, targetSaving.getDate())) {
                members.add(depositTargetSaving(targetSaving));
            }
        }

        return members;
    }

    public Long depositTargetSaving(TargetSaving targetSaving) {

        Pocket pocket = pocketRepository.findByTargetSaving(targetSaving);
        Account account = targetSaving.getAccount();

        // 입금되어 있지 않다면 패스
        if (!pocket.isDeposited()) return null;

        // 목표 저축 입금
        targetSaving.updateCount();
        pocket.withdraw();
        pocket.setPaid(true);

        // 돈 포켓 입출금 내역 저장
        PocketTransaction pocketTransaction = PocketTransaction.builder()
                .pocket(pocket)
                .createdAt(LocalDateTime.now())
                .amount(pocket.getTarget())
                .balance(0L)
                .content("출금")
                .build();
        pocketTransactionRepository.save(pocketTransaction);

        // 만약 목표저축 목표를 달성했다면
        if (Objects.equals(targetSaving.getCount(), targetSaving.getTerm())) {
            // 계좌 입금
            account.deposit(targetSaving.getGoalAmount());

            // 계좌 입출금 내역 저장
            Transaction transaction = Transaction.builder()
                    .category(Category.목표저축)
                    .content("목표저축 달성!")
                    .amount(pocket.getTarget())
                    .balance(account.getBalance())
                    .createdAt(LocalDateTime.now())
                    .account(account)
                    .build();
            transactionRepository.save(transaction);

            pocket.setActivated(false);
            pocketRepository.save(pocket);
        }

        return pocket.getMember().getMemberId();
    }
}
