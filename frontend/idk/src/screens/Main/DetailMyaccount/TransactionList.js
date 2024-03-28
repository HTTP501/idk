import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

// 컴포넌트들
import theme from "../../../style";
import Account from "../../../components/MyAccount";
import DepositList from "../../../components/DepositList";
import formattedNumber from "../../../components/moneyFormatter";
import { useFocusEffect } from "@react-navigation/native";
import {
  getAccountAxios,
  getAccountTransactionAxios,
} from "../../../API/Account";
import Loading from "../../../components/Loading";

// 화면 크기
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
// 페이지
const TransactionList = ({ navigation }) => {
  // 계좌 데이터 - 더미
  let [account, setAccount] = useState({
    accountAvailableAmount: 0,
    accountBalance: 0,
    accountId: 8,
    accountMinAmount: 0,
    accountName: "IDK 우리나라 국민우대통장",
    accountNumber: "1234567891010",
    accountPayDate: 1,
  });

  let [loading, setLoading] = useState(false);

  // Axios 데이터 불러오기
  const fetchData = async () => {
    // 계좌 조회 Axios
    
    await getAccountAxios(
      (res) => {
        // console.log(res.data.data);
        setAccount(res.data.data);
      },
      (err) => {
        // 계좌 번호가 있는지 판단해서 없으면 계좌 생성페이지로 이동
        if (err.response.data.code === "A401") {
          Alert.alert(
            "계좌번호가 없습니다.",
            "계좌 생성 페이지로 이동합니다.",
            [
              {
                text: "확인",
                onPress: () => navigation.navigate("AccountStack"),
              },
            ]
          );
        }
      }
    );
    await getAccountTransactionAxios(
      (res) => {
        
        setDeposit(res.data.data)
      },
      (err) => {
        console.log(err);
      }
    );
  };
  // 화면 포커싱 시 데이터 다시 가져오기
  useEffect(() => {
    setLoading(false);
    fetchData();
    setTimeout(() => {
      setLoading(true);
    }, 700);
  }, []);

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


  return (
    <View className="flex-1">
      {loading ? (
        <ScrollView className="bg-white" style={styles.scrollViewContent}>
          {/* 배경 */}
          <View style={styles.back}></View>
          {/* 로고 알람 */}
          <View className="px-10 mt-10 mb-2">
            <Header navigation={navigation} />
          </View>

          {/* 계좌 */}
          <View className="justify-center items-center">
            <Account account={account} navigation={navigation} />
          </View>

          {/* 옵션 표기 */}
          <Option account={account} />

          {/* 이체내역 */}
          <DepositList deposit={deposit} navigation={navigation} />
          <StatusBar style="auto" />
        </ScrollView>
      ) : (
        <Loading />
      )}
    </View>
  );
};
// 헤더
const Header = ({ navigation }) => {
  const logo = require("../../../../assets/logo/white_idk_bank_logo.png");
  return (
    <View className="flex-row justify-between items-center">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Main");
        }}
      >
        <Image source={logo} style={{ width: 90, resizeMode: "contain" }} />
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
    height: SCREEN_HEIGHT * (1 / 4), // 화면 높이의 1/3
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
