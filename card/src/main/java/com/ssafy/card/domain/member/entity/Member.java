package com.ssafy.card.domain.member.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "MEMBER")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;

    @Column(length = 10, name = "name")                         // 이름
    private String name;

    @Column(length = 13, name = "birthDate", unique = true)     // 주민번호
    private String birthDate;

    @Column(length = 12,name = "phone_number", unique = true)   // 전화번호
    private String phoneNumber;

    @Column(name = "connection_information", unique = true)     // 통합인증수단(CI)
    private String connectionInformation;

}
