import LocalAxios from "./LocalAxios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from "react";

const local = LocalAxios()

// 목표저축 가입
export const joinTargetSavingAxios = async function (data, success, fail) {
  await local.post('/target-saving', data)
        .then(success)
        .catch(fail)
};


