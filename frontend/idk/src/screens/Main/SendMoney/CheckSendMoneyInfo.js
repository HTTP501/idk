import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  Keyboard 
} from "react-native";
import theme from "../../../style";
import { useState } from "react";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
import formattedNumber from "../../../components/moneyFormatter";

// 송금 확인 페이지
const CheckSendMoneyInfo = ({ navigation, route }) => {


  const money = route.params.money;
  const myAccount = route.params.myAccount;
  const otherAccount = route.params.otherAccount;
  const otherName = otherAccount.name;
  let [focusOppentIndication, setFocusOppentIndication] = useState(false);
  let [focusMyIndication, setFocusMyIndication] = useState(false);
  let [opponent, setOpponent] = useState(otherName);
  let [myName, setMyName] = useState("김대원");

  return (
    <View style={styles.container}>

      {/* 보내는 사람 데이터 */}
      <View style={styles.topView}>

        {/* 텍스트 포커스 될때 안보이게 함 */}
        {focusOppentIndication || focusMyIndication ? null : (
          <View>
            <Text className="text-3xl font-bold mb-3 ">
              {otherAccount.name}님
            </Text>
            <Text>
              {otherAccount.bankName} {otherAccount.accountId}
            </Text>
          </View>
        )}
      </View>

      {/* 보내는 금액과 잔액 */}

      <View style={styles.middleView}>
        {/* 텍스트 포커스 될때 안보이게 함 */}
      {focusOppentIndication || focusMyIndication ? null :
        <View className="items-center">
          <Text className="text-3xl font-bold mb-3">
            {formattedNumber(money)}원
          </Text>
          <Text>잔액 {formattedNumber(myAccount)}원</Text>
        </View>}
      </View>


      {/* 통장 표시  */}
      <ScrollView contentContainerStyle={styles.bottomView}>
        <View style={{ marginHorizontal: 40, marginTop: 40 }}>
          <Text>받는 분 통장 표시</Text>
          <TextInput
            onFocus={() => setFocusOppentIndication(true)}
            onBlur={() => setFocusOppentIndication(false)}
            style={styles.input}
            onChangeText={(text) => setMyName(text)}
            value={myName}
            className="text-2xl"
            returnKeyType="next"
            placeholder="받는 분 통장 표시"
          />
        </View>
        <View style={{ marginHorizontal: 40, marginTop: 40 }}>
          <Text>내 통장 표시</Text>
          <TextInput
            onFocus={() => setFocusMyIndication(true)}
            onBlur={() => setFocusMyIndication(false)}
            style={styles.input}
            onChangeText={(text) => setOpponent(text)}
            value={opponent}
            className="text-2xl"
            returnKeyType="next"
            placeholder="내 통장 표시"
          />
        </View>
      </ScrollView>


      {/* 다음 버튼 */}
      <TouchableOpacity
        style={theme.bottomButton}
        className="self-center"
        onPress={() => {
          console.log("송금 완료 페이지로 이동");
          navigation.navigate("FinishSendMoney", {
            money,
            myAccount,
            otherName,
          });
        }}>
        <Text className="text-xl font-bold text-white">다음</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
export default CheckSendMoneyInfo;
