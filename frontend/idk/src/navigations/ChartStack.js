import * as React from 'react';
import { Chart } from '../screens/Chart'
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function ChartStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Chart" component={Chart} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

export default ChartStack;