package com.ssafy.idk.domain.account.repository;

import com.ssafy.idk.domain.account.entity.RSAKey;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RSAKeyRepository extends CrudRepository<RSAKey, Long> {
}
