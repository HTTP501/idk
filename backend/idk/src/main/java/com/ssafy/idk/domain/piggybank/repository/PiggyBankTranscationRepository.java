package com.ssafy.idk.domain.piggybank.repository;

import com.ssafy.idk.domain.piggybank.domain.PiggyBank;
import com.ssafy.idk.domain.piggybank.domain.PiggyBankTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PiggyBankTranscationRepository extends JpaRepository<PiggyBankTransaction, Long> {

    List<PiggyBankTransaction> findByPiggyBank(PiggyBank piggyBank);
}
