import LocalAxios from "./LocalAxios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";

const local = LocalAxios();

// 바 차트 데이터 호출
export const callProductsDataAxios = async function (category, success, fail) {
  await local.get(`/shop/category/${category}`).then(success).catch(fail);
};

export const callProductsDetailDataAxios = async function (
  itemId,
  success,
  fail
) {
  await local.get(`/shop/${itemId}`).then(success).catch(fail);
};
