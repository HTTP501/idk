package com.ssafy.mydata.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(name = "member_name")
    private String name;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "birth_date")
    private String birthDate;

    @Column(name = "connection_information")
    private String connectionInformation;

    @Column(name = "is_agree")
    private Boolean isAgree;

    public void updateIsAgree() {
        this.isAgree = true;
    }
}
