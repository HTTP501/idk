package com.ssafy.card.domain.company.repository;

import com.ssafy.card.domain.company.entity.Company;
import com.ssafy.card.domain.organization.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    Optional<Company> findByOrganization(Organization organization);

}
