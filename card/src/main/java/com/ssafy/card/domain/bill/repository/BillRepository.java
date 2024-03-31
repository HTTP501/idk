package com.ssafy.card.domain.bill.repository;

import com.ssafy.card.domain.bill.entity.Bill;
import com.ssafy.card.domain.company.entity.Company;
import com.ssafy.card.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {

    Optional<List<Bill>> findByMemberAndCompanyOrderByPayDueDateDesc(Member member, Company company);

}
