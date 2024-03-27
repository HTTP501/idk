package com.ssafy.idk.domain.pocket.service;

import com.ssafy.idk.domain.pocket.entity.Pocket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PocketRepository extends JpaRepository<Pocket, Long> {

}
