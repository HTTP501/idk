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
// 계좌 조회
export const getAccountTransactionAxios = async function (success, fail) {
  await local.get("/transaction/").then(success).catch(fail);
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
