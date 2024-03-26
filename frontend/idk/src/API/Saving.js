import LocalAxios from "./LocalAxios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from "react";

const local = LocalAxios()


// 저금통 가입
export const joinPiggyBankListAxios = async function (data, success, fail) {
  await local.post('/piggy-bank', data)
        .then(success)
        .catch(fail)
};

// 저금통 조회
export const getPiggyBankAxios = async function (success, fail) {
  await local.get('/piggy-bank')
        .then(success)
        .catch(fail)
};

// 저금통 상세 조회
export const getPiggyBankDetailAxios = async function (piggyBankId, success, fail) {
  await local.get(`/piggy-bank/${piggyBankId}`)
        .then(success)
        .catch(fail)
};


// 저금통 해지
export const deletePiggyBankAxios = async function (piggyBankId, success, fail) {
  await local.delete(`/piggy-bank/${piggyBankId}`)
        .then(success)
        .catch(fail)
};


// 저금통 출금
export const withdrawPiggyBankAxios = async function (piggyBankId, data, success, fail) {
  await local.patch(`/piggy-bank/${piggyBankId}/withdrawal`, data)
        .then(success)
        .catch(fail)
};

// 저금통 입금
export const depositPiggyBankAxios = async function (piggyBankId, data, success, fail) {
  await local.patch(`/piggy-bank/${piggyBankId}/deposit`, data)
        .then(success)
        .catch(fail)
};

