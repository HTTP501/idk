package com.ssafy.idk.global.stream.dto;


import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;

public record SseDateDto(@JsonProperty("systemDate") LocalDate systemDate) {
}
