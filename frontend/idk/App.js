import MainApp from "./src/MainApp";
import * as React from "react";
import SignupStack from "./src/navigations/SignupStack";
import AuthStack from "./src/navigations/AuthStack";
import { navigationRef } from "./src/navigations/AppNavigation";
import AccountStack from "./src/navigations/AccountStack";
import Tab from "./src/navigations/Tab";
import LocalAxios from "./src/API/LocalAxios";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// 알림관련
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import { useState, useEffect, useRef } from 'react';
// import { Platform } from 'react-native';
// import { postNewToken } from './src/API/Alarm';
const Stack = createNativeStackNavigator();
// const token = await Notifications.getExpoPushTokenAsync({
//   projectId: Constants.expoConfig.extra.eas.projectId,
// });

//  console.log(expoPushToken)
// // Expo 알림 처리기 설정
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,  // 알림을 표시할지 여부
//     shouldPlaySound: false,  // 소리 재생 여부
//     shouldSetBadge: false,   // 배지 설정 여부
//   }),
// });
function App() {
  // const [expoPushToken, setExpoPushToken] = useState('');
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();
  // useEffect(() => {
  //   connectAlarm();
  // }, []);
  //   registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  //   // 알림 수신 이벤트 리스너 등록
  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });

  //   // 알림 응답 이벤트 리스너 등록
  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     // 컴포넌트가 언마운트되면 리스너 제거
  //     Notifications.removeNotificationSubscription(notificationListener.current);
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="MainApp"
          component={MainApp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignupStack"
          component={SignupStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccountStack"
          component={AccountStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tab"
          component={Tab}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// // 푸시 알림 등록 함수
// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === 'android') {
//     // 안드로이드의 경우 알림 채널 설정
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],  // 진동 패턴
//       lightColor: '#FF231F7C',  // 라이트 색상
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');  // 푸시 알림을 위한 토큰 가져오기 실패
//       return;
//     }
//     // Expo 푸시 토큰 가져오기
//     token = (await Notifications.getExpoPushTokenAsync({ projectId: 'idk' })).data;
//     console.log(token);
//     postNewToken(token)
//   } else {
//     alert('Must use physical device for Push Notifications');  // 푸시 알림을 위해 실제 장치를 사용해야 함
//   }

//   return token;
// }

export default App;
