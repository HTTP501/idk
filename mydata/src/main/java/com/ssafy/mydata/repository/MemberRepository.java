package com.ssafy.mydata.repository;

import com.ssafy.mydata.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByNameAndPhoneNumberAndConnectionInformation(String name, String phoneNumber, String connectionInformation);

    Optional<Member> findByConnectionInformation(String connectionInformation);
}
