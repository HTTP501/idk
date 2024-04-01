package com.ssafy.idk.domain.mydata.repository;

import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.mydata.entity.Mydata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MydataRepository extends JpaRepository<Mydata, Long> {
    List<Mydata> findByMember(Member member);
}
