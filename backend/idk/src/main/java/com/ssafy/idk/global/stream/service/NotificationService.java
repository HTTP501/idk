package com.ssafy.idk.global.stream.service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.HashSet;

import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.pocket.entity.Pocket;
import com.ssafy.idk.global.stream.dto.PocketDto;
import com.ssafy.idk.global.stream.repository.EmitterRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;
    private final EmitterRepository emitterRepository;

    public SseEmitter subscribe(Long accountId) {

        SseEmitter emitter = createEmitter(accountId);

        sendToClient(accountId, "EventScream Created.");
        System.out.println("subscribe userId = " + accountId);
        return emitter;
    }

    public void notify(Long userId, Object event)
    {
        sendToClient(userId, event);
    }

    public void sendToClient(Long id, Object Data)
    {
        SseEmitter emitter = emitterRepository.get(id);
        if(emitter != null)
        {
            try {
                emitter.send(SseEmitter.event()
                        .id(String.valueOf(id))
                        .name("sse")
                        .data(Data));
            }catch(IOException exp)
            {
                emitterRepository.deleteById(id);
                emitter.completeWithError(exp);
            }

        }
    }

    private SseEmitter createEmitter(Long id)
    {
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        emitterRepository.save(id, emitter);

        emitter.onCompletion(() -> emitterRepository.deleteById(id));
        emitter.onTimeout(() -> emitterRepository.deleteById(id));
        return emitter;
    }

    public void notifyDate(LocalDate systemDate) {

        emitterRepository.getEmitters().forEach((id, emitter) -> {
            if(emitter != null)
            {
                try {
                    emitter.send(SseEmitter.event()
                            .id(String.valueOf(id))
                            .name("date")
                            .data(systemDate));

                    System.out.println("send to userId systemDate = " + id);
                }catch(IOException exp)
                {
                    emitterRepository.deleteById(id);
                    emitter.completeWithError(exp);
                }

            }
        });
    }

    public void notifyUpdatedPocket(Pocket pocket) {

        Member member = pocket.getMember();
        PocketDto pocketDto = PocketDto.of(
                pocket.getPocketId(),
                pocket.isActivated(),
                pocket.isPaid(),
                pocket.isDeposited(),
                pocket.getExpectedDate(),
                pocket.getTarget()
        );

        emitterRepository.getEmittersById(member.getMemberId()).forEach((id, emitter) -> {
            if(emitter != null)
            {
                try {
                    emitter.send(SseEmitter.event()
                            .id(String.valueOf(id))
                            .name("pocket").data(pocketDto));
                }catch(IOException exp)
                {
                    emitterRepository.deleteById(id);
                    emitter.completeWithError(exp);
                }

                System.out.println("send to userId systemDate = " + id);
            }
        });
    }

    public void notifyToMembers(HashSet<Long> members) {

        for (Long memberId : members) {

            if (memberId == null) continue;

            SseEmitter emitter = emitterRepository.get(memberId);

            if(emitter != null)
            {
                try {
                    emitter.send(SseEmitter.event()
                            .id(String.valueOf(memberId))
                            .name("update").data("needToMainUpdate!"));

                    System.out.println("send to userId = " + memberId);
                }catch(IOException exp)
                {
                    emitterRepository.deleteById(memberId);
                    emitter.completeWithError(exp);
                }
            }

        }
    }
}