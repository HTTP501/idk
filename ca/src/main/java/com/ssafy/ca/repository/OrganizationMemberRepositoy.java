package com.ssafy.ca.repository;

import com.ssafy.ca.domain.Member;
import com.ssafy.ca.domain.Organization;
import com.ssafy.ca.domain.OrganizationMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrganizationMemberRepositoy extends JpaRepository<OrganizationMember, Long> {

    Optional<OrganizationMember> findByMemberAndOrganization(Member member, Organization organization);
}
