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

import { useEffect } from "react";

const Stack = createNativeStackNavigator();
function App() {

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
