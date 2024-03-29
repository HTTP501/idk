package com.ssafy.mydata.repository;

import com.ssafy.mydata.entity.OrganizationPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationPermissionRepository extends JpaRepository<OrganizationPermission, Long> {
}
