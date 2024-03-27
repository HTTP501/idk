import LocalAxios from "./LocalAxios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from "react";

const local = LocalAxios()


// 돈포켓 전체 조회
export const getPocketListAxios = async function (data, success, fail) {
  await local.get('/pocket', data)
        .then(success)
        .catch(fail)
};

// 돈포켓 상세 조회
export const getPocketAxios = async function (pocketId, success, fail) {
  await local.get(`/pocket/${pocketId}`)
        .then(success)
        .catch(fail)
};


