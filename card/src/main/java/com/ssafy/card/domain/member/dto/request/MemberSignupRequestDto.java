package com.ssafy.card.domain.member.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberSignupRequestDto {

    private String name;
    private String birthDate;
    private String phoneNumber;
    private String connectionInformation;

}
