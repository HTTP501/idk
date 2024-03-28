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


// 생체인증 로그인
export const loginBioAxios = async function (data, success, fail) {
  await local.post('/member/login/bio', data)
        .then(success)
        .catch(fail)
}

// 회원가입
export const signupAxios = async function (data, success, fail) {
  await local.post('/member/signup', data)
        .then(success)
        .catch(fail)
}

// 회원 정보 조회
export const memberAxios = async function (success, fail) {
  await local.get('/member/push')
        .then(success)
        .catch(fail)
}

// 자동이체 알림 설정
export const autoTransferAxios = async function (success, fail) {
  await local.put('/member/push/auto-transfer')
        .then(success)
        .catch(fail)
}

// 입출금 알림 설정
export const transactionAxios = async function (success, fail) {
  await local.put('/member/push/transaction')
        .then(success)
        .catch(fail)
}

