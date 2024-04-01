import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";

import theme from "../../../style";
import localStyle from "../../../style";
import { useNavigation } from "@react-navigation/native";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import BankToggle from "../../../components/BankToggle";
import { getUserAccountAxios } from "../../../API/Account";

const EnterAccount = ({ navigation }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [transferBank, setTransferBank] = useState("IDK은행");
  const [focusOppentIndication, setFocusOppentIndication] = useState(false);
  const gotoEnterMoney = async () => {
    // 사용자 조회
    getUserAccountAxios(
      { accountNumber: accountNumber, bankName: transferBank },
      (res) => {
        console.log(res.data.data);
        navigation.navigate("EnterMoney", {
          data: {
            accountNumber: accountNumber,
            transferBank: transferBank,
            memberName: res.data?.data?.memberName,
            memberId: res.data?.data?.memberId,
          },
        });
      },
      (err) => {
        Alert.alert("사용자를 찾을 수 없습니다", "", [{ text: "확인" }]);
      }
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.pageName} className="text-3xl font-bold">
          계좌 이체
        </Text>
      
      {/* 계좌이체 ~ 은행 토글 */}
      <View className="p-10 gap-10">
        {/* 계좌 번호 입력 */}
        <View>
          <Text className="text-s mb-3">계좌번호 입력</Text>
          <View
            className="flex-row justify-between items-end pb-3"
            style={styles.input}
          >
            <TextInput
              // autoFocus={true}
              onChangeText={(text) => setAccountNumber(text)}
              value={accountNumber}
              className="text-2xl"
              keyboardType="number-pad"
              returnKeyType="next"
              placeholder="계좌번호 입력"
              onFocus={() => setFocusOppentIndication(true)}
              onBlur={() => setFocusOppentIndication(false)}
            />
            <TouchableOpacity onPress={() => setAccountNumber("")}>
              <AntDesign name="closecircle" size={24} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
        {/* 은행 선택 */}
        <View>
          <Text className="text-s mb-3">은행 선택</Text>
          <BankToggle
            changeBank={(transferBank) => setTransferBank(transferBank)}
          />
        </View>
      </View>

      {/* 다음 버튼*/}
      <TouchableOpacity
        disabled={!accountNumber.length > 0}
        style={[
          theme.bottomButton,
          {
            backgroundColor:
              accountNumber.length > 0
                ? theme["sky-basic"]
                : theme["sky-bright-4"],
          },
        ]}
        className="self-center"
        onPress={() => {
          // 돈 입력 페이지 이동
          gotoEnterMoney();
        }}
      >
        <Text className="text-xl font-bold text-white">다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pageName: {
    // position: "absolute", // 위치를 절대로 설정
    // top: 120, // 화면 하단과의 간격
    marginLeft: SCREEN_WIDTH * (1 / 10),
    marginTop:120
  },
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
});

export default EnterAccount;
