package com.ssafy.idk.domain.item.service;

import com.ssafy.idk.domain.account.domain.Account;
import com.ssafy.idk.domain.account.domain.Category;
import com.ssafy.idk.domain.account.domain.Transaction;
import com.ssafy.idk.domain.account.repository.TransactionRepository;
import com.ssafy.idk.domain.account.service.AccountService;
import com.ssafy.idk.domain.item.domain.Item;
import com.ssafy.idk.domain.item.dto.response.ItemResponseDto;
import com.ssafy.idk.domain.item.exception.ItemException;
import com.ssafy.idk.domain.item.repository.ItemRepository;
import com.ssafy.idk.domain.member.domain.Member;
import com.ssafy.idk.domain.member.repository.MemberRepository;
import com.ssafy.idk.domain.member.service.AuthenticationService;
import com.ssafy.idk.global.error.ErrorCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ItemService {

    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;
    private final AccountService accountService;
    private final TransactionRepository transactionRepository;
    private final AuthenticationService authenticationService;

    public List<ItemResponseDto> getItemListOfCategory(int category) {
        List<Item> itemList = itemRepository.findAllByCategory(category);

        if(itemList.isEmpty()) throw new ItemException(ErrorCode.ITEM_CATEGORY_NOT_FOUND);

        List<ItemResponseDto> itemResponseDtoList = new ArrayList<>();
        for(Item item : itemList) {
            itemResponseDtoList.add(ItemResponseDto.of(item.getItemId(), item.getShop(), item.getName(), item.getPrice()));
        }

        return itemResponseDtoList;
    }

    public ItemResponseDto getItem(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ItemException(ErrorCode.ITEM_NOT_FOUND));

        return ItemResponseDto.of(item.getItemId(), item.getShop(), item.getName(), item.getPrice());
    }

    @Transactional
    public boolean buyItem(Long itemId, Long accountType) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ItemException(ErrorCode.ITEM_NOT_FOUND));

        Member member = authenticationService.getMemberByAuthentication();

        if(accountType == 1) { // 결제 수단이 계좌인 경우
            Account account = accountService.withdraw(item.getPrice());
            Transaction transaction = Transaction.builder()
                    .category(Category.출금)
                    .content(item.getShop())
                    .amount(item.getPrice())
                    .balance(account.getBalance())
                    .createdAt(LocalDateTime.now())
                    .account(account)
                    .build();
            transactionRepository.save(transaction);
            return true;
        }
        return false;
    }
}
