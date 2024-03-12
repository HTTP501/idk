
import * as React from 'react';
import { Text, View } from 'react-native';
import MainStack from './MainStack'
import ChartStack from './ChartStack'
import SettingStack from './SettingStack'
import PaymentStack from './PaymentStack'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="MainStack" component={MainStack} options={{ headerShown: false }} />
        <Tab.Screen name="ChartStack" component={ChartStack} options={{ headerShown: false }} />
        <Tab.Screen name="SettingStack" component={SettingStack} options={{ headerShown: false }} />
        <Tab.Screen name="PaymentStack" component={PaymentStack} options={{ headerShown: false }} />
      </Tab.Navigator>
  );
}

