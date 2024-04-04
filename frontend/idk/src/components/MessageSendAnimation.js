import React, { useRef, useEffect, useState } from "react";
import { Button, StyleSheet, View,Text } from "react-native";
import LottieView from "lottie-react-native";
import theme from "../style";

export default function MessageSendAnimation() {
  const animation = useRef(null);
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        loop={false}
        ref={animation}
        style={{
          width: 200,
          height: 200,
          // backgroundColor: 'black',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../assets/animation/sendMessage.json")}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    // backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  
});
