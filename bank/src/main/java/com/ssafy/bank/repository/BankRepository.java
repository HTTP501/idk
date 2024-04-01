package com.ssafy.bank.repository;

import com.ssafy.bank.entity.Bank;
import com.ssafy.bank.entity.Member;
import com.ssafy.bank.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BankRepository extends JpaRepository<Bank, Long> {
    Optional<Bank> findByOrganization(Organization organization);
}
