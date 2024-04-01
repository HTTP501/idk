package com.ssafy.ca.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class SignRequestDto {

    private String connectionInformation;
    private List<Map<String, String>> consentList;
}


