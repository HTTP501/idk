package com.ssafy.idk.account.service;

import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.account.service.AccountService;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@AutoConfigureMockMvc
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ComponentScan(basePackages = "com.ssafy.idk")
public class AccountServiceTest {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    AccountService accountService;

    Member member;

    @Test
    void 동시성_테스트() throws Exception {
        // given

        member = memberRepository.findById(5L).get();

        // when
        ExecutorService executor = Executors.newFixedThreadPool(10);
        CountDownLatch latch = new CountDownLatch(10);

        for (int i = 0; i < 10; i++) {
            executor.execute(() -> {
                try {
                    accountService.withdraw(member.getMemberId(), 5000L);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                latch.countDown();
            });
        }
        latch.await();

        // then
        Assertions.assertThat(accountRepository.findByMember(member).get().getBalance()).isEqualTo(50_000L);

    }
}
