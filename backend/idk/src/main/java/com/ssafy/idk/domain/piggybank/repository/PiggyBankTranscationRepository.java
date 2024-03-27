package com.ssafy.idk.domain.piggybank.repository;

import com.ssafy.idk.domain.piggybank.entity.PiggyBank;
import com.ssafy.idk.domain.piggybank.entity.PiggyBankTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PiggyBankTranscationRepository extends JpaRepository<PiggyBankTransaction, Long> {

    List<PiggyBankTransaction> findByPiggyBank(PiggyBank piggyBank);
}
