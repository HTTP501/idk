package com.ssafy.card.domain.digitalsigniture.entity;

import com.ssafy.card.domain.company.entity.Company;
import com.ssafy.card.domain.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "DIGITAL_SIGNITURE")
public class DigitalSigniture {

    @Id
    private String digitalSigniture;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id") @NotNull
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

}
