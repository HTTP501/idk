package com.ssafy.idk.domain.pocket.repository;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.autotransfer.entity.AutoTransfer;
import com.ssafy.idk.domain.pocket.entity.Pocket;
import com.ssafy.idk.domain.pocket.entity.PocketTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PocketTransactionRepository extends JpaRepository<PocketTransaction, Long> {

    Optional<AutoTransfer> findByPocket(Pocket pocket);

}
