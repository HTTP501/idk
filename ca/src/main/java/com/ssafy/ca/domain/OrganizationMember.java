package com.ssafy.ca.domain;

import com.ssafy.ca.dto.SignRequestDto;
import jakarta.persistence.*;
import lombok.*;

import java.util.Map;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder(toBuilder = true)
@Table(name = "ca_organization_member")
public class OrganizationMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "org_id")
    private Organization organization;

    @Column(name = "sign_data", length = 4000)
    private String signData;

    public void setMember(Member member) {
        this.member = member;
        if (member != null) {
            member.getOrganizationMembers().add(this);
        }
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
        if (organization != null) {
            organization.getOrganizationMembers().add(this);
        }
    }
}

