package com.ssafy.idk.domain.salary.service;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.account.entity.Category;
import com.ssafy.idk.domain.account.entity.Transaction;
import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.account.repository.TransactionRepository;
import com.ssafy.idk.domain.account.service.AccountService;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.repository.MemberRepository;
import com.ssafy.idk.domain.member.service.AuthenticationService;
import com.ssafy.idk.domain.piggybank.dto.request.PiggyBankTransactionRequestDto;
import com.ssafy.idk.domain.piggybank.entity.PiggyBank;
import com.ssafy.idk.domain.piggybank.repository.PiggyBankRepository;
import com.ssafy.idk.domain.piggybank.service.PiggyBankService;
import com.ssafy.idk.domain.pocket.exception.PocketException;
import com.ssafy.idk.domain.salary.dto.SalaryRequestDto;
import com.ssafy.idk.domain.salary.dto.SalaryResponseDto;
import com.ssafy.idk.domain.salary.entity.Salary;
import com.ssafy.idk.domain.salary.exception.SalaryException;
import com.ssafy.idk.domain.salary.repository.SalaryRepository;
import com.ssafy.idk.global.error.ErrorCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SalaryService {

    private final SalaryRepository salaryRepository;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final AuthenticationService authenticationService;
    private final PiggyBankRepository piggyBankRepository;
    private final PiggyBankService piggyBankService;
    private final AccountService accountService;

    public HashSet<Long> salaryDeposit(Integer day) {

        HashSet<Long> members = new HashSet<>();

        List<Salary> salaryList = salaryRepository.findBySalaryDay(day);
        for (Salary salary : salaryList) {

            Account account = salary.getAccount();

            // 저금통이 있을 때 저금통으로 입금
            Optional<PiggyBank> optionalPiggyBank = piggyBankRepository.findByAccount(account);
            if (optionalPiggyBank.isPresent()) {
                PiggyBank piggyBank = optionalPiggyBank.get();
                piggyBankService.deposit(PiggyBankTransactionRequestDto.of(account.getBalance()), piggyBank.getPiggyBankId());
            }

            // 계좌 입금
            accountService.deposit(account.getMember().getMemberId(), salary.getAmount());
            accountRepository.save(account);

            // 계좌 기록
            Transaction transaction = Transaction.builder()
                    .category(Category.입금)
                    .content(salary.getCompanyName())
                    .amount(salary.getAmount())
                    .account(account)
                    .balance(account.getBalance())
                    .createdAt(LocalDateTime.now())
                    .build();
            transactionRepository.save(transaction);
        }

        return members;
    }

    @Transactional
    public SalaryResponseDto createSalary(SalaryRequestDto requestDto) {

        Member member = authenticationService.getMemberByAuthentication();

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Account account = accountRepository.findById(requestDto.getAccountId())
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));
        if (member != account.getMember())
            throw new PocketException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        Salary salary = Salary.builder()
                .account(account)
                .salaryDay(requestDto.getSalaryDay())
                .companyName(requestDto.getCompanyName())
                .amount(requestDto.getAmount())
                .build();
        Salary savedSalary = salaryRepository.save(salary);

        // 사용자 월급일 업데이트
        updateAccountSalaryDay(savedSalary);

        return SalaryResponseDto.of(
                savedSalary.getSalaryId(),
                savedSalary.getAccount().getNumber(),
                savedSalary.getSalaryDay(),
                savedSalary.getCompanyName(),
                savedSalary.getAmount()
        );
    }

    public SalaryResponseDto getSalary(Long accountId) {

        Member member = authenticationService.getMemberByAuthentication();

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));
        if (member != account.getMember())
            throw new PocketException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        Salary salary = salaryRepository.findByAccount(account)
                .orElseThrow(() -> new SalaryException(ErrorCode.SALARY_NOT_FOUND));

        return SalaryResponseDto.of(
                salary.getSalaryId(),
                account.getNumber(),
                salary.getSalaryDay(),
                salary.getCompanyName(),
                salary.getAmount()
        );
    }

    @Transactional
    public void deleteSalary(Long salaryId) {

        Member member = authenticationService.getMemberByAuthentication();

        Salary salary = salaryRepository.findById(salaryId)
                .orElseThrow(() -> new SalaryException(ErrorCode.SALARY_NOT_FOUND));

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Account account = salary.getAccount();
        if (member != account.getMember())
            throw new PocketException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        salaryRepository.delete(salary);

    }

    @Transactional
    public SalaryResponseDto updateSalary(SalaryRequestDto requestDto, Long salaryId) {

        Member member = authenticationService.getMemberByAuthentication();

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Account account = accountRepository.findById(requestDto.getAccountId())
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        Salary salary = salaryRepository.findById(salaryId)
                .orElseThrow(() -> new SalaryException(ErrorCode.SALARY_NOT_FOUND));

        salary.setSalaryDay(requestDto.getSalaryDay());
        salary.setAmount(requestDto.getAmount());
        salary.setCompanyName(requestDto.getCompanyName());
        Salary savedSalary = salaryRepository.save(salary);

        // 사용자 월급일 업데이트
        updateAccountSalaryDay(savedSalary);

        return SalaryResponseDto.of(
                savedSalary.getSalaryId(),
                savedSalary.getAccount().getNumber(),
                savedSalary.getSalaryDay(),
                savedSalary.getCompanyName(),
                savedSalary.getAmount()
        );

    }

    @Transactional
    public void updateAccountSalaryDay(Salary salary) {

        Account account = accountRepository.findBySalary(salary);
        account.setPayDate(salary.getSalaryDay());

        accountRepository.save(account);

    }
}
