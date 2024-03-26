package com.ssafy.idk.domain.account.repository;

import com.ssafy.idk.domain.account.domain.Account;
import com.ssafy.idk.domain.account.domain.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findAllByAccount(Account account);

}
