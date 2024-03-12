import * as React from 'react';
import Main from '../screens/Main/Main'
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

export default MainStack;