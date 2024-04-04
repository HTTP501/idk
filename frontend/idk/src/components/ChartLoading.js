import React, { useRef, useEffect, useState } from "react";
import { Button, StyleSheet, View,Text } from "react-native";
import LottieView from "lottie-react-native";
import theme from "../style";

export default function ChartLoading() {
  const animation = useRef(null);
  return (
    <View style={styles.animationContainer}>
      <View>
        <Text className="text-2xl font-bold">
         나의 지출을 분석중이에요...
        </Text>
      </View>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: "80%",
          height: "30%",
          // backgroundColor: '#eee',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../assets/animation/chartLoading.json")}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
