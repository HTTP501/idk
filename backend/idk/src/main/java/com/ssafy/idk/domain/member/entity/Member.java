package com.ssafy.idk.domain.member.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

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

    @Column(name = "birth_date", length = 344)
    private String birthDate;

    @Column(name = "pin")
    private String pin;

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

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public void updateAutoTransferPushEnabled() {
        this.autoTransferPushEnabled = !this.autoTransferPushEnabled;
    }

    public void updateTransactionPushEnabled() {
        this.transactionPushEnabled = !this.transactionPushEnabled;
    }
}
