import * as React from 'react';
import Main from '../screens/Main/Main'
import { CheckSendMoneyInfo, EnterAccount, FinishSendMoney,EnterMoney } from '../screens/Main/SendMoney';


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
      </Stack.Navigator>
  );
}

export default MainStack;