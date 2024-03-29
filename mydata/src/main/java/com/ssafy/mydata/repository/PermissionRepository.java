package com.ssafy.mydata.repository;

import com.ssafy.mydata.entity.Member;
import com.ssafy.mydata.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {
}
