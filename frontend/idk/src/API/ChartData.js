import LocalAxios from "./LocalAxios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";

const local = LocalAxios();

// 바 차트 데이터 호출
export const callAnalystDataAxios = async function (category, success, fail) {
  await local.get(`/analyst/${category}`).then(success).catch(fail);
};

// 도넛 차트 데이터 호출
export const callAnalystMonthDataAxios = async function (
  year,
  month,
  success,
  fail
) {
  await local.get(`/analyst/${year}/${month}`).then(success).catch(fail);
};
