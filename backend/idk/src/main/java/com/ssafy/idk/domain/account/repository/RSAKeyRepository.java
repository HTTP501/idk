package com.ssafy.idk.domain.account.repository;

import com.ssafy.idk.domain.account.domain.RSAKey;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RSAKeyRepository extends CrudRepository<RSAKey, Long> {
}
