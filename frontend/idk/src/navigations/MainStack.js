import * as React from 'react';
import Main from '../screens/Main/Main'
import { CheckSendMoneyInfo, EnterAccount, FinishSendMoney,EnterMoney } from '../screens/Main/SendMoney';
import { RegistAutoSendContent,RegistAutoSendFinish,RegistGoalSaving, RegistAutoSendAgree, RegistSubscribe,RegistSavingBox } from '../screens/Main/Registrations';
import TransactionList from '../screens/Main/DetailMyaccount/TransactionList';

import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
      <Stack.Navigator screenOptions={{headerTransparent: true,}}>
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="EnterAccount" component={EnterAccount} options={{ headerShown: true, title:"" }} />
        <Stack.Screen name="EnterMoney" component={EnterMoney} options={{ headerShown: true, title:"" }} />
        <Stack.Screen name="CheckSendMoneyInfo" component={CheckSendMoneyInfo} options={{ headerShown: true, title:"" }} />
        <Stack.Screen name="FinishSendMoney" component={FinishSendMoney} options={{ headerShown: false }} />
        <Stack.Screen name="TransactionList" component={TransactionList} options={{ headerShown: false }} />
        <Stack.Screen name="RegistGoalSaving" component={RegistGoalSaving} options={{ headerShown: true, title:"" }} />
        <Stack.Screen name="RegistSubscribe" component={RegistSubscribe} options={{ headerShown: true, title:"" }} />
        <Stack.Screen name="RegistSavingBox" component={RegistSavingBox} options={{ headerShown: true, title:"" }} />
        <Stack.Screen name="RegistAutoSendAgree" component={RegistAutoSendAgree} options={{ headerShown: true, title:"" }} />
        <Stack.Screen name="RegistAutoSendContent" component={RegistAutoSendContent} options={{ headerShown: true, title:"" }} />
        <Stack.Screen name="RegistAutoSendFinish" component={RegistAutoSendFinish} options={{ headerShown: true, title:"" }} />
      </Stack.Navigator>
  );
}

export default MainStack;