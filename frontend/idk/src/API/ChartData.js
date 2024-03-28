import LocalAxios from "./LocalAxios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";

const local = LocalAxios();

// 계좌 생성
export const callAnalystDataAxios = async function (category, success, fail) {
  await local.get(`/analyst/${category}`).then(success).catch(fail);
};
