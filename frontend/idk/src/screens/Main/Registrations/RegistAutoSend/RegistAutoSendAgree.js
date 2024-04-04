import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import theme from "../../../../style";
import { useNavigation } from "@react-navigation/native";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const RegistAutoSendAgree = ({ navigation, route }) => {
  let [agreeBetweenAccounts, setAgreeBetweenAccounts] = useState(false);
  let [agreeAnotherBank, setAgreeAnotherBank] = useState(false);
  const myDataInfo = route.params
  console.log(myDataInfo);

  // 모든 체크박스가 선택되었는지 확인하는 함수

  const allCheckboxesChecked = () => {
    return agreeBetweenAccounts && agreeAnotherBank;
  };
  //   전체 동의가 되어있으면 푸르고, 안되어있으면 전체 동의하기
  const allCheck = () => {
    if (allCheckboxesChecked()) {
      setAgreeBetweenAccounts(false);
      setAgreeAnotherBank(false);
    } else {
      setAgreeBetweenAccounts(true);
      setAgreeAnotherBank(true);
    }
  };
  return (
    <View style={styles.container}>
      {/* 제목 */}
      <View style={styles.box} className="mb-16">
        <Text className="text-3xl font-bold ">자동이체 약관동의</Text>
      </View>
      {/* 전체 동의 */}
      <View style={styles.box}>
        <View className="flex-row items-center">
          <Checkbox
            value={allCheckboxesChecked()}
            onValueChange={() => allCheck()}
            style={styles.checkbox}
            color={theme["sky-basic"]}
          />
          <Text className="text-xl font-bold">약관 전체동의</Text>
        </View>
      </View>
      {/* 개별 동의들 */}
      <View style={styles.box}>
        <View className="flex-row items-center">
          <Checkbox
            value={agreeBetweenAccounts}
            onValueChange={setAgreeBetweenAccounts}
            style={styles.checkbox}
            color={theme["sky-basic"]}
          />
          <Text className="text-sm w-72">
            [필수] 계좌간 자동이체 약관(2024.02.29 개정)
          </Text>
        </View>
      </View>
      <View style={styles.box}>
        <View className="flex-row items-center">
          <Checkbox
            value={agreeAnotherBank}
            onValueChange={setAgreeAnotherBank}
            style={styles.checkbox}
            color={theme["sky-basic"]}
          />
          <Text className="text-sm w-72">
            [필수] 타행자동이체 약관(2024.02.29 개정)
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { opacity: allCheckboxesChecked() ? 1 : 0.5 }, // 모든 체크박스가 선택되었을 때만 활성화
        ]}
        onPress={() => navigation.navigate("RegistAutoSendContent", {myDataInfo})}
        disabled={!allCheckboxesChecked()} // 모든 체크박스가 선택되지 않은 경우 버튼 비활성화
      >
        <Text className="text-white text-lg font-bold">다음</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistAutoSendAgree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 120,
    backgroundColor: "white",
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: 350,
    height: 80,
    justifyContent: "space-between",
  },
  notbox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: 350,
    height: 90,
  },
  checkbox: {
    marginRight: 10,
    borderRadius: 8,
    width: 30,
    height: 30,
  },
  button: {
    width: SCREEN_WIDTH * (9 / 10),
    height: 50,
    backgroundColor: theme["sky-basic"],
    alignItems: "center",
    justifyContent: "center",
    position: "absolute", // 위치를 절대로 설정
    bottom: 20, // 화면 하단과의 간격
    borderRadius: 10,
  },
  detailButton: {
    width: 70,
    height: 40,
    backgroundColor: theme.grey,
    alignItems: "center",
    justifyContent: "center",
  },
});
