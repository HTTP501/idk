package com.ssafy.idk.global.stream.service;

import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.service.AuthenticationService;
import com.ssafy.idk.domain.pocket.entity.Pocket;
import com.ssafy.idk.domain.pocket.exception.PocketException;
import com.ssafy.idk.domain.pocket.repository.PocketRepository;
import com.ssafy.idk.global.error.ErrorCode;
import com.ssafy.idk.global.stream.dto.PocketDto;
import com.ssafy.idk.global.stream.dto.SseDateDto;
import com.ssafy.idk.global.stream.dto.EventPayload;
import com.ssafy.idk.global.stream.dto.SsePocketDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
@RequiredArgsConstructor
public class SseEmitterService {
    // thread-safe 한 컬렉션 객체로 sse emitter 객체를 관리해야 한다.
    private final Map<String, SseEmitter> emitterMap = new ConcurrentHashMap<>();
    private static final long TIMEOUT = 120L * 60 * 1000;
    private static final long RECONNECTION_TIMEOUT = 1000L;
    private final AuthenticationService authenticationService;
    private final PocketRepository pocketRepository;

    public SseEmitter subscribe() {

        Member member = authenticationService.getMemberByAuthentication();
        String memberId = member.getMemberId().toString();

        SseEmitter emitter = createEmitter();
        //연결 세션 timeout 이벤트 핸들러 등록
        emitter.onTimeout(() -> {
            log.info("server sent event timed out : id={}", memberId);
            //onCompletion 핸들러 호출
            emitter.complete();
        });

        //에러 핸들러 등록
        emitter.onError(e -> {
            log.info("server sent event error occurred : id={}, message={}", memberId, e.getMessage());
            //onCompletion 핸들러 호출
            emitter.complete();
        });

        //SSE complete 핸들러 등록
        emitter.onCompletion(() -> {
            if (emitterMap.remove(memberId) != null) {
                log.info("server sent event removed in emitter cache: id={}", memberId);
            }

            log.info("disconnected by completed server sent event: id={}", memberId);
        });

        emitterMap.put(memberId, emitter);

        //초기 연결시에 응답 데이터를 전송할 수도 있다.
        try {
            SseEmitter.SseEventBuilder event = SseEmitter.event()
                    //event 명 (event: event example)
                    .name("event example")
                    //event id (id: id-1) - 재연결시 클라이언트에서 `Last-Event-ID` 헤더에 마지막 event id 를 설정
                    .id(String.valueOf("id-1"))
                    //event data payload (data: SSE connected)
                    .data("SSE connected")
                    //SSE 연결이 끊어진 경우 재접속 하기까지 대기 시간 (retry: <RECONNECTION_TIMEOUT>)
                    .reconnectTime(RECONNECTION_TIMEOUT);
            emitter.send(event);
        } catch (IOException e) {
            log.error("failure send media position data, id={}, {}", memberId, e.getMessage());
        }
        return emitter;
    }

    public void broadcast(EventPayload eventPayload) {
        emitterMap.forEach((id, emitter) -> {
            try {
                emitter.send(SseEmitter.event()
                        .name("broadcast event")
                        .id("broadcast event 1")
                        .reconnectTime(RECONNECTION_TIMEOUT)
                        .data(eventPayload, MediaType.APPLICATION_JSON));
                log.info("sended notification, id={}, payload={}", id, eventPayload);
            } catch (IOException e) {
                //SSE 세션이 이미 해제된 경우
                log.error("fail to send emitter id={}, {}", id, e.getMessage());
            }
        });
    }

    public void shareSystemTime(SseDateDto sseDateDto) {
        emitterMap.forEach((id, emitter) -> {
            try {
                emitter.send(SseEmitter.event()
                        .name("date")
                        .id("date")
                        .reconnectTime(RECONNECTION_TIMEOUT)
                        .data(sseDateDto, MediaType.APPLICATION_JSON));
                log.info("sended notification, member_id={}, systemDate={}", id, sseDateDto);
            } catch (IOException e) {
                //SSE 세션이 이미 해제된 경우
                log.error("fail to send emitter member_id={}, {}", id, e.getMessage());
            }
        });
    }

    public void updatePocketStatement(Long pocketId) {

        Pocket pocket = pocketRepository.findById(pocketId)
                .orElseThrow(() -> new PocketException(ErrorCode.POCKET_NOT_FOUND));
        Member member = pocket.getMember();
        String targetMemberId = member.getMemberId().toString();
        PocketDto pocketDto = PocketDto.of(
                pocket.getPocketId(),
                pocket.isActivated(),
                pocket.isPaid(),
                pocket.isDeposited(),
                pocket.getExpectedDate(),
                pocket.getTarget()
        );
        SsePocketDto ssePocketDto = new SsePocketDto(pocketDto);

        SseEmitter emitter = emitterMap.get(targetMemberId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .name("pocket")
                        .id("pocket")
                        .reconnectTime(RECONNECTION_TIMEOUT)
                        .data(ssePocketDto, MediaType.APPLICATION_JSON));
                log.info("sended notification to memberId={}, pocket={}", targetMemberId, ssePocketDto);
            } catch (IOException e) {
                // SSE 세션이 이미 해제된 경우
                log.error("fail to send to memberId={}, {}", targetMemberId, e.getMessage());
            }
        } else {
            log.warn("No emitter found for memberId={}", targetMemberId);
        }

    }

    private SseEmitter createEmitter() {
        return new SseEmitter(TIMEOUT);
    }
}