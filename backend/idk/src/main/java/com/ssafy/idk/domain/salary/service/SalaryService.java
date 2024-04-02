package com.ssafy.idk.domain.salary.service;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.account.entity.Category;
import com.ssafy.idk.domain.account.entity.Transaction;
import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.account.repository.TransactionRepository;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.repository.MemberRepository;
import com.ssafy.idk.domain.member.service.AuthenticationService;
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
import java.util.List;

@Service
@RequiredArgsConstructor
public class SalaryService {

    private final SalaryRepository salaryRepository;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final AuthenticationService authenticationService;
    private final MemberRepository memberRepository;

    @Transactional
    public void salaryDeposit(Integer day) {

        List<Salary> salaryList = salaryRepository.findBySalaryDay(day);
        for (Salary salary : salaryList) {
            // 계좌 입금
            Account account = salary.getAccount();
            account.deposit(salary.getAmount());
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

        return SalaryResponseDto.of(
                savedSalary.getSalaryId(),
                savedSalary.getAccount().getNumber(),
                savedSalary.getSalaryDay(),
                savedSalary.getCompanyName(),
                savedSalary.getAmount()
        );

    }
}
