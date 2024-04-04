import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Modal,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import theme from "../../style";

const PayPassword = ({ route, navigation }) => {
  // 비밀번호를 배열로 저장
  const [pin, setPin] = useState(["", "", "", ""]);
  // TextInput에 대한 ref를 배열로 저장
  const pinInputs = Array.from({ length: 4 }, () => useRef(null));

  // 각 칸에서 숫자를 입력했을 때와 지워졌을 때의 커서 포커스 처리할 함수
  const handlePinChange = (index, value) => {
    // 입력값이 숫자가 아니면 무시
    if (!/^\d*$/.test(value)) return;
    // 비밀번호 배열을 업데이트
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // 현재 입력된 값이 없고, 이전 TextInput이 존재하면 포커스 이동
    if (!value && index > 0) {
      pinInputs[index - 1].current.focus();
    }

    // 현재 입력된 값이 있고, 다음 TextInput이 존재하면 포커스 이동
    if (value && index < pinInputs.length - 1) {
      pinInputs[index + 1].current.focus();
    }
  };

  const PayPasswordStyle = StyleSheet.create({
    baseArea: {
      flex: 1.5,
      paddingHorizontal: 20,
    },
    backBtnArea: {
      flex: 2,
    },
    mainFont: {
      fontWeight: "bold",
      fontSize: 30,
    },
    titleArea: {
      flex: 2,
      //   justifyContent: "center",
      alignItems: "center",
    },
    inputArea: {
      flex: 2,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-around",
    },
    keyboardArea: {
      flex: 2,
    },
  });

  const sendData = {
    password: pin.join(""),
    price: Number(route.params.sendData.price),
  };

  useEffect(() => {
    // 만약 비밀번호를 다 입력했다면,
    if (sendData.password.length === 4) {
      // Axios 요청을 보내서 비밀번호가 맞는지 확인하자!
      // 만약, 비밀번호가 틀려서 에러가 발생하면 비밀번호가 틀렸다는 안내를 띄우자!
      // 맞다면 결제 완료 화면으로 이동시키자!
      navigation.replace("PayResult", { sendData });
    }
  });
  // 들어왔을때 자동으로 입력이 가능하게 세팅해주자!
  useEffect(() => {
    pinInputs[0].current.focus();
  }, []);

  return (
    <View style={{ ...PayPasswordStyle.baseArea }}>
      {/* 뒤로가기 */}
      <View style={{ ...PayPasswordStyle.backBtnArea }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ marginTop: 60 }}
        >
          <MaterialIcons name="arrow-back-ios-new" size={36} color="black" />
        </TouchableOpacity>
      </View>
      {/* 타이틀 */}
      <View style={{ ...PayPasswordStyle.titleArea }}>
        <Text style={{ ...PayPasswordStyle.mainFont }}>계좌 비밀번호 입력</Text>
      </View>
      {/* 비밀번호 입력 */}
      <View style={{ ...PayPasswordStyle.inputArea }}>
        {/* 상태로 선언한 pin을 순회함 */}
        {pin.map((value, index) => (
          <TextInput
            // 인덱스 값을 키로
            key={index}
            // 물어보자
            ref={pinInputs[index]}
            style={{
              borderBottomWidth: 0.5,
              width: 70,
              paddingHorizontal: 15,
              textAlign: "center",
              fontSize: 50,
            }}
            returnKeyType="next"
            placeholder="*"
            maxLength={1}
            keyboardType="numeric"
            value={value}
            onChangeText={(text) => handlePinChange(index, text)}
            secureTextEntry={true} // 입력된 번호를 *로 대체하여 보여줌
          />
        ))}
      </View>
      {/* 키보드 */}
      <View style={{ ...PayPasswordStyle.keyboardArea }}></View>
    </View>
  );
};

export default PayPassword;
