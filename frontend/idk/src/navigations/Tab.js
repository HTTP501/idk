
import * as React from 'react';
import { Text, View, Image } from 'react-native';
import MainStack from './MainStack'
import ChartStack from './ChartStack'
import SettingStack from './SettingStack'
import PaymentStack from './PaymentStack'
import ATM from '../screens/ATM/Atm';
import theme from '../style'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <Tab.Navigator screenOptions={{
        tabBarStyle: { height: 55},
      }}>
        <Tab.Screen name="MainStack" component={MainStack} options={{ headerShown: false, tabBarLabel: ({ focused }) => <Text style={{ marginBottom:5 ,fontSize: 10, color: focused ? theme['sky-basic'] : theme.grey}} >계좌</Text> , tabBarIcon: ({ focused }) => <Feather name="home" size={24} color={focused ? theme['sky-basic'] : theme.grey} style={{ marginTop: 5}} /> }} />
        <Tab.Screen name="ChartStack" component={ChartStack} options={{ headerShown: false, tabBarLabel: ({ focused }) => <Text style={{ marginBottom:5 ,fontSize: 10, color: focused ? theme['sky-basic'] : theme.grey}} >통계</Text> , tabBarIcon: ({ focused }) => <Feather name="pie-chart" size={24} color={focused ? theme['sky-basic'] : theme.grey} style={{ marginTop: 5}} /> }}  />
        <Tab.Screen name="PaymentStack" component={PaymentStack} options={{ headerShown: false, tabBarLabel: ({ focused }) => <Text style={{ marginBottom:5 ,fontSize: 10, color: focused ? theme['sky-basic'] : theme.grey}} >결제</Text> , tabBarIcon: ({ focused }) => <Feather name="shopping-cart" size={24} color={focused ? theme['sky-basic'] : theme.grey} style={{ marginTop: 5}} /> }}  />
        <Tab.Screen name="ATM" component={ATM} options={{ headerShown: false, tabBarLabel: ({ focused }) => <Text style={{ marginBottom:5 ,fontSize: 10, color: focused ? theme['sky-basic'] : theme.grey}} >ATM</Text> , tabBarIcon: ({ focused }) => <Fontisto name="shopping-pos-machine" size={24} color={focused ? theme['sky-basic'] : theme.grey} style={{ marginTop: 5}} /> }}/>
        <Tab.Screen name="SettingStack" component={SettingStack} options={{ headerShown: false, tabBarLabel: ({ focused }) => <Text style={{ marginBottom:5 ,fontSize: 10, color: focused ? theme['sky-basic'] : theme.grey}} >설정</Text> , tabBarIcon: ({ focused }) => <Feather name="settings" size={24} color={focused ? theme['sky-basic'] : theme.grey} style={{ marginTop: 5}} /> }}  />
      </Tab.Navigator>
  );
}
