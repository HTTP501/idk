package com.ssafy.mydata.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    MYDATA_AGREE_FAILED(400, "MY400", "마이데이터 동의를 실패했습니다."),
    MYDATA_USER_NOT_FOUND(404, "MY404", "존재하지 않는 사용자입니다."),
    MYDATA_ORG_NOT_FOUND(404, "MY404", "존재하지 않는 기관입니다."),
    MYDATA_INTEGRATED_AUTHENTICATION_FAILED(400, "MY400", "통합 인증을 실패했습니다."),
    MYDATA_USER_DISAGREE(400, "MY400", "사용자가 마이데이터 이용에 동의하지 않았습니다."),
    MYDATA_SECRET_INVALID(400, "MY400", "유효하지 않은 비밀번호입니다."),
    MYDATA_SIGN_TRANSFORM_FAILED(400, "MY400", "서명 데이터 변환 실패했습니다."),
    MYDATA_ORG_INVALID(400, "MY400", "유효하지 않은 기관입니다."),
    MYDATA_ORG_NO_AUTHORITY(400, "MY400", "권한이 없습니다."),
    MYDATA_INVALID_AUTHORITY(400, "MY400", "유효하지 않은 권한입니다."),
    MYDATA_USER_DUPLICATED(409, "MY409", "중복된 회원입니다.");

    private final int status;
    private final String code;
    private final String message;

}
