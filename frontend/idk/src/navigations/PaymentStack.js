import * as React from "react";
import { FinishPayment, ShoppingMall } from "../screens/Payment";
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
    </Stack.Navigator>
  );
}

export default ShopStack;
