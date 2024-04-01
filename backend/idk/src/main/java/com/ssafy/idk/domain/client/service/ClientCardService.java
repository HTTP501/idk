package com.ssafy.idk.domain.client.service;

import com.ssafy.idk.domain.client.dto.response.AutoTransferInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientCardService {
    public List<AutoTransferInfoDto> getAutoTransferInfo(String name, String connectionInformation) {
        return new ArrayList<>();

    }

    // 카드 목록 조회

    // 카드 상세 정보 조회
}
