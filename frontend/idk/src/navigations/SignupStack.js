import * as React from 'react';
import { Agreement, EnterAuthLocal, EnterBirthId, EnterName, EnterPIN, EnterPhoneNumber, FinishEnterPIN} from '../screens/Signup'
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function SignupStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Agreement" component={Agreement} options={{ headerShown: false }} />
        <Stack.Screen name="EnterAuthLocal" component={EnterAuthLocal} options={{ headerShown: false }} />
        <Stack.Screen name="EnterBirthId" component={EnterBirthId} options={{ headerShown: false }} />
        <Stack.Screen name="EnterName" component={EnterName} options={{ headerShown: false }} />
        <Stack.Screen name="EnterPIN" component={EnterPIN} options={{ headerShown: false }} />
        <Stack.Screen name="EnterPhoneNumber" component={EnterPhoneNumber} options={{ headerShown: false }} />
        <Stack.Screen name="FinishEnterPIN" component={FinishEnterPIN} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

export default SignupStack;