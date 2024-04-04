package com.ssafy.idk.domain.salary.repository;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.salary.entity.Salary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SalaryRepository extends JpaRepository<Salary, Long> {

    List<Salary> findBySalaryDay(Integer day);

    Optional<Salary> findByAccount(Account account);
}
