package com.ssafy.bank.repository;

import com.ssafy.bank.entity.Account;
import com.ssafy.bank.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    Optional<Organization> findByOrgCode(String orgCode);
}
