package com.ssafy.ca.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.context.annotation.Configuration;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "ca_member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(name = "name")
    private String name;

    @Column(name = "birth_date", length = 344)
    private String birthDate;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "connection_information")
    private String connectionInformation;

    @Lob
    @Column(name = "digital_signature")
    private String digitalSignature;

    public void updateDigitalSignature(String digitalSignature) {
        this.digitalSignature = digitalSignature;
    }
}
