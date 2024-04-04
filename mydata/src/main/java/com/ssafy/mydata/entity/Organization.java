package com.ssafy.mydata.entity;

import jakarta.persistence.*;
import lombok.*;

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

    @Column(name = "org_name")
    private String orgName;

    @Column(name = "org_code", unique = true)
    private String orgCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "org_type")
    private OrganizationType orgType;

    @Column(name = "client_id")
    private String clientId;

    @Column(name = "client_secret")
    private String clientSecret;

    @ElementCollection
    @CollectionTable(name = "organization_permissions", joinColumns = @JoinColumn(name = "org_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "permission")
    private List<Permission> permissions;

}
