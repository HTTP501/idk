package com.ssafy.idk.domain.member.repository;

import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.entity.Signature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SignatureRepository extends JpaRepository<Signature, Long> {
}
