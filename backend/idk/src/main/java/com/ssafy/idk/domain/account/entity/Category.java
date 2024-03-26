package com.ssafy.idk.domain.account.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Category {
    입금, 출금, 송금, 저금통, 목표저축, 자동이체;
}
