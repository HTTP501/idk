import LocalAxios from "./LocalAxios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import * as Notifications from 'expo-notifications';
const local = LocalAxios();

const expoPushToken = await Notifications.getExpoPushTokenAsync({
    projectId: 'your-project-id',
   })
// 토큰 갱신
export const postNewToken = async function (data,success, fail) {
  await local.post(`/fcm/token`).then(success).catch(fail);
};
// 토큰 삭제
export const deleteToken = async function (success, fail) {
  await local.delete(`/fcm/token`).then(success).catch(fail);
};

