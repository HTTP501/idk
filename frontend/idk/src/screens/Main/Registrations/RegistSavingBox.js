import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Modal,
  Alert,
  ScrollView
} from "react-native";
import theme from "../../../style";
import { AntDesign } from "@expo/vector-icons";
import formattedNumber from "../../../components/moneyFormatter";
import {joinPiggyBankListAxios} from '../../../API/Saving'
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const ACCOUNT_KEY = "@account";
//
const RegistSavingBox = ({ navigation }) => {
  const pigIcon = require("../../../../assets/icons/pig.png");
  let [deposit, setDeposit] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [accountId, setAccountId] = useState(null)

  useEffect(() => {
    const getAcocuntId = async() => {
      const a = await AsyncStorage.getItem(ACCOUNT_KEY)
      setAccountId(JSON.parse(a).accountId)
    }
    getAcocuntId()
  }, [])

  //  입력값 숫자로 변경
  const changeMoney = (text) => {
    if (text.length === 0) {
      setDeposit(0);
    } else {
      const number = Number(text.replace(/[^0-9]/g, ""));
      setDeposit(number);
    }
  };
  //   저금통 가입하기 버튼
  const registFinish = () => {
    joinPiggyBankListAxios(
      {accountId: accountId, deposit: deposit},
      res => {
        setShowModal(true)
      },
      err => {
        if (err.response.data.code === 'PB401') {
          Alert.alert(
            "이미 저금통을 가입한 계좌입니다.",
            "계좌 페이지로 이동합니다.",
            [
              {
                text: "확인",
                onPress: () => navigation.navigate("Main"),
              },
            ]
          )
        } else if (err.response.data.code === 'PB402') {
          Alert.alert(
            "계좌 잔액이 부족합니다.",
            "",
            [
              {
                text: "확인",
              },
            ]
          )
        }
        setDeposit(0)
        setShowModal(false)
      }
    )
  };
  //   화면
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
        {/* 상단의 제목과 아이콘 */}
        <View style={styles.box} className="mb-16 flex-row items-center">
          <Image source={pigIcon} />
          <Text className="text-3xl font-bold pl-3">저금통</Text>
        </View>
        <View style={{ flex: 1, width: SCREEN_WIDTH * (4/5) }}>
          {/* 설명 */}
          <Explain />
          {/* 입금액 입력란 */}
          <Text className="text-2xl font-bold mt-10 mb-3">넣고 시작하기</Text>
          <View style={styles.input} className="flex-row gap-3 justify-end">
            <TextInput
              className="text-xl"
              // placeholder="100,000"
              value={formattedNumber(deposit)}
              keyboardType="numeric"
              onChangeText={(text) => changeMoney(text)}
            />
            <Text className="text-2xl font-bold">원</Text>
          </View>
        </View>
        {/* 저금통 등록 버튼 */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            registFinish();
          }}
        >
          <Text className="text-white text-lg font-bold">만들기</Text>
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
            <Text className="text-2xl font-bold mb-3">
              저금통이 등록되었습니다!
            </Text>
            <Text className="text-zinc-500 mb-8 font-bold">
            {formattedNumber(deposit)}원으로 시작해요!
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

// 설명 글귀
const Explain = () => {
  return (
    <View className="gap-2">
      <View>
        <Text>저금통 기능은 월급일마다</Text>
      </View>
      <View>
        <Text>잔고에 남아있는 잔액을 저금하는 기능이에요.</Text>
      </View>
      <View>
        <Text>남아있는 잔액을 저금하고,</Text>
      </View>
      <View>
        <Text>새롭게 한 달을 시작해보세요!</Text>
      </View>
      <View>
        <Text>저금통의 돈은 언제든</Text>
      </View>
      <View>
        <Text>자유롭게 넣고 뺄 수 있어요!</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 120,
  },
  box: {
    width: SCREEN_WIDTH * (4 / 5),
    marginBottom: 30,
  },
  input: {
    borderBottomWidth: 1,
    width: "100%",
    borderColor: theme.grey,
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

export default RegistSavingBox;
