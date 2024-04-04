import * as React from 'react';
import { Agreement, EnterAuthLocal, EnterBirthId, EnterName, EnterPIN, EnterPINCheck,  EnterPhoneNumber, FinishEnterPIN} from '../screens/Signup'
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function SignupStack() {
  return (
      <Stack.Navigator screenOptions={{headerTransparent: true,}}>
        <Stack.Screen name="Agreement" component={Agreement} options={{title:''}} />
        <Stack.Screen name="EnterAuthLocal" component={EnterAuthLocal} options={{title:''}} />
        <Stack.Screen name="EnterBirthId" component={EnterBirthId} options={{title:''}} />
        <Stack.Screen name="EnterName" component={EnterName} options={{title:''}}/>
        <Stack.Screen name="EnterPIN" component={EnterPIN} options={{title:''}} />
        <Stack.Screen name="EnterPINCheck" component={EnterPINCheck} options={{title:''}} />
        <Stack.Screen name="EnterPhoneNumber" component={EnterPhoneNumber} options={{title:''}} />
        <Stack.Screen name="FinishEnterPIN" component={FinishEnterPIN} options={{title:''}} />
      </Stack.Navigator>
  );
}

export default SignupStack;