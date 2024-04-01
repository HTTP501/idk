import LocalAxios from "./LocalAxios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import * as Notifications from 'expo-notifications';
const local = LocalAxios();

const expoPushToken = await Notifications.getExpoPushTokenAsync({
    projectId: 'idk',
   })

export const connectAlarm = async ()=>{
  console.log(expoPushToken)
  await fetch('https://fcm.googleapis.com/fcm/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `key=AAAA8fRysXM:APA91bFPE2ca83H8JaLv2XG3caztOU93hHhBZ-Gk7l9h7MUJpThZ5ZYEmWOpBa7Iwr5HtYX0uKw0Rnh36Bzl31dU8sE_xtZ6YzOeYA85ZIWDYuhnCDvXPhPXduwsMixzwTLXv5WYFrVT`,
  },
  body: JSON.stringify({
    to: expoPushToken,
    priority: 'normal',
    data: {
      experienceId: '@yourExpoUsername/yourProjectSlug',
      scopeKey: '@yourExpoUsername/yourProjectSlug',
      title: "📧 You've got mail",
      message: 'Hello world! 🌐',
    },
  }),
});
}

// 토큰 갱신
export const postNewToken = async function (data,success, fail) {
  await local.post(`/fcm/token`,data).then(success).catch(fail);
};
// 토큰 삭제
export const deleteToken = async function (success, fail) {
  await local.delete(`/fcm/token`).then(success).catch(fail);
};

