package com.ssafy.bank.repository;

import com.ssafy.bank.entity.Account;
import com.ssafy.bank.entity.AutoTransfer;
import com.ssafy.bank.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AutoTransferRepository extends JpaRepository<AutoTransfer, Long> {
    List<AutoTransfer> findByAccount(Account memberAccount);
}
