package com.ssafy.idk.domain.mydata.entity;

import com.ssafy.idk.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name="mydata")
public class Mydata {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mydataId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "org_id")
    private Organization organization;

    @OneToMany(mappedBy = "mydata", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Asset> assetList;

    public void setMember(Member member) {
        this.member = member;
        if (member != null) {
            member.getMydataList().add(this);
        }
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
        if (organization != null) {
            organization.getMydataList().add(this);
        }
    }

}
