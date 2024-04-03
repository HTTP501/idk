import React, { useRef, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import theme from "../../style";
import { phoneAxios, phoneCodeAxios } from "../../API/Member";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const SIGNUP_KEY = "@signup";

const EnterPhoneNumber = ({ route, navigation }) => {
  const textInputRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(true); // 인증번호 입력창을 보여줄지 여부
  const [verificationRequested, setVerificationRequested] = useState(false); // 인증 요청 여부
  const [verificationCode, setVerificationCode] = useState(""); // 인증 번호
  const [completeVerificationCode, setCompleteVerificationCode] =
    useState(false); // 인증 완료 여부
  const [errState,setErrState] = useState("")
  const receiveData = route.params;
  const sendData = {
    ...receiveData,
    phoneNumber: phoneNumber.replace(/[^\d]/g, ""),
  };

  const handlePhoneNumberChange = (text) => {
    // 입력된 값에서 숫자만 남기기
    const formattedText = text.replace(/[^\d]/g, "");

    // 전화번호 형식에 맞게 '-' 삽입
    let formattedPhoneNumber = "";
    if (formattedText.length < 4) {
      formattedPhoneNumber = formattedText;
    } else if (formattedText.length < 8) {
      formattedPhoneNumber =
        formattedText.substring(0, 3) + "-" + formattedText.substring(3, 7);
    } else {
      formattedPhoneNumber =
        formattedText.substring(0, 3) +
        "-" +
        formattedText.substring(3, 7) +
        "-" +
        formattedText.substring(7, formattedText.length);
    }

    // state 업데이트
    setPhoneNumber(formattedPhoneNumber);

    // 입력된 번호가 13자리인 경우 인증 요청 버튼 활성화
    if (formattedPhoneNumber.length === 13) {
      setVerificationRequested(false); // 인증 요청 상태 초기화
    }
  };

  const handleVerificationRequest = async () => {
    // 인증 번호 Axios 요청
    await phoneAxios(
      { phoneNumber: phoneNumber.replace(/[^\d]/g, "") },
      (res) => {

        // 인증 요청 로직 수행 후
        setShowVerificationInput(true); // 인증 번호 입력창 보이도록 설정
        // 아래 인증 번호 입력란으로 포커스 이동
        if (textInputRef.current) {
          textInputRef.current.focus();
        }
        setVerificationRequested(true); // 인증 요청 상태 변경

      },
      (err) => {
        setErrState(err?.response?.data?.messaage)
        if (err.response.data.code === "M404") {
          // 문자 전송 요청 실패
          Alert.alert("문자 전송 요청에 실패했습니다.", "", [{ text: "확인" }]);
        }
      }
    );
  };

  const handleVerificationCodeChange = (text) => {
    setVerificationCode(text); // 인증 번호 업데이트
  };

  const handleNext = async () => {
    // 인증 번호 확인 Axios 요청
    await phoneCodeAxios(
      {
        phoneNumber: phoneNumber.replace(/[^\d]/g, ""),
        verificationCode: verificationCode,
      },
      (res) => {
        // console.log(res.data);
        // 올바른 인증 번호를 입력했을 때
        setCompleteVerificationCode(true);
        Alert.alert("인증이 완료되었습니다.", "", [{ text: "확인" }]);
      },
      async (err) => {
        if (err.response.data.code === "M405") {
          // 인증 코드가 일치하지 않을 때 사용자에게 메시지 표시 등의 처리
          Alert.alert("올바른 인증 코드를 입력하세요.", "", [{ text: "확인" }]);
        } else if (err.response.data.code === "M401") {
          // 이미 회원가입한 사람이므로
          // AsyncStorage에 회원가입 완료했으므로 SIGNUP_KEY로 번호 저장
          const s = JSON.stringify({
            phoneNumber: phoneNumber.replace(/[^\d]/g, ""),
          });
          await AsyncStorage.setItem(SIGNUP_KEY, s);
          Alert.alert("회원 정보가 있습니다.", "로그인 페이지로 이동합니다.", [
            { text: "확인", onPress: () => navigation.navigate("AuthStack") },
          ]);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <View className="mb-16" style={{ marginLeft: SCREEN_WIDTH * (1 / 10) }}>
        <Text className="text-3xl font-bold ">휴대폰 번호</Text>
        <Text className="text-lg">휴대폰 번호를 입력해주세요.</Text>
      </View>
      <View style={styles.number}>
        <TextInput
          autoFocus={true}
          style={{ ...styles.input, marginLeft: SCREEN_WIDTH * (1 / 10) }}
          returnKeyType="done"
          placeholder="010-1234-5678"
          maxLength={13}
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          editable={!verificationRequested} // 인증 요청 후에는 편집 불가능하도록 설정
        ></TextInput>
        <TouchableOpacity
          disabled={verificationRequested || phoneNumber.length !== 13}
          style={[
            styles.certificationButton,
            !verificationRequested && phoneNumber.length === 13
              ? null
              : styles.disabled,
          ]}
          onPress={handleVerificationRequest}
        >
          <Text className="text-white text-sm">인증 요청</Text>
        </TouchableOpacity>
      </View>
      {showVerificationInput && (
        <View style={{ ...styles.number, marginBottom: 0 }}>
          <TextInput
            ref={textInputRef}
            style={{
              ...styles.input,
              fontSize: 24,
              borderBottomWidth: 0,
              marginLeft: SCREEN_WIDTH * (1 / 10),
            }}
            placeholder="인증 번호 6자리 입력"
            keyboardType="numeric"
            maxLength={6}
            value={verificationCode}
            onChangeText={(text) => handleVerificationCodeChange(text)}
            editable={!completeVerificationCode} // 인증 완료 후에는 편집 불가능하도록 설정
          />
          <TouchableOpacity
            style={{
              ...styles.certificationButton,
              marginTop: 5,
              opacity: completeVerificationCode ? 0.5 : 1,
            }}
            onPress={handleNext}
            disabled={completeVerificationCode}
          >
            <Text className="text-white text-sm">인증 확인</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* <Text>{errState}</Text> */}
      <TouchableOpacity
        style={[
          styles.button,
          { opacity: !completeVerificationCode ? 0.5 : 1 },
        ]}
        disabled={!completeVerificationCode}
        onPress={() => navigation.navigate("EnterPIN", sendData)}
      >
        <Text className="text-white text-lg font-bold">다음</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EnterPhoneNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  number: {
    marginBottom: 100,
    flexDirection: "row",
    alignItems: "center",
    height: 60,
  },
  input: {
    fontSize: 30,
    borderBottomWidth: 2,
    width: SCREEN_WIDTH * (6 / 10),
    height: 50,
    letterSpacing: 1,
    marginRight: 20,
  },
  certificationButton: {
    width: 70,
    height: 40,
    backgroundColor: theme["sky-basic"],
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 10,
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
  disabled: {
    opacity: 0.6,
  },
});
