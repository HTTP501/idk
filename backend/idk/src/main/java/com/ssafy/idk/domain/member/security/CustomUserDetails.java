package com.ssafy.idk.domain.member.security;

import com.ssafy.idk.domain.member.domain.Member;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Getter
public class CustomUserDetails implements UserDetails {

    private final Member member;


//    private String phoneNumber;
//    private String pin;
//    private Collection<? extends GrantedAuthority> authorities;

    // pin 로그인 생성자
    public CustomUserDetails( Member member) {
        this.member = member;
        System.out.println("CustomUserDeatails 생성자");
//        this.phoneNumber = member.getPhoneNumber();
//        this.pin = member.getPin();
//        this.authorities = Collections.emptyList();
    }

//    public CustomUserDetails(String phoneNumber, Collection<? extends GrantedAuthority> authorities) {
//        this.phoneNumber = phoneNumber;
//        this.authorities = authorities;
//    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return member.getPin();
    }

    @Override
    public String getUsername() {
        return member.getPhoneNumber();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
