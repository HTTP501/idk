import MainApp from './src/MainApp'
import * as React from 'react';
import SignupStack from './src/navigations/SignupStack'
import AuthStack from './src/navigations/AuthStack'
import AccountStack from './src/navigations/AccountStack'
import Tab from './src/navigations/Tab'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
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