import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
// 컴포넌트들
import theme from "../../../style";
import Account from "../../../components/MyAccount";
import DepositList from "../../../components/DepositList";
import formattedNumber from "../../../components/moneyFormatter";
// 화면 크기
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const TransactionList = ({navigation}) => {
  // 계좌 데이터 - 더미
  let [account, setAccount] = useState({
    accountId: 1234,
    accountNumber: "123456-78910",
    accountName: "전재산 통장",
    accountBalance: 10202200,
    accountMinAmount: 300000,
    accountPayDate: 15,
    accountAvailableAmount: 390000,
  });

  // 이체 데이터
  let [deposit, setDeposit] = useState([
    {
      transactionId: 1,
      transactionContent: "SSAFY",
      transactionAmount: 1000000,
      transactionBalance: 1283600,
      type: "입금",
      depositType: "월급",
      transactionCreatedAt: "2024-03-03 12:00:01",
    },
    {
      transactionId: 2,
      transactionContent: "조용훈",
      transactionAmount: 50000,
      transactionBalance: 333600,
      type: "출금",
      depositType: "계좌이체",
      transactionCreatedAt: "2024-03-01 12:00:01",
    },
    {
      transactionId: 3,
      transactionContent: "윤예빈",
      transactionAmount: 50000,
      transactionBalance: 383600,
      type: "출금",
      depositType: "계좌이체",
      transactionCreatedAt: "2024-02-29 12:00:01",
    },
    {
      transactionId: 4,
      transactionContent: "최현기",
      transactionAmount: 10000,
      transactionBalance: 393600,
      type: "출금",
      depositType: "계좌이체",
      transactionCreatedAt: "2024-03-03 12:00:01",
    },
  ]);
  useEffect(() => {
    console.log("계좌, 이체 API 호출 위치");
  }, []);

  return (
    <ScrollView className="bg-white" style={styles.scrollViewContent}>
      {/* 배경 */}
      <View style={styles.back}></View>
      {/* 로고 알람 */}
      <View className="px-10 mt-10 mb-2">
        <Header navigation={navigation}/>
      </View>

      {/* 계좌 */}
      <View className="justify-center items-center">
        <Account account={account} navigation={navigation} 
        />
      </View>

      {/* 옵션 표기 */}
      <Option account={account} />

      {/* 이체내역 */}
      <DepositList deposit={deposit}/>

      <StatusBar style="auto" />
    </ScrollView>
  );
};
// 헤더
const Header = ({navigation}) => {
  const logo = require('../../../../assets/logo/white_idk_bank_logo.png')
  return (
    <View className="flex-row justify-between items-center">
      <TouchableOpacity
      onPress={()=>{
        navigation.navigate("Main")
      }}
      >
      <Image
        source={logo}
        style={{ width: 90, resizeMode: "contain" }}
      />
      </TouchableOpacity>
      <TouchableOpacity>
      <MaterialCommunityIcons name="bell" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

// 옵션
const Option = ({ account }) => {
  return (
    <View className="px-7 py-3 gap-3">
      {/* 최소 보유 금액 + 월급일 */}
      <View className="flex-row justify-between">
        <View className="flex-row gap-1">
          <Text>최소 보유 금액 </Text>
          <Text className="font-bold">
            {formattedNumber(account.accountMinAmount)}원
          </Text>
        </View>
        <View className="flex-row gap-1">
          <Text>월급일 </Text>
          <Text className="font-bold">{account.accountPayDate}일</Text>
        </View>
      </View>
      
    </View>
  );
};

// 스타일
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  back: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: windowHeight * (1 / 4), // 화면 높이의 1/3
    backgroundColor: theme["sky-basic"],
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  text: {
    fontSize: 28,
    color: "red",
  },
});
export default TransactionList;
