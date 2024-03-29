package com.ssafy.idk.domain.shop.service;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.account.entity.Category;
import com.ssafy.idk.domain.account.entity.Transaction;
import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.account.repository.TransactionRepository;
import com.ssafy.idk.domain.account.service.AccountService;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.service.AuthenticationService;
import com.ssafy.idk.domain.shop.entity.Item;
import com.ssafy.idk.domain.shop.entity.OrderInfo;
import com.ssafy.idk.domain.shop.dto.request.ApprovalPaymentRequestDto;
import com.ssafy.idk.domain.shop.exception.ItemException;
import com.ssafy.idk.domain.shop.exception.PaymentException;
import com.ssafy.idk.domain.shop.repository.ItemRepository;
import com.ssafy.idk.global.error.ErrorCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final AuthenticationService authenticationService;
    private final AccountService accountService;
    private final ItemRepository itemRepository;
    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final RedisTemplate<String, OrderInfo> orderRedisTemplate;
    
    @Transactional
    public String readyPayment(Long itemId) {
        Member member = authenticationService.getMemberByAuthentication();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        // 결제수단 검증
        if(!accountService.accountNumberVerity(member.getMemberId()))
            throw new PaymentException(ErrorCode.PAYMENT_VERIFY_FAIL);

        // 잔액 확인
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ItemException(ErrorCode.ITEM_NOT_FOUND));
        if(account.getBalance() - account.getMinAmount() < item.getPrice())
            throw new PaymentException(ErrorCode.PAYMENT_BALANCE_FAIL);

        // redis에 임시 주문 정보 저장
        String orderId = generateOrderId();
        OrderInfo orderInfo = new OrderInfo(member.getMemberId(), itemId);
        orderRedisTemplate.opsForValue().set(orderId, orderInfo);
        orderRedisTemplate.expire(orderId, 5, TimeUnit.MINUTES);

        return orderId;
    }

    @Transactional
    public void approvalPayment(ApprovalPaymentRequestDto requestDto) {
        Member member = authenticationService.getMemberByAuthentication();

        // redis에서 임시 주문 정보 Read
        OrderInfo orderInfo = orderRedisTemplate.opsForValue().get(requestDto.getOrderId());

        if(orderInfo == null) throw new PaymentException(ErrorCode.PAYMENT_INFORMATION_NOT_FOUND);

        Item item = itemRepository.findById(orderInfo.getItemId())
                .orElseThrow(() -> new ItemException(ErrorCode.ITEM_NOT_FOUND));

        // 해당 정보를 통해 실제 결제한다.
        Account account = accountService.withdraw(member.getMemberId(), item.getPrice());
        Transaction transaction = Transaction.builder()
                .category(Category.출금)
                .content(item.getShop())
                .amount(item.getPrice())
                .balance(account.getBalance())
                .createdAt(LocalDateTime.now())
                .account(account)
                .build();
        transactionRepository.save(transaction);
    }

    public static String generateOrderId() {
        // 현재 시간을 yyyyMMddHHmmssSSS 형식으로 포맷팅
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS");
        String formattedDateTime = now.format(formatter);

        // UUID에서 '-' 제거하고 substring으로 10자리만 가져와서 orderId로 사용
        String uuid = UUID.randomUUID().toString().replace("-", "").substring(0, 10);

        // 현재 시간과 UUID를 조합하여 orderId 생성
        return formattedDateTime + uuid;
    }
}
