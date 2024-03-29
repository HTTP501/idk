import * as React from "react";
import {
  FinishPayment,
  ShoppingMall,
  PayPassword,
  PayResult,
} from "../screens/Payment";
import Main from "../screens/Main/Main";
import AuthPW from "../screens/Auth/AuthPW"
import RegistGoalSaving from "../screens/Main/Registrations/RegistGoalSaving";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function ShopStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShoppingMall"
        component={ShoppingMall}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FinishPayment"
        component={FinishPayment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PayPassword"
        component={PayPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PayResult"
        component={PayResult}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegistGoalSaving"
        component={RegistGoalSaving}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AuthPW"
        component={AuthPW}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default ShopStack;
