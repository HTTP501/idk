package com.ssafy.bank.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class AutoTransferInfoResponseDto {

    private String bankName;
    private String organizationCode;
    private String accountNumber;
    private Long autoTransferAmount;
    private Integer autoTransferDate;
    private String designatedAccountNumber;
    private String designatedOrgName;
    private String designatedOrgCode;

    public static AutoTransferInfoResponseDto of(String bankName, String organizationCode, String accountNumber,
                                                 Long autoTransferAmount, Integer autoTransferDate,
                                                 String designatedAccountNumber, String designatedOrgName,
                                                 String designatedOrgCode) {
        return AutoTransferInfoResponseDto.builder()
                .bankName(bankName)
                .organizationCode(organizationCode)
                .accountNumber(accountNumber)
                .autoTransferAmount(autoTransferAmount)
                .autoTransferDate(autoTransferDate)
                .designatedAccountNumber(designatedAccountNumber)
                .designatedOrgName(designatedOrgName)
                .designatedOrgCode(designatedOrgCode)
                .build();
    }
}
