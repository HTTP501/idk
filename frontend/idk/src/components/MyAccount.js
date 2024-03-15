import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import theme from "../style";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
// 숫자 -> 돈 쉼표 찍는 함수
const formattedNumber = function (number) {
  return number.toLocaleString("ko-KR", { maximumFractionDigits: 0 });
};

// 계좌
const Account = ({ account,navigation }) => {
  const copyIcon = require("../../assets/icons/copy.png");
  
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={()=>{
      console.log('입출금 내역 보러가기')
    }}
    className="p-4" style={[styles.myaccount, styles.shadow]}>
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
          <TouchableOpacity
          onPress={()=>{
            console.log('송금페이지 이동')
            navigation.navigate('EnterAccount')
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  myaccount: {
    // height: windowHeight * (1 / 5),
    width: windowWidth * (9 / 10),
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
});

export default Account;
