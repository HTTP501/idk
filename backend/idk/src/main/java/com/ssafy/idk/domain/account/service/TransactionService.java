package com.ssafy.idk.domain.account.service;

import com.ssafy.idk.domain.account.domain.Account;
import com.ssafy.idk.domain.account.domain.Transaction;
import com.ssafy.idk.domain.account.dto.response.TransactionResponseDto;
import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.account.repository.TransactionRepository;
import com.ssafy.idk.domain.member.domain.Member;
import com.ssafy.idk.domain.member.repository.MemberRepository;
import com.ssafy.idk.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final MemberRepository memberRepository;

    public List<TransactionResponseDto> getTransaction(Long memberId) {
        Member member = memberRepository.findById(memberId).get();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        List<Transaction> transactionList = transactionRepository.findAllByAccount(account);

        List<TransactionResponseDto> transactionResponseDtoList = new ArrayList<>();
        for(Transaction transaction : transactionList) {
            transactionResponseDtoList.add(TransactionResponseDto.of(transaction.getTransactionId(), transaction.getContent(), transaction.getAmount(), transaction.getBalance(), transaction.getCreatedAt()));
        }
        return transactionResponseDtoList;
    }
}
