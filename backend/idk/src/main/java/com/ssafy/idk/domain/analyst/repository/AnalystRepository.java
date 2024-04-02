package com.ssafy.idk.domain.analyst.repository;

import com.ssafy.idk.domain.analyst.entity.Analyst;
import com.ssafy.idk.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnalystRepository extends JpaRepository<Analyst, Long> {
    List<Analyst> findAllByMember(Member member);
    Optional<Analyst> findByMemberAndYearAndMonth(Member member, Integer year, Integer month);

}
