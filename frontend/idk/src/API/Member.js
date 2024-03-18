import LocalAxios from "./LocalAxios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from "react";

const BASE_URL = "https://j10a501.p.ssafy.io/api/member";
const local = LocalAxios()

// 휴대폰 인증 요청
export const phoneAxios = async function (data) {
  local.post('/member/phone', data)
  .then(res => console.log(res))
  .catch(err => console.log(err))
};

// 이 아래는 옛날 것들

// 휴대폰 인증 확인 요청
export const phoneCodeAxios = async function (data = null) {
  return LocalAxios({
    method: 'post',
    url: `${BASE_URL}/phone/code`,
    data: data,
  });
};

// 핀 로그인
export const loginPINAxios = async function (data = null) {
  return LocalAxios({
    method: 'post',
    url: `${BASE_URL}/login/pin`,
    data: data,
  });
}

// 회원가입
export const signupAxios = async function (data = null) {
  return LocalAxios({
    method: 'post',
    url: `${BASE_URL}/login/pin`,
    data: data,
  });
}

