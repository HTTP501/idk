import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import theme from "../../style";
import { passwordAxios } from "../../API/Account";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const AuthPW = ({ navigation, route }) => {
  const [password, setPassword] = useState("");
  const [isPassed, setIsPassed] = useState(false)
  const destination = route?.params.destination;
  const data = route?.params?.data;

  useEffect(() => {

    if (isPassed === true) {
      data.isChecked = true
      console.log(data);
      navigation.navigate(destination.stack, {
        screen: destination.screen,
        params: { data },
      });
    }
  }, [isPassed]);

  // 숫자 입력 시 호출되는 함수
  const handlePWChange = (text) => {
    // 입력값이 숫자가 아니면 무시
    if (!/^\d*$/.test(text)) return;
    // 숫자만 입력받도록 필터링
    const numericText = text.replace(/[^\d]/g, "");
    // 입력된 숫자가 4자리인지 확인
    if (numericText.length === 4) {
      // 4자리인 경우 자동으로 확인
      verifyPassword(numericText);
    } else {
      // 6자리가 아닌 경우 현재 입력된 값을 상태에 업데이트
      setPassword(numericText);
    }
  };

  // 확인 함수
  const verifyPassword = async (numericText) => {
    passwordAxios(
      {
        password: numericText,
      },
      async (res) => {
        console.log(res.data.message);
        
        Alert.alert("인증이 완료되었습니다.", "", [
          {
            text: "확인",
            onPress: () => {
              setIsPassed(true)
            },
          },
        ]);
        // 입력된 비밀번호 초기화
        setPassword("");
      },
      (err) => {
        if (err.response.data.code === "M402") {
          Alert.alert("존재하지 않는 회원입니다.", "", [{ text: "확인" }]);
        } else if (err.response.data.code === "A404") {
          Alert.alert("유효하지 않은 비밀번호입니다.", "", [{ text: "확인" }]);
        }
        // 입력된 비밀번호 초기화
        setPassword("");
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text className="text-3xl font-bold mb-4 text-white">
        계좌 비밀번호 인증
      </Text>
      <Text className="text-lg mb-24 text-white">
        숫자 4자리를 입력해주세요
      </Text>
      <TextInput
        autoFocus={true}
        placeholderTextColor={"white"}
        style={styles.input}
        returnKeyType="next"
        placeholder="****"
        maxLength={4}
        keyboardType="numeric"
        secureTextEntry={true} // 입력된 번호를 *로 대체하여 보여줌
        value={password}
        onChangeText={handlePWChange} // 입력 시 핸들러 호출
      />
    </View>
  );
};

export default AuthPW;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme["sky-basic"],
  },
  input: {
    fontSize: 50,
    textAlign: "center",
    width: 350,
    marginBottom: 100,
    letterSpacing: 10,
    color: "white",
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
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 350,
    marginTop: 20,
  },
  modalButton: {
    width: 170,
    height: 50,
    backgroundColor: theme["sky-basic"],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
