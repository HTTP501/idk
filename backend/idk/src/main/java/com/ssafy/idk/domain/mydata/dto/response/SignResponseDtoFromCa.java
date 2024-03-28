package com.ssafy.idk.domain.mydata.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class SignResponseDtoFromCa {

    private List<Map<String, String>> signedDataList;
}
