import * as React from 'react';
import { ChangeAccountName, ChangeAccountPW, ChangeLeatHoldMoney, ChangeSalaryDay, Settings } from '../screens/Settings'
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function SettingStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        <Stack.Screen name="ChangeAccountName" component={ChangeAccountName} options={{ headerShown: false }} />
        <Stack.Screen name="ChangeAccountPW" component={ChangeAccountPW} options={{ headerShown: false }} />
        <Stack.Screen name="ChangeLeatHoldMoney" component={ChangeLeatHoldMoney} options={{ headerShown: false }} />
        <Stack.Screen name="ChangeSalaryDay" component={ChangeSalaryDay} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

export default SettingStack;