package com.ssafy.ca.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "ca_organization")
public class Organization {

    @Id
    @GeneratedValue
    private Long org_id;

    @Column(name = "org_code")
    private String orgCode;

    @Column(name = "token")
    private String token;
}
