package com.ssafy.mydata.repository;

import com.ssafy.mydata.entity.Member;
import com.ssafy.mydata.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {

    Optional<Organization> findByClientId(String clientId);
}
