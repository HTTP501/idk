import * as React from "react";
import { Chart } from "../screens/Chart";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

function ChartStack() {
  const renderBackButton = (page) => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
    );
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="Chart"
        component={Chart}
        options={{ headerLeft: () => renderBackButton(), title: "" }}
      />
    </Stack.Navigator>
  );
}

export default ChartStack;
