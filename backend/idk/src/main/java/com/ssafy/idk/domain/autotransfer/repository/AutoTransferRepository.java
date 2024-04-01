package com.ssafy.idk.domain.autotransfer.repository;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.autotransfer.entity.AutoTransfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AutoTransferRepository extends JpaRepository<AutoTransfer, Long> {

    List<AutoTransfer> findByAccount(Account account);
}
