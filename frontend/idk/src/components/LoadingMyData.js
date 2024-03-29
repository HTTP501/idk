import React, { useRef, useEffect, useState } from "react";
import { Button, StyleSheet, View,Text } from "react-native";
import LottieView from "lottie-react-native";
import theme from "../style";

export default function LoadingMyData() {
  let [number, setNumber] = useState(0);
  // 1초마다 실행되는 함수
  const data = [
    {
      text: "자산을 연결 중이에요!",
      source: require("../../assets/animation/loadingAnimation.json"),
    },
    {
      text: "전자 서명을 생성하고 있어요!",
      source: require("../../assets/animation/checkMyCertification.json"),
    },
    {
      text: "CA에 검증을 요청하고 있어요!",
      source: require("../../assets/animation/makingCertification.json"),
    },
    {
      text: "검증이 완료되었어요!",
      source: require("../../assets/animation/finishCheck.json"),
    },
  ];
  const animation = useRef(null);
  const go = async ()=>{
    
    setTimeout(()=>{
      setNumber(1)
    },2000)
    
    setTimeout(()=>{
      setNumber(2)
    },4000)
    setTimeout(()=>{
      setNumber(3)
    },7000)
    
    setNumber(0)
  }
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
    go()
  }, []);

  return (
    <View style={styles.animationContainer}>
      <View>
        <Text className="text-2xl font-bold">
          {data[number].text}
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
        source={data[number].source}
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
