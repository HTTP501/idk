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
} from "react-native";
// 컴포넌트들
import theme from "../../../style";
import DepositList from "../../../components/DepositList";
import formattedNumber from "../../../components/moneyFormatter";
// 화면 크기
import { Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
import { useIsFocused } from "@react-navigation/native";
import Loading from "../../../components/Loading";

const DetailPocket = ({ navigation, route }) => {
  const pocketId = route.params.pocketData.pocketId
  const pocketType = route.params.pocketData.pocketType
  const [donPocketId, setDonPocketId] = useState(null)

  let [loading, setLoading] = useState(false);
  useEffect(() => {
    if (pocketType === '목표저축') {
      setDonPocketId(route.params.pocketData.targetSavingId)
    } else if (pocketType === '자동이체') {
      setDonPocketId(route.params.pocketData.autoTransferId)
    } else {
      setDonPocketId(route.params.pocketData.AutoDebitId)
    }
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, []);

  const date = new Date()

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
            <Header navigation={navigation}/>
          </View>

          {/* 정보 */}
          <View className="justify-center items-center mb-5">
            <View style={[styles.info, styles.shadow]}>
              <Text className='mt-2 ml-2'>{date.getMonth() + 1}월 {date.getDay()}일에</Text>
              <Image style={styles.lock} source={require('../../../../assets/icons/close.png')}/>
              <View className='flex-row mt-5 items-end'>
                <Text className='text-2xl font-bold'>50,000원</Text>
                <Text>이 이체될 예정이에요.</Text>
              </View>
              <Text style={{color: theme["sky-basic"], marginTop: 20,}}>잘 보관 중이에요.</Text>
              <TouchableOpacity
                style={styles.setting}
                onPress={() => {
                  if (pocketType === '목표저축') {
                    navigation.navigate('SettingTargetSaving', { pocketId, donPocketId })
                  } else if (pocketType === '자동결제') {
                    navigation.navigate("SettingAutoDebit", { pocketId, donPocketId });
                  } else if (pocketType === '자동이체') {
                    navigation.navigate('SettingAutoTransfer', { pocketId, donPocketId })
                  }
                }}
              >
                <AntDesign name="setting" size={36} color={theme["sky-basic"]} />
              </TouchableOpacity>
            </View>
          </View>


          {/* 이체내역 */}
          <DepositList deposit={deposit} navigation={navigation} />
          <StatusBar style="auto" />
        </ScrollView>
      ) : <Loading/>}
    </View>
  );
};
// 헤더
const Header = ({navigation}) => {
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
      <Text className='text-white text-lg font-bold'>돈포켓 이름</Text>
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
  info: {
    height: 160,
    width: SCREEN_WIDTH * (9 / 10),
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
  },
  text: {
    fontSize: 28,
    color: "red",
  },
  lock: {
    position: 'absolute',
    end: 20,
    top: 20,
    height:50,
    width:40,
    resizeMode:'contain'
  },
  setting: {
    position: 'absolute',
    end: 20,
    bottom: 10
  }
});
export default DetailPocket;
