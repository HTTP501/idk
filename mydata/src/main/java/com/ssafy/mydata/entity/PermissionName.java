package com.ssafy.mydata.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PermissionName {
    // 마이데이터 사업자, 정보제공자, 인증기관, 중계기관
    MYDATA_OPERATOR, DATA_PROVIDER, AUTHENTICATION_AGENCY, INTERMEDIARY_AGENCY

}
