package com.ssafy.idk.domain.mydata.repository;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.mydata.entity.Asset;
import com.ssafy.idk.domain.mydata.entity.Mydata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    Optional<Asset> findByAccountNumberAndDesignatedOrgName(String accountNumber, String orgName);

    List<Asset> findByMydata(Mydata mydata);
}
