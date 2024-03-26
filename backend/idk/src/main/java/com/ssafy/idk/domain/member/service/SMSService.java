package com.ssafy.idk.domain.member.service;

import com.ssafy.idk.domain.member.exception.MemberException;
import com.ssafy.idk.global.error.ErrorCode;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class SMSService {

    @Value("${spring.sms.apiKey}")
    private String apiKey;

    @Value("${spring.sms.apiSecret}")
    private String apiSecret;

    @Value("${spring.sms.from}")
    private String from;

    private DefaultMessageService messageService;

    @PostConstruct
    public void initializeMessageService() {
        this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
    }

    // sms 발송 요청
    public void sendSMS(String to, String text) throws Exception {

        Message message = new Message();
        message.setFrom(from);
        message.setTo(to);
        message.setText(text);

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));

        if (response.getStatusCode().equals("2000")) {
            return;
        } else {
            throw new MemberException(ErrorCode.MEMBER_SMS_SEND_FAILED);
        }
    }
}
