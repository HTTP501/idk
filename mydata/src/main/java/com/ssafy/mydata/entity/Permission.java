package com.ssafy.mydata.entity;

public enum Permission {
    MY_DATA_RECEIVER("마이데이터 사업자"),
    DATA_PROVIDER("정보 제공자"),
    AUTHENTICATION_PROVIDER("인증 기관"),
    INTERMEDIARY("중계 기관");

    private final String displayName;

    Permission(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
