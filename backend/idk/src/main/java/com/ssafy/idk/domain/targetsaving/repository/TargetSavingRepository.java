package com.ssafy.idk.domain.targetsaving.repository;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.targetsaving.entity.TargetSaving;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TargetSavingRepository extends JpaRepository<TargetSaving, Long> {

    Optional<TargetSaving> findByAccount(Account account);

}
