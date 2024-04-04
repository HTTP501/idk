import LocalAxios from "./LocalAxios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from "react";

const local = LocalAxios()


// 자동결제 전체 조회
export const getAutoDebitAxios = async function (data, success, fail) {
  await local.get('/auto-debit', data)
        .then(success)
        .catch(fail)
};



