package com.ssafy.card.domain.member.repository;

import com.ssafy.card.domain.digitalsigniture.entity.DigitalSigniture;
import com.ssafy.card.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByBirthDate(String birthDate);
    Optional<Member> findByPhoneNumber(String phoneNumber);
    Optional<Member> findByConnectionInformation(String connectionInformation);
    Optional<Member> findByDigitalSigniture(DigitalSigniture digitalSigniture);

}
