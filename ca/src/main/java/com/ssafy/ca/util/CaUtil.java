package com.ssafy.ca.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.ca.exception.CaException;
import com.ssafy.ca.global.error.ErrorCode;

import java.util.List;
import java.util.Map;

public class CaUtil {

    // List<Map<String, String>> 데이터 타입을 JSON 문자열로 직렬화
    public static String convertListToJson(List<Map<String, String>> data) throws CaException {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(data);
        } catch (Exception e) {
            throw new CaException(ErrorCode.CA_TRANSFOMR_FAILED);
        }
    }

    // JSON 문자열을 List<Map<String, String>> 데이터 타입으로 역직렬화
    public static List<Map<String, String>> convertJsonToList(String jsonStr) throws CaException {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(jsonStr, new TypeReference<List<Map<String, String>>>() {});
        } catch (Exception e) {
            throw new CaException(ErrorCode.CA_TRANSFOMR_FAILED);
        }
    }

    // Map<String, String> 데이터 타입을 JSON 문자열로 직렬화 (기존 메서드)
    public static String convertToJson(Map<String, String> data) throws CaException {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(data);
        } catch (Exception e) {
            throw new CaException(ErrorCode.CA_TRANSFOMR_FAILED);
        }
    }

    // JSON 문자열을 Map<String, String> 데이터 타입으로 역직렬화
    public static Map<String, String> convertJsonToMap(String jsonStr) throws CaException {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(jsonStr, new TypeReference<Map<String, String>>() {});
        } catch (Exception e) {
            throw new CaException(ErrorCode.CA_TRANSFOMR_FAILED);
        }
    }
}
