import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import theme from "../../style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAccountAxios } from "../../API/Account";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const ACCOUNT_KEY = "@account";

const CreateAccount = ({ navigation }) => {
  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const [accountPassword, setaccountPassword] = useState("");
  const [accountPasswordCheck, setaccountPasswordCheck] = useState("");
  const [accountName, setaccountName] = useState("IDK우리나라국민우대통장");
  const [accountPayDate, setaccountPayDate] = useState("15");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountCreatedAt, setAccountCreatedAt] = useState(null);

  const handleFirstTextInputChange = (text) => {
    setaccountPassword(text);
    if (text.length === 4) {
      // 4글자 입력 시 두 번째 TextInput으로 포커스 이동
      secondTextInputRef.current.focus();
    }
  };

  const handleSecondTextInputChange = (text) => {
    setaccountPasswordCheck(text);
    if (text.length === 4) {
      if (accountPassword === text) {
        // 4글자 입력 시 세 번째 TextInput으로 포커스 이동
        thirdTextInputRef.current.focus();
      } else {
        setPasswordMatch(false);
      }
    }
  };

  const handleAccountNameChange = (text) => {
    setaccountName(text);
  };

  const handleAccountPayDateChange = (text) => {
    // 입력값이 숫자가 아니면 무시
    if (!/^\d*$/.test(text)) return;
    setaccountPayDate(text);
  };

  useEffect(() => {
    // accountNumber와 accountCreatedAt이 업데이트될 때마다 AsyncStorage에 저장
    const saveAccountData = async () => {
      const data = JSON.stringify({ accountNumber, accountCreatedAt });
      await AsyncStorage.setItem(ACCOUNT_KEY, data);
    };

    if (accountNumber !== "" && accountCreatedAt !== null) {
      saveAccountData();
    }
  }, [accountNumber, accountCreatedAt]);

  // 계좌 생성 Axios
  const createAccount = async () => {
    await createAccountAxios(
      {
        accountPassword: accountPassword,
        accountName: accountName,
        accountPayDate: Number(accountPayDate),
      },
      async (res) => {
        setAccountNumber(res.data.data.accountNumber);
        setAccountCreatedAt(res.data.data.accountCreatedAt);
        Alert.alert("계좌 생성이 완료되었습니다.", "", [
          {
            text: "확인",
            onPress: () => navigation.navigate("FinishCreateAccount"),
          },
        ]);
      },
      (err) => {
        console.log(err.response);
      }
    );
  };

  // '다음' 버튼 활성화 여부
  const isNextButtonEnabled =
    accountPassword.length === 4 && accountPasswordCheck.length === 4;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View className="mb-16">
          <Text className="text-3xl font-bold ">계좌 개설</Text>
        </View>
        <View style={styles.box}>
          <Text className="text-base font-bold">[필수] 비밀번호 설정</Text>
          <TextInput
            autoFocus={true}
            ref={firstTextInputRef}
            style={styles.input}
            returnKeyType="next"
            placeholder="****"
            maxLength={4}
            keyboardType="numeric"
            onChangeText={handleFirstTextInputChange}
            secureTextEntry={true} // 입력된 번호를 *로 대체하여 보여줌
          ></TextInput>
        </View>
        <View style={styles.box}>
          <Text className="text-base font-bold">[필수] 비밀번호 확인</Text>
          <TextInput
            ref={secondTextInputRef}
            style={styles.input}
            returnKeyType="next"
            placeholder="****"
            maxLength={4}
            keyboardType="numeric"
            onChangeText={handleSecondTextInputChange}
            secureTextEntry={true} // 입력된 번호를 *로 대체하여 보여줌
          ></TextInput>
          {!passwordMatch && (
            <Text style={styles.errorText}>비밀번호가 다릅니다.</Text>
          )}
        </View>
        <View style={styles.box}>
          <Text className="text-base font-bold">[선택] 계좌 별명 설정</Text>
          <TextInput
            ref={thirdTextInputRef}
            style={styles.input}
            returnKeyType="next"
            placeholder="IDK우리나라국민우대통장"
            maxLength={16}
            value={accountName}
            onChangeText={handleAccountNameChange}
          ></TextInput>
        </View>
        <View style={styles.box}>
          <Text className="text-base font-bold">[선택] 급여 이체일</Text>
          <TextInput
            style={styles.input}
            returnKeyType="next"
            placeholder="15"
            maxLength={2}
            keyboardType="numeric"
            value={accountPayDate}
            onChangeText={handleAccountPayDateChange}
          ></TextInput>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, { opacity: isNextButtonEnabled ? 1 : 0.5 }]}
        onPress={createAccount}
        disabled={!isNextButtonEnabled}
      >
        <Text className="text-white text-lg">다음</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: 80,
  },
  box: {
    width: SCREEN_WIDTH * (9 / 10),
    marginBottom: 50,
  },
  input: {
    borderBottomWidth: 1,
    width: SCREEN_WIDTH * (9 / 10),
    height: 40,
    alignSelf: "center",
  },
  button: {
    width: SCREEN_WIDTH * (9 / 10),
    height: 50,
    backgroundColor: theme["sky-basic"],
    alignItems: "center",
    justifyContent: "center",
    // position: 'absolute',
    bottom: 20, // 화면 하단과의 간격
    alignSelf: "center",
    borderRadius: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
