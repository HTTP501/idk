package com.ssafy.idk.domain.autodebit.dto.request;


import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AutoDebitCreateRequestDto {

    private String connectionInformation;
    private String accountNumber;
    private String orgCode;
    private String payerNumber;

}
