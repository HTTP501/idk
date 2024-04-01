package com.ssafy.bank.util;

import com.ssafy.bank.entity.Account;
import com.ssafy.bank.entity.Bank;
import com.ssafy.bank.entity.Member;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

public class BankUtil {

    // 계좌 번호를 랜덤 생성하는 메서드
    public static String generateAccountNumber() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();

        sb.append("501"); // 은행 식별 번호
        sb.append("10"); // 계좌 유형 번호 (10은 예금)

        // 고객 계좌 식별 번호 (랜덤 생성)
        for (int i = 0; i < 6; i++) {
            sb.append(random.nextInt(10));
        }

        // 검증용 숫자 계산
        int[] weights = {2, 3, 4, 5, 6, 7, 8, 9, 2, 3};
        int sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += (sb.charAt(i) - '0') * weights[i];
        }
        int checksum = (11 - (sum % 11)) % 10;
        sb.append(checksum);
        return sb.toString();
    }

    // 잔고를 랜덤 생성하는 메서드
    public static Long generateBalance() {
        Random random = new Random();
        Long balance = random.nextLong(10000000L);
        return balance;
    }

    // 자동 이체 금액을 랜덤 생성하는 메서드
    public static Long generateAutoTransferAmount() {
        Random random = new Random();
        Long amount = random.nextLong(1000000L);
        return amount;
    }

    // 자동 이체 일정일을 랜덤 생성하는 메서드
    public static int generateAutoTransferScheduledDate() {
        Random random = new Random();
        int minDay = 1;
        int maxDay = 28;
        return random.nextInt(maxDay - minDay + 1) + minDay;
    }

    // 회원의 계좌 중 랜덤하게 하나 선택하는 메서드
    public static Account selectRandomAccount(List<Account> accounts) {
        Random random = new Random();
        return accounts.get(random.nextInt(accounts.size()));
    }

    // 임의의 은행을 선택하는 메서드
    public static Bank selectRandomBank(List<Bank> banks) {
        Random random = new Random();
        return banks.get(random.nextInt(banks.size()));
    }

    // 선택된 은행에 속하는 임의의 계좌를 선택하는 메서드
    public static Account selectRandomAccountInBank(Member member, List<Account> accounts) {

        // 선택된 은행에 속하는 계좌 목록 조회
        List<Account> nonMemberAccounts = accounts.stream()
                .filter(account -> !account.getBank().equals(member))
                .collect(Collectors.toList());

        // nonMemberAccounts가 비어 있는지 확인
        if (nonMemberAccounts.isEmpty()) {
            // 비어 있다면 예외 처리하거나 다른 방법으로 처리할 수 있음
            // 여기서는 null을 반환하도록 함
            return null;
        }

        // 랜덤하게 계좌 선택
        Random random = new Random();
        return nonMemberAccounts.get(random.nextInt(nonMemberAccounts.size()));
    }
}
