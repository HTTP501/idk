package com.ssafy.idk.domain.account.repository;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.salary.entity.Salary;
import com.ssafy.idk.domain.targetsaving.entity.TargetSaving;
import io.lettuce.core.dynamic.annotation.Param;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByMember(Member member);
    Optional<Account> findByNumber(String number);

    @Lock(value = LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT a FROM Account a JOIN FETCH a.member m WHERE m = :member")
    Optional<Account> findByMemberWithPessimisticLock(@Param("member") Member member);

    List<Account> findByPayDate(Integer systemDay);

    Account findBySalary(Salary salary);

}
