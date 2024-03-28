package com.ssafy.idk.domain.mydata.repository;

import com.ssafy.idk.domain.mydata.entity.Mydata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MydataRepository extends JpaRepository<Mydata, Long> {
}
