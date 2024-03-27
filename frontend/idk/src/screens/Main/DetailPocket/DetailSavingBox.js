import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
// 컴포넌트들
import theme from "../../../style";
import formattedNumber from "../../../components/moneyFormatter";
// 화면 크기
import { Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../../../components/Loading";
import {
  getPiggyBankDetailAxios,
  deletePiggyBankAxios,
} from "../../../API/Saving";

const DetailSavingBox = ({ navigation, route }) => {
  const pocketId = route.params.pocketId;
  let [loading, setLoading] = useState(false);

  // 저금통 입출금 데이터
  const [arrayTransaction, setArrayTransaction] = useState(null);

  // 저금통 잔액, id
  const [balance, setBalance] = useState(null);
  const [piggyBankId, setPiggyBankId] = useState(null);

  // 저금통 상세 조회 Axios
  const fetchPiggyBankDetail = () => {
    getPiggyBankDetailAxios(
      pocketId,
      (res) => {
        setArrayTransaction(res.data.data.arrayTransaction);
        setBalance(res.data.data.balance);
        setPiggyBankId(res.data.data.piggyBankId);
      },
      (err) => {
        if (err.response.data.code === "PB403") {
          Alert.alert("저금통이 없습니다.", "계좌 페이지로 이동합니다.", [
            {
              text: "확인",
              onPress: () => navigation.navigate("Main"),
            },
          ]);
        }
      }
    );
  };

  useEffect(() => {
    fetchPiggyBankDetail();
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, []);

  // 화면 포커싱 시 데이터 다시 가져오기
  useFocusEffect(
    React.useCallback(() => {
      fetchPiggyBankDetail();
    }, [])
  );

  return (
    <View className="flex-1">
      {loading ? (
        <ScrollView className="bg-white" style={styles.scrollViewContent}>
          {/* 배경 */}
          <View style={styles.back}>
            {/* 로고 알람 */}
            <View className="px-10 mt-10 mb-2">
              <Header navigation={navigation} piggyBankId={piggyBankId} />
            </View>

            {/* 정보 */}
            <View style={styles.info}>
              <View className="flex-row items-center">
                <Image
                  source={require("../../../../assets/logo/pig_black.png")}
                  style={{ width: 60, height: 60 }}
                />
                <Text className="text-2xl font-bold ml-5">저금통</Text>
              </View>
              <Text className="text-3xl font-bold mt-5">{balance}원</Text>
              <Text className="text-base mt-3">
                매달 월급일, 남은 잔고가 쌓인 돈이에요!
              </Text>

              <View className="flex-row justify-around my-6">
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate("MinusSavingBox", {
                      change: true,
                      pocketId,
                      balance,
                    });
                  }}
                >
                  <Text className="text-base">+ 넣기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate("MinusSavingBox", {
                      change: false,
                      pocketId,
                      balance,
                    });
                  }}
                >
                  <Text className="text-base">- 빼기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* 저금통 내역 */}
          {arrayTransaction ? (
            <DepositList arrayTransaction={arrayTransaction} />
          ) : null}
          <StatusBar style="auto" />
        </ScrollView>
      ) : (
        <Loading />
      )}
    </View>
  );
};

// 저금통 내역
const DepositList = function ({ arrayTransaction }) {
  // 1. 날짜별 맵 생성
  const dateMap = new Map();
  for (const item of arrayTransaction) {
    const date = item.createdAt.substring(0, 10); // 날짜 추출
    if (!dateMap.has(date)) {
      dateMap.set(date, []);
    }
    dateMap.get(date).push(item);
  }

  // 2. 맵을 리스트로 변환
  const dateList = Array.from(dateMap.entries());
  return (
    <View>
      {dateList.map((item, index) => {
        return <DepositOnedayList item={item} key={index} />;
      })}
    </View>
  );
};

// 날짜
const DepositOnedayList = function ({ item }) {
  const date = item[0];
  const dayitimes = item[1];
  // console.log(date,dayitimes);
  return (
    <View>
      <Text className="ml-8 mb-2 text-xs">{date}</Text>
      {dayitimes.map((item, index) => {
        return <DepositItem item={item} key={index} />;
      })}
    </View>
  );
};

// 날짜에 대한 아이템
const DepositItem = function ({ item }) {
  const date = new Date(item.createdAt);
  // 시간 추출
  const hours = date.getHours();
  const minutes = date.getMinutes();
  // 12시간 형식으로 변환 (오전/오후 표시 없음)
  const time = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
  return (
    <View className="flex-row gap-3 px-8 py-3">
      <View>
        <Image
          source={require("../../../../assets/icons/money.png")}
          style={{ width: 50, height: 50 }}
        />
      </View>
      <View className="flex-grow">
        <Text>{item.content}</Text>
        <Text className="text-xs">{time}</Text>
      </View>
      <View className="items-end">
        <Text
          style={
            item.content === "입금"
              ? { color: theme["sky-basic"] }
              : { color: "red" }
          }
        >
          {formattedNumber(item.amount)}원
        </Text>
        <Text>{formattedNumber(item.balance)}원</Text>
      </View>
    </View>
  );
};

// 헤더
const Header = ({ navigation, piggyBankId }) => {
  const [showModal, setShowModal] = useState(false);

  // 저금통 해지 Axios
  const deleteDonPocket = () => {
    deletePiggyBankAxios(
      piggyBankId,
      (res) => {
        Alert.alert(
          "저금통 해지에 성공했습니다.",
          "계좌 페이지로 이동합니다.",
          [
            {
              text: "확인",
              onPress: () => navigation.navigate("Main"),
            },
          ]
        );
      },
      (err) => {
        if (err.response.data.code === "PB403") {
          Alert.alert("저금통이 없습니다.", "계좌 페이지로 이동합니다.", [
            {
              text: "확인",
              onPress: () => navigation.navigate("Main"),
            },
          ]);
        }
      }
    );
    setShowModal(false);
  };
  const logo = require("../../../../assets/logo/color_idk_bank_logo.png");
  return (
    <View className="flex-row justify-between items-center">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Main");
        }}
      >
        <Image source={logo} style={{ width: 90, resizeMode: "contain" }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Text className="text-lg">해지하기</Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text className="text-2xl font-bold mb-3">저금통을</Text>
            <Text className="text-2xl font-bold mb-3">해지하시겠습니까?</Text>
            <TouchableOpacity
              style={styles.modalButton1}
              onPress={deleteDonPocket}
            >
              <Text className="text-lg font-bold">해지하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton2}
              onPress={() => {
                setShowModal(false);
              }}
            >
              <Text className="text-lg font-bold">유지하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// 스타일
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  back: {
    backgroundColor: theme["sky-bright-6"],
    marginBottom: 30,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  info: {
    marginTop: 40,
    alignSelf: "center",
    width: SCREEN_WIDTH * (8 / 10),
    justifyContent: "center",
  },
  text: {
    fontSize: 28,
    color: "red",
  },
  lock: {
    position: "absolute",
    end: 20,
    top: 20,
  },
  setting: {
    position: "absolute",
    end: 20,
    bottom: 10,
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
  button: {
    backgroundColor: theme["light-grey"],
    width: 80,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default DetailSavingBox;
