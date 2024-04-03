package com.ssafy.idk.global.stream.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class EmitterRepository {

    private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();

    public void save(Long id, SseEmitter emitter)
    {
        emitters.put(id, emitter);
    }

    public void deleteById(Long id)
    {
        emitters.remove(id);
    }

    public SseEmitter get(Long id)
    {
        return emitters.get(id);
    }

    public Map<Long, SseEmitter> getEmitters() {
        return emitters;
    }

    public Map<Long, SseEmitter> getEmittersById(Long memberId) {
        Map<Long, SseEmitter> newEmitters = new ConcurrentHashMap<>();

        getEmitters().forEach((id, emitters) -> {
            if (Objects.equals(id, memberId)) newEmitters.put(id, emitters);
        });

        return newEmitters;
    }

}