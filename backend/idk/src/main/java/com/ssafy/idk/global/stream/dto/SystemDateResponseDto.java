package com.ssafy.idk.global.stream.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
@AllArgsConstructor
public class SystemDateResponseDto {

    private LocalDate systemDate;

    public static SystemDateResponseDto of(LocalDate systemDate) {
        return SystemDateResponseDto.builder().systemDate(systemDate).build();
    }
}
