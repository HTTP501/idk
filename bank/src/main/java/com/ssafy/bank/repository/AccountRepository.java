package com.ssafy.bank.repository;

import com.ssafy.bank.entity.Account;
import com.ssafy.bank.entity.Bank;
import com.ssafy.bank.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByBank(Bank selectedBank);

    List<Account> findByMember(Member member);

    List<Account> findByBankAndMember(Bank bank, Member member);

    Optional<Account> findByAccountNumber(String accountNumber);

    boolean existsByAccountNumber(String accountNumber);

    Optional<Account> findByBankAndAccountNumber(Bank bank, String accountNumber);
}
