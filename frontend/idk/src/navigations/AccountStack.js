import * as React from 'react';
import { Agreement, CreateAccount, FinishCreateAccount } from '../screens/CreateAccount'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function AccountStack() {
  return (
      <Stack.Navigator screenOptions={{headerTransparent: true,}}>
        <Stack.Screen name="Agreement" component={Agreement} options={{ title:'' }} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ title:''  }} />
        <Stack.Screen name="FinishCreateAccount" component={FinishCreateAccount} options={{ title:''  }} />
      </Stack.Navigator>
  );
}

export default AccountStack;