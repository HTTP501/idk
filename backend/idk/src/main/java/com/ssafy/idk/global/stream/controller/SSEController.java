package com.ssafy.idk.global.stream.controller;

import com.ssafy.idk.global.stream.dto.EventPayload;
import com.ssafy.idk.global.stream.service.SseEmitterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Slf4j
public class SSEController {

    private final SseEmitterService sseEmitterService;

    @GetMapping(value = "/sse/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> subscribe() {
//        String sseId = UUID.randomUUID().toString();
        SseEmitter emitter = sseEmitterService.subscribe();
        return ResponseEntity.ok(emitter);
    }

    //eventPayload 를 SSE 로 연결된 모든 클라이언트에게 broadcasting 한다.
    @PostMapping(path = "/sse/broadcast")
    public ResponseEntity<Void> broadcast(@RequestBody EventPayload eventPayload) {
        sseEmitterService.broadcast(eventPayload);
        return ResponseEntity.ok().build();
    }

}
