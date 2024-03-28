import LocalAxios from "./LocalAxios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";

const local = LocalAxios();

// 바 차트 데이터 호출
export const payRequestAxios = async function (itemId, success, fail) {
  await local.post(`/payment/ready/${itemId}`).then(success).catch(fail);
};

export const approvalPayAxios = async function (data, success, fail) {
  await local.post(`/payment/approval`, data).then(success).catch(fail);
};
