
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import ToggleFilter from "./Toggle";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";
import theme from "../../style";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const formattedNumber = function (number) {
  return number.toLocaleString("ko-KR", { maximumFractionDigits: 0 });
};

const Main = () => {
  // 돈포켓 데이터
  let [don,setDon] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
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
  useEffect(() => {
    console.log("계좌, 돈포켓 API 호출 위치");
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {/* 배경 */}
      <View style={styles.back}></View>
      {/* 로고 알람 */}
      <View className="p-10">
        <Header />
      </View>

      {/* 계좌 */}
      <View className="justify-center items-center">
        <Account account={account} />
      </View>


      {/* 옵션 표기 */}
      <View>
        <Option account={account}/>
      </View>

      {/* 포켓 */}
      <View style={styles.donpocketlist}>
        {don.map((item) => (
          <DonPocket key={item} style={styles.shadow} />
        ))}
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
};
// 헤더
const Header = () => {
  return (
    <View className="flex-row justify-between">
      <TouchableOpacity>
        <Text>로고</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>알람</Text>
      </TouchableOpacity>
    </View>
  );
};

// 계좌
const Account = ({ account }) => {
  const copyIcon = require("../../../assets/icons/copy.png");
  return (
    <View className="p-3" style={[styles.myaccount, styles.shadow]}>
      {/* 계좌 내용 */}
      <View className="gap-1">
        <View className="flex-row justify-between">
          <Text className="font-bold">{account.accountName}</Text>
          {/* 설정 아이콘 */}
          <TouchableOpacity>
            <Text>설정</Text>
          </TouchableOpacity>
        </View>
        {/* 계좌 번호 + copy 아이콘 */}
        <View className="flex-row items-center">
          <Text className="mr-1">{account.accountNumber}</Text>
          <TouchableOpacity>
            <Image source={copyIcon} />
          </TouchableOpacity>
        </View>
        {/* 계좌 사용금액 + 안내 문구 */}
        <View className="flex-row items-end">
          <Text className="font-bold text-2xl mr-1">
            {formattedNumber(account.accountAvailableAmount)}원
          </Text>
          <Text className="font-bold">사용할 수 있어요</Text>
        </View>

        <View className="flex-row justify-between">
          <Text>계좌 총액 {formattedNumber(account.accountBalance)}원</Text>
          {/* 송금 버튼 */}
          <TouchableOpacity>
            <Text style={{backgroundColor:theme["sky-basic"], color:"white"}} 
            className="text-center py-2 px-4 rounded-lg font-bold">
              송금
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// 옵션
const Option = ({account}) => {
  return (
    <View className="px-7 py-3 gap-3">
      {/* 최소 보유 금액 + 월급일 */}
      <View className="flex-row justify-between">
        <View className="flex-row gap-1">
          <Text>최소 보유 금액 </Text>
          <Text className="font-bold">{formattedNumber(account.accountMinAmount)}원</Text>
        </View>
        <View className="flex-row gap-1">
          <Text>월급일 </Text>
          <Text className="font-bold">{account.accountPayDate}일</Text>
        </View>
      </View>
      {/* 돈포켓 총액, 필터 */}
      <View className="flex-row justify-between">
        <View className="flex-row gap-1">
          <Text>돈포켓 </Text>
          <Text className="font-bold">******원</Text>
        </View>
        <View className="mr-3">
          <ToggleFilter/>
        </View>
      </View>
    </View>
  );
};

// 돈포켓
const DonPocket = () => {
  const menuIcon = require("../../../assets/icons/menu.png");
  const checkIcon = require("../../../assets/icons/check.png");
  return (
    <View
      className="flex-row items-center p-5"
      style={[styles.donpocket, styles.shadow]}
    >
      {/* 돈포켓 상태 */}
      <Image source={checkIcon} />
      {/* 돈포켓 내용 */}
      <View className="flex-grow items-start ml-3">
        <View className="flex-row items-center">
          <Text className="font-bold text-lg mr-3">돈포켓 이름</Text>
          <Text className="">*월 *일</Text>
        </View>
        <Text className="">********원</Text>
      </View>
      {/* 돈포켓 순서 정렬 */}
      <Image source={menuIcon} />
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
  myaccount: {
    // height: windowHeight * (1 / 5),
    width: windowWidth * (6 / 7),
    borderRadius: 10,
    backgroundColor: "white",
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  donpocketlist: {
    // height: windowHeight * (1 / 8) * 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  donpocket: {
    // height: windowHeight * (1 / 8),
    width: windowWidth * (6 / 7),
    backgroundColor: "white",
    borderRadius: 10,
  },
  text: {
    fontSize: 28,
    color: "red",
  },
});
export default Main;
