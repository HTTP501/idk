package com.ssafy.idk.domain.mydata.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.idk.domain.mydata.exception.MydataException;
import com.ssafy.idk.global.error.ErrorCode;

import java.util.List;

public class MydataUtil {

    public static String convertToJson(List<?> signedDataList) throws MydataException {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(signedDataList);
        } catch (Exception e) {
            throw new MydataException(ErrorCode.MYDATA_SIGN_TRANSFORM_FAILED);
        }
    }
}
