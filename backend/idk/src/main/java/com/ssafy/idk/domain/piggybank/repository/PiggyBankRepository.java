package com.ssafy.idk.domain.piggybank.repository;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.piggybank.entity.PiggyBank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PiggyBankRepository extends JpaRepository<PiggyBank, Long> {

    Optional<PiggyBank> findByAccount(Account account);

    Optional<PiggyBank> findByPiggyBankId(Long piggyBankId);
}
