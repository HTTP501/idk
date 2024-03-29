import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,Image
} from "react-native";
import theme from "../../../style";
import { useRef, useState } from "react";
import formattedNumber from "../../../components/moneyFormatter";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

// 송금 완료 페이지
const FinishSendMoney = ({ navigation, route }) => {
  const money = route.params.transferAmount;
  const myAccount = route.params.myAccount;
  const opponent = route.params.otherName;

  return (
    <View style={styles.container}>
      <View className="flex-grow justify-center gap-10 items-center">
        {/*메세지 아이콘 */}
        <View>
          <Image source={require("../../../../assets/check.png")}/>
        </View>
        {/* 송금 정보 */}
        <View className="items-center">
          <Text className="font-bold text-2xl">{opponent}님에게</Text>
          <Text className="font-bold text-2xl">{formattedNumber(money)}원을</Text>
          <Text className="font-bold text-2xl">보냈어요</Text>
        </View>
        {/* 정보 */}
        <Text>잔액 {formattedNumber(myAccount)}원</Text>
      </View>
      {/* 버튼 */}
      <View className="flex-row">
        <TouchableOpacity
        style={{backgroundColor:theme["light-grey"], height:50, justifyContent:'center'}}
          className="flex-1 items-center"
          onPress={() => {
            // 송금 페이지 이동
            navigation.navigate("EnterAccount");
          }}
        >
          <Text className="text-xl font-bold">다른 이체</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{backgroundColor:theme["sky-basic"], height:50, justifyContent:'center'}}
          className="flex-1 items-center "
          onPress={() => {
            // 메인 페이지 이동
            navigation.navigate("Main");
          }}
        >
          <Text className="text-xl font-bold text-white">확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "white",
  },
  input: {
    width: "100%",
    borderBottomWidth: 2,
    letterSpacing: 2,
  },
  topView: {
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: 40,
  },
  middleView: {
    flex: 2,
    justifyContent: "center",
  },
  bottomView: {
    flexGrow: 2,
  },
  button: {
    width: SCREEN_WIDTH * (9 / 10),
    height: 50,
    backgroundColor: theme["sky-basic"],
    alignItems: "center",
    justifyContent: "center",
    position: "absolute", // 위치를 절대로 설정
    bottom: 20, // 화면 하단과의 간격
    alignSelf: "center",
  },
});
export default FinishSendMoney;
