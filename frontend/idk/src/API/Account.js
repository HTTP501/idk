import LocalAxios from "./LocalAxios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";

const local = LocalAxios();

// 계좌 생성
export const createAccountAxios = async function (data, success, fail) {
  await local.post("/account/", data).then(success).catch(fail);
};

// 계좌 조회
export const getAccountAxios = async function (success, fail) {
  await local.get("/account/").then(success).catch(fail);
};

// 계좌비밀번호 확인
export const passwordAxios = async function (data, success, fail) {
  await local.post('/account/pwd', data)
        .then(success)
        .catch(fail)
}
// 계좌 해지
export const deleteAccountAxios = async function (success, fail) {
  await local.delete("/account/").then(success).catch(fail);
};

// 이체내역 조회
export const getAccountTransactionAxios = async function (success, fail) {
  await local.get("/transaction/").then(success).catch(fail);
};

// 이체
export const DepositOtherAccountAxios = async function (data, success, fail) {
  console.log("12ywufauihflaiwenflsajn",data)
  await local.post("/account/transfer", data).then(success).catch(fail);
};

// 이체 사용자 조회
export const getUserAccountAxios = async function (data, success, fail) {
  await local.post("/account/transfer/ready", data).then(success).catch(fail);
};


// 계좌 입금
export const DepositMyAccountAxios = async function (data, success, fail) {
  await local.post("/transaction/deposit", data).then(success).catch(fail);
};



// 계좌 출금
export const WithdrawMyAccountAxios = async function (data, success, fail) {
  await local.post("/transaction/withdraw", data).then(success).catch(fail);
};

// 계좌 이름 변경
export const ChangeAccountNameAxios = async function (data, success, fail) {
  await local
    .put("/account/name", data)
    .then(success)
    .catch(fail);
};
// 계좌 비밀번호 변경
export const ChangeAccountPasswordAxios = async function (data, success, fail) {
  await local.put("/account/pwd", data).then(success).catch(fail);
};

// 계좌 비밀번호 검증
export const CheckAccountPasswordAxios = async function (data, success, fail) {
  await local.post("/account/pwd", data).then(success).catch(fail);
};


// 최소보유금액 설정
export const settingMinumumAxios = async function (data, success, fail) {
  await local.put("/account/minimum", data).then(success).catch(fail);
};

// 월급일 설정
export const settingIncomeDayAxios = async function (data, success, fail) {
  await local.put(`/account/income-day/${data}`).then(success).catch(fail);
};

