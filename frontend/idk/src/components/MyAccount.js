import { Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
import { FontAwesome5 } from '@expo/vector-icons';
import theme from "../style";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
// 컴포넌트들
import formattedNumber from "./moneyFormatter";
import * as Clipboard from "expo-clipboard";

// 계좌
const Account = ({ account, navigation,totalPocket }) => {
  const copyIcon = require("../../assets/icons/copy.png");
  // 복사
  const copyToClipboard = async (number) => {
    await Clipboard.setStringAsync(number);
    console.log("복사되었습니다.");
  };


  return (
    <Pressable
      onPress={() => {
        console.log("입출금 내역 보러가기");
        navigation.navigate("TransactionList");
      }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? theme["light-grey"] : "white",
        },
        styles.myaccount,
        styles.shadow,
      ]}
    >
      <View className="gap-1">
        <View className="flex-row justify-between">
          <Text className="font-bold">{account?.accountName}</Text>
          {/* 설정 아이콘 */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SettingStack', { screen:"Settings", "data": { "isChecked": false } });
            }}
          >
            <AntDesign name="setting" size={24} color={theme["sky-basic"]} />
          </TouchableOpacity>
        </View>

        {/* 계좌 번호 + copy 아이콘 */}
        <View className="flex-row items-center">
          <Text className="mr-1">{account?.accountNumber}</Text>
          <TouchableOpacity
            // 클립보드 복사
            onPress={() => {
              copyToClipboard(account.accountNumber);
            }}
          >
            <FontAwesome5 name="copy" size={12} color="gray" />
          </TouchableOpacity>
        </View>

        {/* 계좌 사용금액 + 안내 문구 */}
        <View className="flex-row items-end">
          <Text className="font-bold text-2xl mr-1">
            {formattedNumber(account.accountBalance)}원
          </Text>
          <Text className="font-bold">사용할 수 있어요</Text>
        </View>

        <View className="flex-row justify-between">
          <Text>계좌 총액 {formattedNumber(account.accountBalance+totalPocket)}원</Text>
          {/* 송금 버튼 */}
          <TouchableOpacity
            onPress={() => {
              console.log("송금페이지 이동");
              navigation.navigate("EnterAccount");
            }}
          >
            <Text
              style={{ backgroundColor: theme["sky-basic"], color: "white" }}
              className="text-center py-2 px-4 rounded-lg font-bold"
            >
              송금
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  myaccount: {
    // height: SCREEN_WIDTH * (1 / 5),
    width: SCREEN_WIDTH * (9 / 10),
    padding: 15,
    borderRadius: 10,
    // backgroundColor: "white",
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Account;
