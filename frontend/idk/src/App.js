import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import * as SplashScreen from "expo-splash-screen";
import { Text, View, Image } from 'react-native';


export default function App() {
  SplashScreen.preventAutoHideAsync()

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync()
    }, 2000);
  })

}

