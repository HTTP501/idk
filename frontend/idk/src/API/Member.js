import LocalAxios from "./LocalAxios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from "react";

const local = LocalAxios()

// 휴대폰 인증 요청
export const phoneAxios = async function (data, success, fail) {
  await local.post('/member/phone', data)
        .then(success)
        .catch(fail)
};


// 휴대폰 인증 확인 요청
export const phoneCodeAxios = async function (data, success, fail) {
  await local.post('/member/phone/code', data)
        .then(success)
        .catch(fail)
};

// 핀 로그인
export const loginPINAxios = async function (data, success, fail) {
  await local.post('/member/login/pin', data)
        .then(success)
        .catch(fail)
}

// 회원가입
export const signupAxios = async function (data, success, fail) {
  await local.post('/member/signup', data)
        .then(success)
        .catch(fail)
}

