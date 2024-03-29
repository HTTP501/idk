package com.ssafy.card.domain.credit.repository;

import com.ssafy.card.domain.credit.entity.Credit;
import com.ssafy.card.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface CreditRepository extends JpaRepository<Credit, Long> {

    Optional<Credit> findByCardNumber(String cardNumber);
    Optional<Credit> findByPayerNumber(String payerNumber);

}
