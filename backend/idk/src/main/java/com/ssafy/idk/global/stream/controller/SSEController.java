package com.ssafy.idk.global.stream.controller;

import com.ssafy.idk.global.stream.service.NotificationService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;

@RestController
@RequestMapping("/api/sse")
@RequiredArgsConstructor
public class SSEController {
    private final NotificationService notificationService;

    @GetMapping(value="/sub/{accountId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@PathVariable Long accountId, HttpServletResponse response) {

        response.setHeader("Connection", "keep-alive");
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("X-Accel-Buffering", "no");

        return notificationService.subscribe(accountId);
    }

    @PostMapping("/send-data/{id}")
    public void sendData(@PathVariable Long id) {

        notificationService.notify(id, "data");
    }

    public void sendUpdatedDate(LocalDate systemDate) {
        notificationService.notifyDate(systemDate);
    }

    public void sendToMemberUpdated(HashSet<Long> members) {
        notificationService.notifyToMembers(members);
    }
}