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
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import theme from "../../style";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const FinishPayment = ({ route }) => {
  const FinishPaymentStyle = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
    },
    backBtn: {
      flex: 3,
      marginTop: 60,
    },
    productsInfoBox: {
      flex: 2,
    },
    payMethodBox: {
      flex: 2,
    },
    resultBox: {
      flex: 3,
    },
  });

  return (
    <View style={FinishPaymentStyle.container}>
      {/* 주소 및 받는 이 정보 부분 */}
      <View style={FinishPaymentStyle.backBtn}>
        <TouchableOpacity>
          <MaterialIcons name="arrow-back-ios-new" size={36} color="black" />
        </TouchableOpacity>
        <Text>SSAFY로 받기</Text>
        <Text>로컬에서 나의 이름을 가져올게요</Text>
        <Text>로컬에서 나의 전화번호를 가져올게요</Text>
        <Text>서울특별시 강남구 테헤란로 212 (역삼동 718-5번지)</Text>
        <TextInput placeholder={"배송 시 요청사항"}></TextInput>
      </View>

      {/* 주문 상품 정보 부분 */}
      <View style={FinishPaymentStyle.productsInfoBox}>
        <Text>주문정보를 받을거에요</Text>
      </View>

      {/* 결제 수단 정보 부분 */}
      <View style={FinishPaymentStyle.payMethodBox}>
        <Text>결제수단을 받을거에요</Text>
      </View>

      {/* 결제 결과 정보 부분 */}
      <View style={FinishPaymentStyle.resultBox}>
        <Text>결제 결과를 받을거에요</Text>
      </View>
    </View>
  );
};

export default FinishPayment;
