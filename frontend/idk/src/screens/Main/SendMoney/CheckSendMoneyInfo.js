import React from "react";
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
import { useEffect, useState } from "react";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
import formattedNumber from "../../../components/moneyFormatter";
import { DepositOtherAccountAxios } from "../../../API/Account";
import { useFocusEffect } from "@react-navigation/native";
// 송금 확인 페이지
const CheckSendMoneyInfo = ({ navigation, route }) => {
  const transferAmount = route.params.data.transferAmount;
  const myAccount = route.params.data.myAccount;
  const accountNumber = route.params.data.accountNumber;
  const transferBank = route.params.data.transferBank;
  const memberName = route.params.data.memberName;
  const memberId = route.params.data.memberId;
  const otherName = memberName;
  let [focusOppentIndication, setFocusOppentIndication] = useState(false);
  let [focusMyIndication, setFocusMyIndication] = useState(false);
  let [receiverPaymentContent, setReceiverPaymentContent] = useState(otherName);
  let [myPaymentContent, setMyPaymentContent] = useState("");
  // 계좌 비밀번호 확인
  const checkPW = ()=>{
    navigation.navigate("AuthStack",{screen:'AuthPW',params:{data:route.params.data, destination:{stack:'MainStack',screen:"CheckSendMoneyInfo"}}})
  }
  // 이체 
  const transferMoney = async()=>{
    // 이체 axios
    await DepositOtherAccountAxios(
      data={
          "receiverId": memberId,
          "accountNumber": accountNumber,
          "transferBank": transferBank,
          "transferAmount": transferAmount,
          "receiverPaymentContent": receiverPaymentContent,
          "myPaymentContent": myPaymentContent
      },
      res =>{
        console.log(res.data.message)
      },
      err=>{
        console.log(err)
      }
    )
      // // 송금 완료 페이지로 이동
      navigation.navigate("FinishSendMoney", {
        transferAmount,
        myAccount,
        otherName:memberName,
      });
    
  }

  // 다시 네비게이트 되었을때 인증확인하고 이체 요청 보내주기
  useFocusEffect(
    React.useCallback(() => {
      console.log('계좌 비번 인증 성공했음 ')
      console.log(route.params)
      if (route.params?.data.isChecked){
        transferMoney()
      }
    }, [])
  );
  return (
    <View style={styles.container}>

      {/* 보내는 사람 데이터 */}
      <View style={styles.topView}>

        {/* 텍스트 포커스 될때 안보이게 함 */}
        {focusOppentIndication || focusMyIndication ? null : (
          <View>
            <Text className="text-3xl font-bold mb-3 ">
              {memberName}님
            </Text>
            <Text>
              {transferBank} {accountNumber}
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
            {formattedNumber(transferAmount)}원
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
            onChangeText={(text) => setMyPaymentContent(text)}
            value={myPaymentContent}
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
            onChangeText={(text) => setReceiverPaymentContent(text)}
            value={receiverPaymentContent}
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
          checkPW()
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
