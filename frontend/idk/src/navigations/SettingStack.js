import * as React from 'react';
import { ChangeAccountName, ChangeAccountPW, ChangeLeastHoldMoney, ChangeSalaryDay, Settings } from '../screens/Settings'
import RegistSavingBox from '../screens/Main/Registrations/RegistSavingBox'
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo

const Stack = createNativeStackNavigator();

function SettingStack({ navigation }) {
  const renderBackButton = (page) => {
    if (page === 'Settings') {
      return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      ) 
    }else {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      )
    }
  }

  return (
      <Stack.Navigator 
        screenOptions={{ 
          headerTransparent: true, 
        }}>
        <Stack.Screen name="Settings" component={Settings} options={{ headerLeft: () => renderBackButton('Settings'), title: '설정'}} />
        <Stack.Screen name="ChangeAccountName" component={ChangeAccountName} options={{ title: '설정' }} />
        <Stack.Screen name="ChangeAccountPW" component={ChangeAccountPW} options={{ headerLeft: () => renderBackButton(), title: '설정' }} />
        <Stack.Screen name="ChangeLeastHoldMoney" component={ChangeLeastHoldMoney} options={{ headerLeft: () => renderBackButton(), title: '설정' }} />
        <Stack.Screen name="ChangeSalaryDay" component={ChangeSalaryDay} options={{ headerLeft: () => renderBackButton(), title: '설정' }} />
        <Stack.Screen name="RegistSavingBox" component={RegistSavingBox} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

export default SettingStack;
