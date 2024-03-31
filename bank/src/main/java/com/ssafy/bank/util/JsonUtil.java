package com.ssafy.bank.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

public class JsonUtil {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    // Map<String, String>을 Json 문자열로 변환
    public static String toJsonString(Map<String, String> map) throws JsonProcessingException {
        return objectMapper.writeValueAsString(map);
    }

    // Json 문자열을 Map<String, String>으로 변환
    public static Map<String, String> toMap(String jsonString) throws JsonProcessingException {
        return objectMapper.readValue(jsonString, new TypeReference<Map<String, String>>() {});
    }
}
