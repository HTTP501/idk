import LocalAxios from "./LocalAxios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from "react";

const local = LocalAxios()

// 계좌 생성
export const createAccountAxios = async function (data, success, fail) {
  await local.post('/account/', data)
        .then(success)
        .catch(fail)
};

