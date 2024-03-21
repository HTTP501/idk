import { useNavigation } from "@react-navigation/native";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
import { useEffect, useState } from "react";
import theme from "../../../style";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import formattedNumber from "../../../components/moneyFormatter";

// 입금액 수정 페이지
const EnterMoney = ({ navigation,route }) => {
  let [money, setMoney] = useState(0);
  const originAccount = 1000000;
  let [myAccount, setMyAccount] = useState(originAccount);
  const otherAccount = { name:'김영준', bankName: route.params.bankName, accountId: route.params.accountId };
  
  // 입금액 변경 함수
  const changeMoney = function (number) {
    if (number == "00") {
      setMoney(money * 100);
    } else if (number == "D") {
      const last = money % 10;
      setMoney((money - last) / 10);
    } else {
      setMoney(money * 10 + Number(number));
    }
  };
  
  // 입력한 돈이 변경될때마다 잔액 업데이트
  useEffect(()=>{
    if (money > originAccount) {
      
      alert("잔액보다 큰 금액 인출 못함");
      setMoney(0);
      setMyAccount(originAccount)
    } else {
      setMyAccount(originAccount-money)
    }
  },[money])

  return (
    <View style={styles.container}>

      {/* 상대방 정보 */}
      <View style={styles.topView}>
        <Text className="text-3xl font-bold mb-3 ">{otherAccount.name}님</Text>
        <Text>
          {otherAccount.bankName} {otherAccount.accountId}
        </Text>
      </View>
      
      {/* 금액 정보 */}
      <View style={styles.middleView}>
        <View className="items-center">
          <Text className="text-3xl font-bold mb-3">
            {formattedNumber(money)}원
          </Text>
          <Text>잔액 {formattedNumber(myAccount)}원</Text>
        </View>
      </View>

      {/* 다음 버튼 + 금액 */}
      <View style={styles.bottomView}>
        {/* 다음 버튼 */}
        <TouchableOpacity
          style={styles.button}
          className="bg-blue-400"
          onPress={() => {
            // 확인 페이지 이동
            navigation.navigate("CheckSendMoneyInfo",{otherAccount,money, myAccount});
          }}
        >
          <Text className="text-xl font-bold text-white">다음</Text>
        </TouchableOpacity>
        {/* 키보드 */}
        <KeyBoard changeMoney={(num) => changeMoney(num)} />
      </View>
    </View>
  );
};

// 키보드
const KeyBoard = function (props) {
  return (
    <View className="flex-grow">
      <View className="flex-row justify-center">
        <TouchableOpacity
          className="px-10 py-5"
          onPress={() => {
            props.changeMoney(1);
          }}
        >
          <Text className="text-3xl text-center">1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-10 py-5"
          onPress={() => {
            props.changeMoney(2);
          }}
        >
          <Text className="text-3xl text-center">2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-10 py-5"
          onPress={() => {
            props.changeMoney(3);
          }}
        >
          <Text className="text-3xl text-center">3</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center">
        <TouchableOpacity
          className="px-10 py-5"
          onPress={() => {
            props.changeMoney(4);
          }}
        >
          <Text className="text-3xl text-center">4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-10 py-5"
          onPress={() => {
            props.changeMoney(5);
          }}
        >
          <Text className="text-3xl text-center">5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-10 py-5"
          onPress={() => {
            props.changeMoney(6);
          }}
        >
          <Text className="text-3xl text-center">6</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center">
        <TouchableOpacity
          className="px-10 py-5"
          onPress={() => {
            props.changeMoney(7);
          }}
        >
          <Text className="text-3xl text-center">7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-10 py-5"
          onPress={() => {
            props.changeMoney(8);
          }}
        >
          <Text className="text-3xl text-center">8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-10 py-5"
          onPress={() => {
            props.changeMoney(9);
          }}
        >
          <Text className="text-3xl text-center">9</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center">
        <TouchableOpacity
          className="px-10 py-5"
          onPress={() => {
            props.changeMoney("00");
          }}
        >
          <Text className="text-3xl text-center">00</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-10 py-5"
          onPress={() => {
            props.changeMoney(0);
          }}
        >
          <Text className="text-3xl text-center">0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-10 py-5"
          onPress={() => {
            props.changeMoney("D");
          }}
        >
          <Text className="text-3xl text-center">D</Text>
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
    flex: 1.5,
    justifyContent:'center',
  },
  bottomView: {
    flex: 2,
  },
  button: {
    width: SCREEN_WIDTH,
    height: 50,
    backgroundColor: theme["sky-basic"],
    alignItems: "center",
    justifyContent: "center",
  },
});
export default EnterMoney;
