package com.ssafy.mydata.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.mydata.exception.MydataException;
import com.ssafy.mydata.global.error.ErrorCode;

import java.util.List;
import java.util.Map;

public class MydataUtil {

    // 직렬화 메서드
    public static String convertToJson(List<?> signedDataList) throws MydataException {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(signedDataList);
        } catch (Exception e) {
            throw new MydataException(ErrorCode.MYDATA_SIGN_TRANSFORM_FAILED);
        }
    }

    // 역직렬화 메서드
    public static List<Map<String, String>> convertJsonToList(String jsonStr) throws MydataException {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(jsonStr, new TypeReference<List<Map<String, String>>>() {});
        } catch (Exception e) {
            throw new MydataException(ErrorCode.MYDATA_SIGN_TRANSFORM_FAILED);
        }
    }
}