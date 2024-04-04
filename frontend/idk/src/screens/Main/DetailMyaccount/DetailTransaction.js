import React from "react";
import { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import theme from "../../../style";
import formattedNumber from "../../../components/moneyFormatter";
import { FontAwesome6 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
// 컴포넌트들

// 화면 크기
import { Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
import { useIsFocused } from "@react-navigation/native";
import DepositList from "../../../components/DepositList";

const DetailTransaction = ({ navigation, route }) => {
  let [transactionData, setTransactionData] = useState({
    transactionId: 1,
    transactionContent: "SSAFY",
    transactionAmount: 1000000,
    transactionBalance: 1283600,
    type: "입금",
    depositType: "월급",
    transactionCreatedAt: "2024-03-03 12:00:01",
  });
  let [recentTransactionData, setrecentTransactionData] = useState([
    {
      transactionId: 1,
      transactionContent: "SSAFY",
      transactionAmount: 1000000,
      transactionBalance: 1283600,
      type: "입금",
      depositType: "월급",
      transactionCreatedAt: "2024-02-03 12:00:01",
    },
    {
      transactionId: 2,
      transactionContent: "SSAFY",
      transactionAmount: 1000000,
      transactionBalance: 1283600,
      type: "입금",
      depositType: "월급",
      transactionCreatedAt: "2024-01-03 12:00:01",
    },
    {
      transactionId: 3,
      transactionContent: "SSAFY",
      transactionAmount: 1000000,
      transactionBalance: 1283600,
      type: "입금",
      depositType: "월급",
      transactionCreatedAt: "2023-12-03 12:00:01",
    },
  ]);
  useEffect(() => {
    console.log(route.params.transactionId, "이체 상세 API");
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.box} className="mb-16">
        <Text className="text-3xl font-bold pl-3">상세 내역</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View className="flex-row gap-1 mb-3">
          <Text>아이콘</Text>
          <Text>네이버 파이낸셜</Text>
        </View>
        <View className="flex-row gap-3 items-center mb-5">
          {transactionData.type === "입금" ? (
            <Text className="text-blue-400 text-3xl">
              +{formattedNumber(transactionData.transactionAmount)}원
            </Text>
          ) : (
            <Text className="text-red-400 text-3xl">
              -{formattedNumber(transactionData.transactionAmount)}원
            </Text>
          )}
        </View>
        {/*  */}
        <View className="border-b border-gray-300 py-3">
          {/* 돈포켓 등록하기  */}
          <View style={styles.box}>
            <Text className="text-lg font-bold">돈포켓 등록하기</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("RegistSubscribe",{transactionData}) }>
              <Text className="text-lg font-bold text-gray-300">
                등록하러 가기{" "}
                <Feather name="arrow-right" size={20} color={theme.gray} />
              </Text>
            </TouchableOpacity>
          </View>
          {/* 메모  */}
          <View style={styles.box}>
            <Text className="text-lg font-bold">메모</Text>
            <TouchableOpacity>
              <Text className="text-lg font-bold text-gray-300">
                메모를 남겨보세요{" "}
                <FontAwesome6 name="pencil" size={20} color={theme.grey} />
              </Text>
            </TouchableOpacity>
          </View>
          {/* 메모  */}
          <View style={styles.box}>
            <Text className="text-lg font-bold">결제 일시</Text>
            <Text>
              <Text className="text-gray-400">2024년 3월 20일 19:02</Text>
            </Text>
          </View>
        </View>
        {/*  */}
        <ScrollView showsVerticalScrollIndicator={false} className="mt-3">
          <Text className="text-lg font-bold my-3">최근 3개월간 거래 내역</Text>
          {recentTransactionData.map((item, index) => (
            <DepositItem item={item} key={index} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const DepositItem = function ({ item }) {
  // 날짜를 분리
  const [datePart, timePart] = item.transactionCreatedAt.split(" ");

  // 연, 월, 일을 추출
  const [year, month, day] = datePart.split("-");

  console.log(year, month, day);
  return (
    <View style={styles.box} className="py-1">
      <Text className="mr-5">아이콘</Text>
      <View className="flex-grow gap-1">
        <Text>{item.transactionContent}</Text>
        {year == 2024 ? (
          <Text>
            {month}/{day}
          </Text>
        ) : (
          <Text>
            {year}/{month}/{day}
          </Text>
        )}
      </View>
      {item.type === "입금" ? (
        <Text className="text-blue-300 font-bold text-lg">
          +{formattedNumber(item.transactionAmount)} 원
        </Text>
      ) : (
        <Text className="text-red-600 font-bold text-lg">
          -{formattedNumber(item.transactionAmount)} 원
        </Text>
      )}
    </View>
  );
};
// 스타일

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: 120,
  },
  box: {
    width: SCREEN_WIDTH * (8 / 10),
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    width: "100%",
    height: 40,
    alignSelf: "center",
    marginTop: 10,
    borderColor: theme.grey,
  },
  button: {
    width: SCREEN_WIDTH * (9 / 10),
    height: 50,
    backgroundColor: theme["sky-basic"],
    alignItems: "center",
    justifyContent: "center",
    // position: 'absolute',
    bottom: 20, // 화면 하단과의 간격
    alignSelf: "center",
    borderRadius: 10,
  },
});
export default DetailTransaction;
