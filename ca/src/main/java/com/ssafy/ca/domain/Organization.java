package com.ssafy.ca.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "organization")
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orgId;

    @Column(name = "org_code", unique = true)
    private String orgCode;

    @Column(name = "org_name")
    private String orgName;

    @Column(name = "access_token")
    private String accessToken;
}
