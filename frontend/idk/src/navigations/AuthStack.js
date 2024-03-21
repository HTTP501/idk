import * as React from 'react';
import { AuthLocal, AuthPIN } from '../screens/Auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNavigationContainerRef } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AuthPIN" component={AuthPIN} options={{ headerShown: false }} />
      <Stack.Screen name="AuthLocal" component={AuthLocal} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AuthStack;
