package com.ssafy.idk.domain.client.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
public class AutoTransferInfoDto {

    private String bankName; // 은행이름
    private String organizationCode; // 기관 코드
    private String accountNumber; // 계좌번호, 카드 이름
    private Long autoTransferAmount; // 자동이체금액
    private Integer autoTransferDate; // 자동이체일
    private String designatedAccountNumber; // 지정 계좌번호
    private String designatedOrgName; // 지정 기관 이름(신한 은행)
    private String designatedOrgCode; // 지정 기관 코드

//    orgName asset claimAmount claimDate designatedAssetNumber designatedOrgName
}
