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
import { Fontisto, MaterialIcons, AntDesign } from "@expo/vector-icons";
import theme from "../../style";
import MoneySendAnimation from "../../components/MoneySendAnimation.js";
const PayResult = ({ route, navigation }) => {
  useEffect(() => {
    console.log(route.params.finalData.price);
  })

  const PayResultStyle = StyleSheet.create({
    mainContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    iconArea: {
      flex: 2.5,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    infoArea: {
      flex: 2,
      justifyContent: "flex-start",
      paddingHorizontal: 20,
    },
    bigFont: {
      fontWeight: "bold",
      fontSize: 22,
      marginRight: 20,
    },
    btnArea: {
      flex: 1,
      justifyContent: "flex-end",
    },
    moveBtn: {
      borderWidth: 1,
      width: "45%",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      marginTop: 10,
    },
    btnText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 18,
    },
  });

  const formattedNumber = function (number) {
    return number.toLocaleString("ko-KR", { maximumFractionDigits: 0 });
  };

  const newNum = formattedNumber(route.params.finalData.price)

  return (
    <View style={{ ...PayResultStyle.mainContainer,backgroundColor:'white' }}>
      {/* 체크표시와 결제완료 */}
      <View style={{ ...PayResultStyle.iconArea }}>
        {/* <AntDesign
          name="checkcircle"
          size={80}
          style={{ color: theme["sky-bright-1"], marginTop: "40%" }}
        /> */}
        <View style={{ marginTop: "30%",marginBottom:-60 }} >
        <MoneySendAnimation/>
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 25, marginTop: "10%" }}>
          결제 완료
        </Text>
      </View>
      {/* 계좌 현황 확인 및 결제 금액 출력*/}
      <View style={{ ...PayResultStyle.infoArea }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ ...PayResultStyle.bigFont }}>계좌 정보</Text>
          <View style={{marginTop:15,}}>
            <Text style={{ fontSize: 15 }}>{route.params.finalData.accountName}</Text>
            <Text style={{ fontSize: 15 }}>{route.params.finalData.accountNumber}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <Text style={{ ...PayResultStyle.bigFont }}>결제금액</Text>
          <Text style={{ fontSize: 15, marginLeft:5, }}>{newNum}원</Text>
        </View>
      </View>
      {/* 버튼들 */}
      <View style={{ ...PayResultStyle.btnArea }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.replace("Main");
            }}
            style={{
              ...PayResultStyle.moveBtn,
              backgroundColor: theme["sky-bright-4"],
              borderColor: theme["sky-bright-4"],
            }}
          >
            <Text style={{ ...PayResultStyle.btnText }}>메인 페이지로</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.replace("ShoppingMall");
            }}
            style={{
              ...PayResultStyle.moveBtn,
              backgroundColor: theme["sky-basic"],
              borderColor: theme["sky-basic"],
            }}
          >
            <Text style={{ ...PayResultStyle.btnText }}>쇼핑몰로</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PayResult;
