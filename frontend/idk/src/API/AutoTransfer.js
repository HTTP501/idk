import LocalAxios from "./LocalAxios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from "react";

const local = LocalAxios()


// 자동이체 전체 조회
export const getAutoTransferAxios = async function (accountId, success, fail) {
  await local.get(`/auto-transfer/list/${accountId}`)
        .then(success)
        .catch(fail)
};

// 자동이체 해지
export const deleteAutoTransferAxios = async function (autoTransferId, success, fail) {
  await local.delete(`/auto-transfer/${autoTransferId}`)
        .then(success)
        .catch(fail)
};


// 자동이체 상세 조회
export const getDetailAutoTransferAxios = async function (autoTransferId, success, fail) {
  await local.get(`/auto-transfer/${autoTransferId}`)
        .then(success)
        .catch(fail)
};
// 자동이체 등록
export const registAutoTransferAxios = async function (data, success, fail) {
  await local.post('/auto-transfer', data)
        .then(success)
        .catch(fail)
};



