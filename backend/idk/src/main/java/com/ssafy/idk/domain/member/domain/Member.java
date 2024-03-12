package com.ssafy.idk.domain.member.domain;

import com.ssafy.idk.domain.account.domain.Account;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name="member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(name = "name")
    private String name;

    @Column(name = "birth")
    private String birth;

    @Column(name = "password")
    private String password;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "has_biometric")
    private Boolean hasBiometric;

    @Column(name = "transaction_push_enabled")
    private Boolean transactionPushEnabled;

    @Column(name = "auto_transfer_push_enabled")
    private Boolean autoTransferPushEnabled;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToOne
    @JoinColumn(name = "account_id")
    private Account account;

}
