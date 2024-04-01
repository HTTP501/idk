package com.ssafy.idk.domain.member.repository;

import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.entity.Signature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SignatureRepository extends JpaRepository<Signature, Long> {
    List<Signature> findByMember(Member member);
}
