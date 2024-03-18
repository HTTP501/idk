import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

import theme from "../../../style";
import localStyle from "../../../style";
import { useNavigation } from "@react-navigation/native";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const EnterAccount = ({ navigation }) => {
  const [otherAccount, setOtherAccount] = useState("");
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
            style={styles.input}>
            <TextInput
              autoFocus={true}
              onChangeText={(text) => setOtherAccount(text)}
              value={otherAccount}
              className="text-2xl"
              keyboardType="number-pad"
              returnKeyType="next"
              placeholder="계좌번호 입력"
            />
            <TouchableOpacity onPress={()=>setOtherAccount("")}>
            <AntDesign name="closecircle" size={24} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
        {/* 은행 선택 */}
        <View >
          <Text className="text-s mb-3">은행 선택</Text>
          <Text className="text-2xl">은행 토글</Text>
        </View> 
      </View>

      {/* 다음 버튼*/}
      <TouchableOpacity
        style={theme.bottomButton}
        className="self-center"
        onPress={() => {
          // 돈 입력 페이지 이동
          navigation.navigate("EnterMoney",{otherAccount});
        }}
      >
        <Text className="text-xl font-bold text-white">다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pageName: {
    position: "absolute", // 위치를 절대로 설정
    top: 120, // 화면 하단과의 간격
    marginLeft: SCREEN_WIDTH * (1 / 10),
  },
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

});

export default EnterAccount;
