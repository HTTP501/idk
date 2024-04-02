import LocalAxios from "./LocalAxios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from "react";

const local = LocalAxios()


// 돈포켓 전체 조회
export const getPocketListAxios = async function (success, fail) {
  await local.get(`/pocket/list`)
        .then(success)
        .catch(fail)
};

// 돈포켓 상세 조회
export const getPocketAxios = async function (pocketId, success, fail) {
  await local.get(`/pocket/${pocketId}`)
        .then(success)
        .catch(fail)
};


// 돈포켓 자동이체 가입
export const joinDonPocketAutoTransferAxios = async function (data, success, fail) {
  await local.post('/pocket/auto-transfer', data)
        .then(success)
        .catch(fail)
};

// 돈포켓 자동이체 해지
export const deleteDonPocketAutoTransferAxios = async function (pocketId, success, fail) {
  await local.delete(`/pocket/auto-transfer/${pocketId}`)
        .then(success)
        .catch(fail)
};

// 돈포켓 이름 수정
export const changeDonPocketNameAxios = async function (pocketId, data, success, fail) {
  await local.patch(`/pocket/${pocketId}/name`, data)
        .then(success)
        .catch(fail)
};

// 돈포켓 자동넣기 수정
export const changeDonPocketActivateAxios = async function (pocketId, success, fail) {
  await local.patch(`/pocket/${pocketId}/is-activated`)
        .then(success)
        .catch(fail)
};

// 돈포켓 입금
export const depositDonPocketAxios = async function (pocketId, success, fail) {
  await local.patch(`/pocket/${pocketId}/deposit`)
        .then(success)
        .catch(fail)
};

// 돈포켓 출금
export const withdrawalDonPocketAxios = async function (pocketId, success, fail) {
  await local.patch(`/pocket/${pocketId}/withdrawal`)
        .then(success)
        .catch(fail)
};

