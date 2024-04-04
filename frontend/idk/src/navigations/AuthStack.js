import * as React from 'react';
import { AuthLocal, AuthPIN } from '../screens/Auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthPW from '../screens/Auth/AuthPW';
import FinishPayment from "../screens/Payment/FinishPayment.js"
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AuthPIN" component={AuthPIN} options={{ headerShown: false }} />
      <Stack.Screen name="AuthLocal" component={AuthLocal} options={{ headerShown: false }} />
      <Stack.Screen name="AuthPW" component={AuthPW} options={{ headerShown: false }} />
      <Stack.Screen name="FinishPayment" component={FinishPayment} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AuthStack;
