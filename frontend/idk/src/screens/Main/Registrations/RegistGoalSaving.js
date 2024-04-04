import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import theme from "../../../style";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
import formattedNumber from "../../../components/moneyFormatter";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { joinTargetSavingAxios } from '../../../API/TargetSaving'

const ACCOUNT_KEY = "@account";

const RegistGoalSaving = ({ navigation, route }) => {
  let [goalName, setGoalName] = useState("");
  let [date, setDate] = useState("15");
  let [term, setTerm] = useState("0");
  let [monthlyAmount, setMonthlyAmount] = useState(0);
  let [goalAmount, setGoalAmount] = useState(0);
  let [itemId, setitemId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [accountId, setAccountId] = useState(null)

  // 목표 물건 받기
  useEffect(() => {
    const item = route.params.item;
    if (Object.keys(route.params.item).length !== 0) {
      // 이름, 가격, id
      setGoalName(item.name);
      setGoalAmount(item.price);
      setitemId(item.id);
    }
    // accountId 받기
    const getAccountId = async() => {
      const a = await AsyncStorage.getItem(ACCOUNT_KEY)
      setAccountId(JSON.parse(a).accountId)
    }
    getAccountId()
  }, []);

  // 목표 기간 변경
  const changeTermAmount = (text) => {
    if (text.length === 0 || text===" ") {
      setTerm("");
    } else {
      const number = Number(text.replace(/[^0-9]/g, ""));
      if (number>600){
        Alert.alert("50년 이상의 기간은 불가능해요.","",[{ text: "확인" }])
        setTerm("")
      } else {
        setTerm(number)
      }
    }
  };
  // 목표 금액 변경
  const changeGoalAmount = (text) => {
    if (text.length === 0) {
      setGoalAmount(0);
    } else {
      const number = Number(text.replace(/[^0-9]/g, ""));
      if (number>100000000){
        Alert.alert("1억 이상의 목표 금액은 불가능해요.","",[{ text: "확인" }])
        setGoalAmount(100000000)
      } else {
        setGoalAmount(number)
      }
    }
  };

  // 한달 이체 금액 정하기
  useEffect(() => {
    const numberTerm = Number(term);
    if ((term !== " ") & (numberTerm * goalAmount !== 0)) {
      setMonthlyAmount(String(Math.ceil(goalAmount / numberTerm / 100) * 100));
      
    }
  }, [term, goalAmount]);

  // 이체 날짜 정하기
  const changeDate = function (text) {
    if (text.length === 0) {
      setDate("");
    } else {
      const number = Number(text.replace(/[^0-9]/g, ""));
      if (number < 1 || number > 28) {
        Alert.alert("이체 날짜는 1일부터 28일 사이로 설정해주세요","",[{ text: "확인" }]);
        setDate("");
      } else {
        setDate(String(number));
      }
    }
  };
  const titleConfirm = (str) => {
    // 문자열에서 공백을 모두 제거한 후 길이를 확인하여 문자가 있는지 여부를 판단합니다.
    const trimmedStr = str.replace(/\s/g, ''); // 공백 제거
    return trimmedStr.length > 0; // 문자가 있는지 여부를 반환합니다.
  };
  const numberConfirm = (data) => {
    const number = Number(data);
    if (number > 0) {
      return true;
    } else {
      return false;
    }
  };
  // 등록 완료 보내기
  const registFinish = async () => {
    if (
      titleConfirm(goalName) &&
      numberConfirm(date) &&
      numberConfirm(term) &&
      numberConfirm(monthlyAmount) &&
      numberConfirm(goalAmount)
    ) {
      // 목표저축 가입 Axios
      const payload = {
        accountId: accountId,
        name: goalName,
        date: date,
        term: term,
        monthlyAmount: monthlyAmount,
        goalAmount: term * monthlyAmount,
        itemId: itemId,
      };
      joinTargetSavingAxios(
        payload,
        res => {
          setShowModal(true);
        },
        err => {
          console.log(err);
          console.log(err.response);
        }
      )
    } else {
      // title , message, buttons 순서
      Alert.alert("빈칸을 채워주세요", "", [{ text: "확인" }]);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, width: SCREEN_WIDTH}}
      >
        <View style={{marginLeft:SCREEN_WIDTH * (1/10)}}>
          <View style={styles.box} className="mb-16">
            <Text className="text-3xl font-bold">목표저축</Text>
          </View>
          {/* 목표 저축 이름 */}
          <View style={styles.box}>
            <Text className="text-lg font-bold">목표를 적어주세요</Text>
            <TextInput
              style={styles.input}
              className="text-lg"
              value={goalName}
              onChangeText={(text) => setGoalName(text)}
              placeholder="ex) 유럽 여행, 컴퓨터 사기 등등"
            />
          </View>
          {/* 이체 날짜 */}
          <View style={styles.box}>
            <Text className="text-lg font-bold">이체 날짜</Text>
            <TextInput
              style={styles.input}
              className="text-lg"
              value={String(date)}
              keyboardType="numeric"
              onChangeText={(text) => changeDate(text)}
              placeholder="ex) 15일"
            />
          </View>

          <Text className="text-lg font-bold mb-3">나의 목표는?</Text>
          {/* 금액, 기간 설정 */}
          <View style={styles.box} className="gap-5">
            {/* 기간 */}
            <View className="flex-row gap-1 items-end">
              <TextInput
                className="text-2xl font-bold"
                value={String(term)}
                keyboardType="numeric"
                style={{ borderBottomWidth: 1, borderColor: theme.grey }}
                onChangeText={(text) =>
                  changeTermAmount(text)
                }
              />
              <Text className="text-lg font-bold">개월동안</Text>
            </View>
            {/* 목표 금액 */}
            <View className="flex-row gap-1 items-end">
              <TextInput
                className="text-2xl font-bold"
                value={formattedNumber(goalAmount)}
                keyboardType="numeric"
                style={{ borderBottomWidth: 1, borderColor: theme.grey }}
                onChangeText={(text) => changeGoalAmount(text)}
              />
              <Text className="text-lg font-bold">원 모으려면</Text>
            </View>
          </View>
          {/* 한달 이체금액 */}
          <Text className="text-lg font-bold mb-3">한달에</Text>
          <View className="flex-row gap-1 items-end mb-24">
            <Text className="text-2xl font-bold">
              {formattedNumber(Number(monthlyAmount))}원
            </Text>
            <Text className="text-lg font-bold">이체해야 해요</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={registFinish}
        >
          <Text className="text-white text-lg font-bold">등록하기</Text>
        </TouchableOpacity>
      </ScrollView>
        {/* 모달 */}
        <Modal visible={showModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                className="self-end"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              <Text className="text-2xl font-bold mb-8">
                목표 저축을 생성했습니다!
              </Text>
              <Text className="text-zinc-500 text-lg font-bold mb-4">
                {goalName} 목표를 위해
              </Text>
              <Text className="text-zinc-500 text-lg font-bold mb-12">
                {formattedNumber(Number(term * monthlyAmount))}원 만큼 모을게요!
              </Text>

              <TouchableOpacity
                style={styles.modalButton2}
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate("Main");
                }}
              >
                <Text className="text-lg font-bold">메인페이지 가기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: 120,
  },
  box: {
    width: SCREEN_WIDTH * (8 / 10),
    marginBottom: 30,
  },
  input: {
    borderBottomWidth: 1,
    width: "100%",
    // height: 40,
    paddingBottom: 5,
    alignSelf: "center",
    marginTop: 10,
    borderColor: theme.grey,
  },
  button: {
    width: SCREEN_WIDTH * (9 / 10),
    height: 50,
    backgroundColor: theme["sky-basic"],
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',
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
    borderWidth: 1,
    borderColor: theme["sky-basic"],
    width: 350,
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
  modalButton1: {
    width: 290,
    height: 60,
    backgroundColor: theme["sky-bright-6"],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  modalButton2: {
    width: 290,
    height: 60,
    backgroundColor: theme["sky-bright-2"],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default RegistGoalSaving;
