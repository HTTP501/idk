package com.ssafy.idk.global.stream.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.idk.domain.pocket.entity.Pocket;

import java.time.LocalDate;

public record SsePocketDto(
        @JsonProperty("pocket") PocketDto pocketDto
//        @JsonProperty("isActivated") Boolean isActivated,
//        @JsonProperty("isPaid") Boolean isPaid,
//        @JsonProperty("expectedDate") Integer expectedDate,
//        @JsonProperty("target") Long target
) {
}
