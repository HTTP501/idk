import MainApp from './src/MainApp'
import * as React from 'react';
import SignupStack from './src/navigations/SignupStack'
import AuthStack from './src/navigations/AuthStack'
import { navigationRef } from './src/navigations/AppNavigation'
import AccountStack from './src/navigations/AccountStack'
import Tab from './src/navigations/Tab'
import LocalAxios from './src/API/LocalAxios'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
        <Stack.Screen name="SignupStack" component={SignupStack} options={{ headerShown: false }} />
        <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
        <Stack.Screen name="AccountStack" component={AccountStack} options={{ headerShown: false }} />
        <Stack.Screen name="Tab" component={Tab} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;