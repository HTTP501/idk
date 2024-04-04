package com.ssafy.idk.domain.mydata.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MydataConnectRequestDto {

    private List<String> orgList;
}
