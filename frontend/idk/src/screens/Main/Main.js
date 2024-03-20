import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import ToggleFilter from "./Toggle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  gestureHandlerRootHOC,
} from "react-native-gesture-handler";
import {
  NestableScrollContainer,
} from "react-native-draggable-flatlist";

import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

// 컴포넌트들
import formattedNumber from "../../components/moneyFormatter";
import theme from "../../style";
import Account from "../../components/MyAccount";
import DepositList from "../../components/DepositList";
import DonPocketList from "../../components/DonPocketList";
// 화면 크기
import { Dimensions } from "react-native";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const Main = gestureHandlerRootHOC(({ navigation }) => {
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
  // 돈포켓 데이터
  let [pocketData, setPocketData] = useState([
    {
      pocketId: "1",
      pocketType: "saving",
      totalPaymentCnt: 1,
      savingId: 2198211,
      pocketName: "돈포켓이름1",
      balance: 60200,
      paymentDate: "15",
      isDeposited: true,
      isPaid: false,
      order: 1,
    },
    {
      pocketId: "2",
      pocketType: "autoTransfer",
      autoTransferId: 1241,
      pocketName: "돈포켓이름2",
      balance: 12567000,
      paymentDate: "15",
      isDeposited: false,
      isPaid: false,
      order: 2,
    },
    {
      pocketId: "3",
      pocketType: "autoDebit",
      autoDebitId: 12451,
      pocketName: "돈포켓이름3",
      balance: 12000,
      paymentDate: "23",
      isDeposited: false,
      isPaid: true,
      order: 3,
    },
    {
      pocketId: "4",
      pocketType: "saving",
      totalPaymentCnt: 10,
      savingId: 12513,
      pocketName: "돈포켓이름4",
      balance: 920200,
      paymentDate: "14",
      isDeposited: false,
      isPaid: false,
      order: 4,
    },
    {
      pocketId: "5",
      pocketType: "piggyBank",
      piggyBankId: 12531,
      pocketName: "돈포켓이름5",
      balance: 28300,
      paymentDate: "3",
      isDeposited: false,
      isPaid: false,
      order: 5,
    },
  ]);
  // + 버튼 눌렸는지 판단
  let [isButtenOpen, setisButtenOpen] = useState(false);
  useEffect(() => {
    console.log("계좌, 돈포켓 API 호출 위치");
  }, []);

  return (
    <View className="bg-white" style={styles.scrollViewContent}>
      <NestableScrollContainer>
        {/* 배경 */}
        <View style={styles.back}></View>
        {/* 로고 알람 */}
        <View className="px-10 mt-10 mb-2">
          <Header />
        </View>

        {/* 계좌 */}
        <View className="justify-center items-center">
          <Account account={account} navigation={navigation} />
        </View>

        {/* 옵션 표기 */}
        <Option account={account} />

        {/* 돈포켓 */}
        <DonPocketList navigation={navigation} pocketData={pocketData}
        changePocketOrder={(data)=>setPocketData(data)}
        />
        
        {/* 마이데이터 연결 */}
        <TouchableOpacity
          style={[styles.goMydata, styles.shadow]}
          onPress={() => navigation.navigate('CheckMyData')}
        >
          <Text className='text-lg font-bold'>다른 은행 자동이체 확인하기</Text>
          <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>

        {/* 버튼들 */}
        <View style={styles.buttonlist}>
          {isButtenOpen ? (
            <View>
              <PlusButton
                title={"목표 저축 추가하기"}
                destination={"RegistGoalSaving"}
                navigation={navigation}
              />
              <PlusButton
                title={"자동이체 등록하기"}
                destination={"RegistAutoSendAgree"}
                navigation={navigation}
              />
              <PlusButton
                title={"구독 서비스 등록하기"}
                destination={"RegistSubscribe"}
                navigation={navigation}
              />
              <PlusButton
                title={"저금통 가입하기"}
                destination={"RegistSavingBox"}
                navigation={navigation}
              />
              <TouchableOpacity style={[styles.button,styles.shadow]}
                onPress={()=>{setisButtenOpen(!isButtenOpen)}}
                >
              <Text className="text-lg font-bold">닫기</Text>
            </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={[styles.button,styles.shadow]}
            onPress={()=>{setisButtenOpen(!isButtenOpen)}}
            >
              <Text className="text-3xl font-bold">+</Text>
            </TouchableOpacity>
          )}
        </View>
        <StatusBar style="auto" />
      </NestableScrollContainer>
    </View>
  );
});
// 헤더
const Header = () => {
  const logo = require("../../../assets/logo/white_idk_bank_logo.png");
  return (
    <View className="flex-row justify-between items-center">
      <View>
        <Image source={logo} style={{ width: 90, resizeMode: "contain" }} />
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log("알람페이지로 가기");
        }}
      >
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
      {/* 돈포켓 총액, 필터 */}
      <View className="flex-row justify-between">
        <View className="flex-row gap-1">
          <Text>돈포켓 </Text>
          <Text className="font-bold">******원</Text>
        </View>
        <View className="mr-3">
          <ToggleFilter />
        </View>
      </View>
    </View>
  );
};

const PlusButton = function ({ title, destination, navigation }) {
  // 목표 물건 params로 보낼때 오류나지말라고 넣어주는 params
  const item = {}
  return (
    <TouchableOpacity
      onPress={() => {
        if(destination=== "RegistGoalSaving"){
          navigation.navigate(destination,{item});
        } else{
          navigation.navigate(destination);
        }
      }}
      style={[styles.button, styles.shadow]}
    >
      <Text className="text-lg font-bold">{title}</Text>
    </TouchableOpacity>
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
    height: SCREEN_HEIGHT * (1 / 4), // 화면 높이의 1/3
    backgroundColor: theme["sky-basic"],
  },
  buttonlist: {
    // height: SCREEN_HEIGHT * (1 / 8) * 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  button: {
    height: 90,
    // height: SCREEN_HEIGHT * (1 / 8),
    width: SCREEN_WIDTH * (6 / 7),
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom:10
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  goMydata : {
    height: 90,
    width: SCREEN_WIDTH * (6 / 7),
    backgroundColor: "white",
    marginBottom:10,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  text: {
    fontSize: 28,
    color: "red",
  },
});
export default Main;
