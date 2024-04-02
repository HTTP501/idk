package com.ssafy.idk.domain.mydata.repository;

import com.ssafy.idk.domain.mydata.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {

    Optional<Organization> findByOrgName(String orgName);
    Optional<Organization> findByOrgCode(String orgCode);

}
