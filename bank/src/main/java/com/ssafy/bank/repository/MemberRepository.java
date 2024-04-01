package com.ssafy.bank.repository;

import com.ssafy.bank.entity.Member;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByConnectionInformation(String connectionInformation);
}
