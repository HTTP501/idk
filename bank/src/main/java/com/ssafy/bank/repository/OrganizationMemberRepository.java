package com.ssafy.bank.repository;

import com.ssafy.bank.entity.Member;
import com.ssafy.bank.entity.Organization;
import com.ssafy.bank.entity.OrganizationMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrganizationMemberRepository extends JpaRepository<OrganizationMember, Long> {
    Optional<OrganizationMember> findByOrganizationAndMember(Organization organization, Member member);

    Boolean existsByOrganizationAndMember(Organization organization, Member member);
}
