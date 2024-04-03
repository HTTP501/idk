package com.ssafy.bank.service;

import com.ssafy.bank.dto.request.AuthenticationRequestDto;
import com.ssafy.bank.dto.request.CreateDataRequestDto;
import com.ssafy.bank.dto.response.*;
import com.ssafy.bank.entity.*;
import com.ssafy.bank.exception.BankException;
import com.ssafy.bank.global.error.ErrorCode;
import com.ssafy.bank.jwt.JwtTokenProvider;
import com.ssafy.bank.repository.*;
import com.ssafy.bank.util.BankUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BankService {

    private final MemberRepository memberRepository;
    private final BankRepository bankRepository;
    private final AccountRepository accountRepository;
    private final AutoTransferRepository autoTransferRepository;
    private final OrganizationRepository organizationRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final ClientService clientService;
    private final OrganizationMemberRepository organizationMemberRepository;
    private static final Logger LOGGER = Logger.getLogger(BankService.class.getName());

    // 회원 가입
    @Transactional
    public void signup(CreateDataRequestDto requestDto) {

        // 회원 중복 체크
        Optional<Member> optionalMember = memberRepository.findByConnectionInformation(requestDto.getConnectionInformation());
        if (optionalMember.isPresent()) {
            throw new BankException(ErrorCode.BANK_MEMBER_DUPLICATED);
        }

        // 회원 생성
        Member member = Member.builder()
                .name(requestDto.getName())
                .birthDate(requestDto.getBirthDate())
                .phoneNumber(requestDto.getPhoneNumber())
                .connectionInformation(requestDto.getConnectionInformation())
                .build();

        // 회원 저장
        memberRepository.save(member);
    }

    // 계좌 생성
    @Transactional
    public void createAccount(Member member) {

        // 모든 은행 정보를 가져옴
        List<Bank> banks = bankRepository.findAll();

        // IDK 은행을 제외한 은행 리스트 생성
        List<Bank> filteredBanks = banks.stream()
                .filter(bank -> !bank.getName().equals("IDK은행"))
                .collect(Collectors.toList());

        // 랜덤하게 은행 선택
        Random random = new Random();
        Bank selectedBank = filteredBanks.get(random.nextInt(filteredBanks.size()));

        // 중복되지 않는 계좌번호 생성
        String accountNumber;
        do {
            accountNumber = BankUtil.generateAccountNumber(selectedBank);
        } while (accountRepository.existsByAccountNumber(accountNumber));

        // 임의로 선택된 은행을 사용하여 계좌 생성
        Account account = Account.builder()
                .balance(BankUtil.generateBalance())
                .accountNumber(accountNumber)
                .member(member)
                .bank(selectedBank)
                .build();

        // 생성된 계좌를 저장
        accountRepository.save(account);
    }

    // 계좌 자동이체 생성
    @Transactional
    public void createAutoTransfer(Member member) {

        // 회원의 모든 계좌 정보 가져옴
        List<Account> memberAccounts = accountRepository.findByMember(member);

        // 랜덤하게 하나의 회원 계좌 선택
        Account sourceAccount = BankUtil.selectRandomAccount(memberAccounts);

        // 모든 계좌 목록
        List<Account> targetAccounts = accountRepository.findAll();

        // 자동 이체 대상 계좌 선택 (회원의 계좌와 다른 계좌로 선택)
        Account targetAccount = BankUtil.selectRandomAccountInBank(member, targetAccounts);

        // 자동 이체 대상 계좌가 없는 경우 예외 처리
        if (targetAccount == null) {
            LOGGER.info("자동이체 대상 계좌가 없습니다.");
            throw new BankException(ErrorCode.BANK_TARGET_ACCOUNT);
        }

        // 자동이체 엔티티 생성
        AutoTransfer autoTransfer = AutoTransfer.builder()
                .amount(BankUtil.generateAutoTransferAmount())
                .designatedAccountNumber(targetAccount.getAccountNumber())
                .createdAt(LocalDateTime.now())
                .scheduledDate(BankUtil.generateAutoTransferScheduledDate())
                .account(sourceAccount)
                .organization(targetAccount.getBank().getOrganization())
                .build();

        // 생성된 자동이체 엔티티를 저장
        autoTransferRepository.save(autoTransfer);
    }

    // 계좌 목록 조회
    public AccountInfoListResponseDto getAccountList(String name, String connectionInformation, String orgCode) {

        // 기관 조회
        Organization organization = organizationRepository.findByOrgCode(orgCode)
                .orElseThrow(() -> new BankException(ErrorCode.BANK_ORG_NOT_FOUND));

        // 은행 조회
        Bank bank = bankRepository.findByOrganization(organization)
                .orElseThrow(()-> new BankException(ErrorCode.BANK_NOT_FOUND));

        // 유저 조회
        Member member = memberRepository.findByConnectionInformation(connectionInformation)
                .orElseThrow(() -> new BankException(ErrorCode.BANK_MEMBER_NOT_FOUND));

        // 고객 이름 일치하는지 체크
        if (!member.getName().equals(name)) {
            throw new BankException(ErrorCode.BANK_MEMBER_INFO_MISMATCH_ERROR);
        }

        // 계좌 목록 조회
        List<Account> accountList = accountRepository.findByBankAndMember(bank, member);

        List<AccountInfoResponseDto> accountInfoList = new ArrayList<>();

        // 순회하면서 계좌번호 추출
        for (Account account : accountList) {
            AccountInfoResponseDto accountInfoResponseDto = AccountInfoResponseDto.of(account.getAccountNumber());
            accountInfoList.add(accountInfoResponseDto);
        }

        return AccountInfoListResponseDto.of(accountInfoList);
    }

    // 단일 계좌 상세 정보 조회 (계좌번호, 잔고, 이름, 은행)
    public AccountDetailsResponseDto getAccountDetails(String orgCode, String accountNumber) {

        // 계좌번호로 계좌 조회
        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new BankException(ErrorCode.BANK_ACCOUNT_NOT_FOUND));

        // 은행 일치하는지 체크
        Bank bank = account.getBank();
        String bankOrgCode = bank.getOrganization().getOrgCode();
        if (!bankOrgCode.equals(orgCode)) {
            throw new BankException(ErrorCode.BANK_INFO_MISMATCH_ERROR);
        }

        // 은행 이름, 기관 코드, 계좌주 이름, 계좌번호, 잔고
        String bankName = bank.getName();
        String memberName = account.getMember().getName();
        Long balance = account.getBalance();

        return AccountDetailsResponseDto.of(bankName, orgCode, memberName, account.getAccountNumber(), balance);
    }

    // 고객의 자동이체 목록, 상세정보 조회
    public AutoTransferInfoListResponseDto getAutoTransferInfo(Member member, String orgCode) {

        Organization organization = organizationRepository.findByOrgCode(orgCode)
                .orElseThrow(() -> new BankException(ErrorCode.BANK_ORG_NOT_FOUND));

        Optional<OrganizationMember> existingOrganizationMemberOpt = organizationMemberRepository.findByOrganizationAndMember(organization, member);
        if (existingOrganizationMemberOpt.isPresent()) {

            Bank bank = bankRepository.findByOrganization(organization)
                    .orElseThrow(() -> new BankException(ErrorCode.BANK_NOT_FOUND));

            System.out.println("orgCode = " + orgCode);

            // 회원의 요청 은행 계좌 목록 조회
            List<Account> accountList = accountRepository.findByBankAndMember(bank, member);

            // 계좌의 모든 자동이체 목록을 가져옴
            List<AutoTransferInfoResponseDto> autoTransferInfoList = new ArrayList<>();
            for (Account account : accountList) {
                List<AutoTransfer> autoTransfers = autoTransferRepository.findByAccount(account);
                for (AutoTransfer autoTransfer : autoTransfers) {
                    autoTransferInfoList.add(AutoTransferInfoResponseDto.of(
                            autoTransfer.getAccount().getBank().getName(),
                            autoTransfer.getAccount().getBank().getOrganization().getOrgCode(),
                            autoTransfer.getAccount().getAccountNumber(),
                            autoTransfer.getAmount(),
                            autoTransfer.getScheduledDate(),
                            autoTransfer.getDesignatedAccountNumber(),
                            autoTransfer.getOrganization().getOrgName(),
                            autoTransfer.getOrganization().getOrgCode()
                    ));
                }
            }
            return AutoTransferInfoListResponseDto.of(autoTransferInfoList);
        } else {
            List<AutoTransferInfoResponseDto> autoTransferInfoList = new ArrayList<>();
            return AutoTransferInfoListResponseDto.of(autoTransferInfoList);
        }
    }

    // 통합 인증 요청
    @Transactional
    public AuthenticationResponseDto authentication(AuthenticationRequestDto requestDto) {

        // ci 일치하는 고객 있는지 체크
        Member member = memberRepository.findByConnectionInformation(requestDto.getConnectionInformation())
                .orElseThrow(() -> new BankException(ErrorCode.BANK_MEMBER_NOT_FOUND));

        // 기관 체크
        Organization organization = organizationRepository.findByOrgCode(requestDto.getReceiverOrgCode())
                .orElseThrow(() -> new BankException(ErrorCode.BANK_ORG_NOT_FOUND));

        // MYDATA(종합포털)에 마이데이터 사업자 권한 검증 요청
        if (!clientService.verifyAuthority(requestDto.getClientId(), requestDto.getClientSecret(), requestDto.getReceiverOrgCode())) {
            throw new BankException(ErrorCode.BANK_ORG_AUTHENTICATION_FAILED);
        }

        Map<String, String> consentInfo = new HashMap<>();
        consentInfo.put("orgCode", organization.getOrgCode());
        consentInfo.put("orgName", organization.getOrgName());
        consentInfo.put("orgType", organization.getOrgType().name());

        // CA(인증기관) 서버에 전자서명 검증 요청
        if (!clientService.verifySignature(member.getName(), member.getPhoneNumber(), member.getConnectionInformation(), requestDto.getConsent(), requestDto.getSignedConsent())) {
            throw new BankException(ErrorCode.BANK_SIGNALUTE_INVALID);
        }

        // 검증 완료 되면 토큰 발급
        String accessToken = jwtTokenProvider.createToken(requestDto.getReceiverOrgCode(), requestDto.getConnectionInformation(), requestDto.getProviderOrgCode());

        // 토큰 저장
        Organization organization1 = organizationRepository.findByOrgCode(requestDto.getProviderOrgCode())
                .orElseThrow(() -> new BankException(ErrorCode.BANK_ORG_NOT_FOUND));

        Optional<OrganizationMember> existingOrganizationMemberOpt = organizationMemberRepository.findByOrganizationAndMember(organization1, member);
        if (existingOrganizationMemberOpt.isPresent()) {
            OrganizationMember existingOrganizationMember = existingOrganizationMemberOpt.get();
            existingOrganizationMember.updateAccessToken(accessToken);
        } else {
            OrganizationMember newOrganizationMember = OrganizationMember.builder()
                    .member(member)
                    .organization(organization1)
                    .accessToken(accessToken)
                    .build();
            organizationMemberRepository.save(newOrganizationMember); // 새로운 정보 저장
        }

        System.out.println("accessToken = " + accessToken);

        return AuthenticationResponseDto.of(accessToken);
    }

    // 계좌 명의 조회
    public AccountOwnerResponseDto getAccountInfo(String orgName, String accountNumber) {

        Bank bank = bankRepository.findByName(orgName)
                .orElseThrow(() -> new BankException(ErrorCode.BANK_NOT_FOUND));

        Account account = accountRepository.findByBankAndAccountNumber(bank, accountNumber)
                .orElseThrow(() -> new BankException(ErrorCode.BANK_ACCOUNT_NOT_FOUND));

        return AccountOwnerResponseDto.of(account.getMember().getName());
    }

    // 마이데이터 연결 은행 계좌 목록 조회
//    private List<Account> getConnectedAccounts(Member member) {
//        List<Account> allAccounts = accountRepository.findByMember(member);
//
//        // 연결 은행만 계좌 선택
//        List<Account> connectedAccountList = new ArrayList<>();
//        for (Account account : allAccounts) {
//            String accessToken = account.getBank().getOrganization().getAccessToken();
//            LOGGER.info("accessToken = " + accessToken);
//            if (accessToken != null) {
//                connectedAccountList.add(account);
//            }
//        }
//        return connectedAccountList;
//    }


}
