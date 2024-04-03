package com.ssafy.idk.domain.mydata.repository;

import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.mydata.entity.Mydata;
import com.ssafy.idk.domain.mydata.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MydataRepository extends JpaRepository<Mydata, Long> {
    List<Mydata> findByMember(Member member);
    Optional<Mydata> findByMemberAndOrganization(Member member, Organization organization);

    Boolean existsByOrganizationAndMember(Organization organization, Member member);
}
