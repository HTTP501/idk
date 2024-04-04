package com.ssafy.idk.domain.autodebit.repository;

import com.ssafy.idk.domain.autodebit.entity.AutoDebit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AutoDebitRepository extends JpaRepository<AutoDebit, Long> {

    Optional<AutoDebit> findByPayerNumber(String payerNumber);

}
