package com.ssafy.ca.repository;

import com.ssafy.ca.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByNameAndBirthDateAndPhoneNumber(String name, String birthDate, String phoneNumber);
    Optional<Member> findByConnectionInformation(String connectionInformation);
}
