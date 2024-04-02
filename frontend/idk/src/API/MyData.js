import LocalAxios from "./LocalAxios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";

const local = LocalAxios();

// 마이데이터 인증 약관 동의
export const agreeMyDataAxios = async function (success, fail) {
  await local.post(`/idk/mydata/agree`).then(success).catch(fail);
};

// 마이데이터 자산 연결
export const connectMyDataAxios = async function (data, success, fail) {
  await local.post(`/idk/mydata/connect`, data).then(success).catch(fail);
};

// 마이데이터 자산 조회
export const getMyDataAxios = async function (success, fail) {
  await local.get(`/idk/mydata`).then(success).catch(fail);
};
