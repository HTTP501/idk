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
import { getAccountAxios } from "../../../API/Account";
// 입금액 수정 페이지
const EnterMoney = ({ navigation, route }) => {
  // 들어오자마자 계좌 조회 -> 잔액 확인
  useEffect(() => {
    getMyAccount();
  }, []);

  // 계좌 조회
  const getMyAccount = async () => {
    await getAccountAxios(
      (res) => {
        console.log(res.data.data.accountBalance);
        setMyAccount(res.data.data.accountBalance);
        setOriginAccount(res.data.data.accountBalance);
        setMyName(res.data.data.userName);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  let [transferAmount, setTransferAmount] = useState(0);
  let [originAccount,setOriginAccount] = useState(0)
  let [myAccount, setMyAccount] = useState(0);
  let [myName, setMyName] = useState("");

  const accountNumber = route.params.data.accountNumber;
  const transferBank = route.params.data.transferBank;
  const memberName = route.params.data.memberName;
  const memberId = route.params.data.memberId;
  // params data
  const data = {
    accountNumber: accountNumber,
    transferBank: transferBank,
    memberName: memberName,
    memberId: memberId,
    transferAmount: transferAmount,
    myAccount: myAccount,
    isChecked:false,
    myName:myName,
  };
  // 입금액 변경 함수
  const changeTransferAmount = function (number) {
    if (number == "00") {
      setTransferAmount(transferAmount * 100);
    } else if (number == "D") {
      const last = transferAmount % 10;
      setTransferAmount((transferAmount - last) / 10);
    } else {
      setTransferAmount(transferAmount * 10 + Number(number));
    }
  };

  // 입력한 돈이 변경될때마다 잔액 업데이트
  useEffect(() => {
    if (transferAmount > originAccount) {
      alert("잔액보다 큰 금액 인출 못함");
      setTransferAmount(0);
      setMyAccount(originAccount);
    } else {
      setMyAccount(originAccount - transferAmount);
    }
  }, [transferAmount]);

  return (
    <View style={styles.container}>
      {/* 상대방 정보 */}
      <View style={styles.topView}>
        <Text className="text-3xl font-bold mb-3 ">{memberName}님</Text>
        <Text>
          {transferBank} {accountNumber}
        </Text>
      </View>

      {/* 금액 정보 */}
      <View style={styles.middleView}>
        <View className="items-center">
          <Text className="text-3xl font-bold mb-3">
            {formattedNumber(transferAmount)}원
          </Text>
          <Text>잔액 {formattedNumber(myAccount)}원</Text>
        </View>
      </View>

      {/* 다음 버튼 + 금액 */}
      <View style={styles.bottomView}>
        {/* 다음 버튼 */}
        <TouchableOpacity
          disabled={!transferAmount>0}
          style={[styles.button,{ backgroundColor: transferAmount>0 ? theme["sky-basic"] : theme["sky-bright-4"] }]}
          
          className="bg-blue-400"
          onPress={() => {
            // 확인 페이지 이동
            navigation.navigate("CheckSendMoneyInfo", { data });
          }}
        >
          <Text className="text-xl font-bold text-white">다음</Text>
        </TouchableOpacity>
        {/* 키보드 */}
        <KeyBoard changeTransferAmount={(num) => changeTransferAmount(num)} />
      </View>
    </View>
  );
};

// 키보드
const KeyBoard = function (props) {
  return (
    <View className="flex-1">
      <View className="flex-1 flex-row justify-evenly items-center">
        <TouchableOpacity
          className="py-auto"
          onPress={() => {
            props.changeTransferAmount(1);
          }}
        >
          <Text className="text-3xl text-center">1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="py-auto"
          onPress={() => {
            props.changeTransferAmount(2);
          }}
        >
          <Text className="text-3xl text-center">2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="py-auto"
          onPress={() => {
            props.changeTransferAmount(3);
          }}
        >
          <Text className="text-3xl text-center">3</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 flex-row justify-evenly items-center">
        <TouchableOpacity
          className="py-auto"
          onPress={() => {
            props.changeTransferAmount(4);
          }}
        >
          <Text className="text-3xl text-center">4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="py-auto"
          onPress={() => {
            props.changeTransferAmount(5);
          }}
        >
          <Text className="text-3xl text-center">5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="py-auto"
          onPress={() => {
            props.changeTransferAmount(6);
          }}
        >
          <Text className="text-3xl text-center">6</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 flex-row justify-evenly items-center">
        <TouchableOpacity
          className="py-auto"
          onPress={() => {
            props.changeTransferAmount(7);
          }}
        >
          <Text className="text-3xl text-center">7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="py-auto"
          onPress={() => {
            props.changeTransferAmount(8);
          }}
        >
          <Text className="text-3xl text-center">8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className=""
          onPress={() => {
            props.changeTransferAmount(9);
          }}
        >
          <Text className="text-3xl text-center">9</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 flex-row justify-evenly items-center">
        <TouchableOpacity
          className="py-auto"
          onPress={() => {
            props.changeTransferAmount("00");
          }}
        >
          <Text className="text-3xl text-center">00</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="py-auto"
          onPress={() => {
            props.changeTransferAmount(0);
          }}
        >
          <Text className="text-3xl text-center">0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="py-auto"
          onPress={() => {
            props.changeTransferAmount("D");
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
    justifyContent: "center",
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
