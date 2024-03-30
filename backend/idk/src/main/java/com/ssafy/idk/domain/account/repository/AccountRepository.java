package com.ssafy.idk.domain.account.repository;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.member.entity.Member;
import io.lettuce.core.dynamic.annotation.Param;
import jakarta.persistence.LockModeType;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByMember(Member member);
    Optional<Account> findByNumber(String number);

    @Lock(value = LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT a FROM Account a JOIN FETCH a.member m WHERE m = :member")
    Optional<Account> findByMemberWithPessimisticLock(@Param("member") Member member);
}
