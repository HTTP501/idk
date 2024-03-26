package com.ssafy.idk.domain.account.repository;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByMember(Member member);
}
