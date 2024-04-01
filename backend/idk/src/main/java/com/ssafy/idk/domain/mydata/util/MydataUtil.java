package com.ssafy.idk.domain.mydata.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.idk.domain.mydata.exception.MydataException;
import com.ssafy.idk.global.error.ErrorCode;

import java.util.List;
import java.util.Map;

public class MydataUtil {
    private static final ObjectMapper mapper = new ObjectMapper();

    public static String convertToJson(Map<String, String> consent) throws MydataException {
        try {
            return mapper.writeValueAsString(consent);
        } catch (Exception e) {
            throw new MydataException(ErrorCode.MYDATA_SIGN_TRANSFORM_FAILED);
        }
    }

    public static String convertListToJson(List<Map<String, String>> consentList) throws MydataException {
        try {
            return mapper.writeValueAsString(consentList);
        } catch (Exception e) {
            throw new MydataException(ErrorCode.MYDATA_SIGN_TRANSFORM_FAILED);
        }
    }


    public static Map<String, String> convertFromJson(String json) throws MydataException {
        try {
            return mapper.readValue(json, new TypeReference<Map<String, String>>() {});
        } catch (Exception e) {
            throw new MydataException(ErrorCode.MYDATA_SIGN_TRANSFORM_FAILED);
        }
    }

    public static List<Map<String, String>> convertListFromJson(String json) throws MydataException {
        try {
            return mapper.readValue(json, new TypeReference<List<Map<String, String>>>() {});
        } catch (Exception e) {
            throw new MydataException(ErrorCode.MYDATA_SIGN_TRANSFORM_FAILED);
        }
    }

}
