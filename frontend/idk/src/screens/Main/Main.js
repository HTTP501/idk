import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import ToggleFilter from "./Toggle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { NestableScrollContainer } from "react-native-draggable-flatlist";

import {
  ScrollView,
  Dimensions,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";
// 컴포넌트들
import formattedNumber from "../../components/moneyFormatter";
import theme from "../../style";
import Account from "../../components/MyAccount";
import DepositList from "../../components/DepositList";
import DonPocketList from "../../components/DonPocketList";
import * as SplashScreen from "expo-splash-screen";
import { getAccountAxios } from "../../API/Account";
import { getPocketAxios } from "../../API/DonPocket";
import { getPiggyBankAxios } from "../../API/Saving";
import { getPocketListAxios } from '../../API/DonPocket'
import FilteredDonPocketList from "../../components/FilteredDonPocketList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../../components/Loading";
import PiggyBank from "../../components/PiggyBankItem";

import { useFocusEffect } from "@react-navigation/native";

// 메인 페이지
const Main = gestureHandlerRootHOC(({ navigation }) => {
  const ACCOUNT_KEY = "@account";
  let [loading, setLoading] = useState(false);
  // 저금통 데이터
  const [piggyBankData, setPiggyBankData] = useState(null);

  // Axios 데이터 불러오기
  const fetchData = async () => {
    // 계좌 조회 Axios
    await getAccountAxios(
      (res) => {
        console.log(res.data.data);
        // 스토리지에 계좌정보만 저장해주기
        const data = JSON.stringify({
          accountNumber: res.data.data.accountNumber,
          accountId: res.data.data.accountId
        });
        AsyncStorage.setItem(ACCOUNT_KEY, data)
        // 돈포켓 조회 Axios
        getPocketListAxios(
          res => {
            console.log(res.data.data.arrayPocket);
            setPocketData(res.data.data.arrayPocket)
          },
          err => {
          }
        )
        setAccount(res.data.data);
        },
      (err) => {
        // 계좌 번호가 있는지 판단해서 없으면 계좌 생성페이지로 이동
        if (err.response.data.code === "A401") {
          Alert.alert(
            "계좌번호가 없습니다.",
            "계좌 생성 페이지로 이동합니다.",
            [
              {
                text: "확인",
                onPress: () => navigation.navigate("AccountStack"),
              },
            ]
          );
        }
      }
    );
    // 저금통 조회 Axios
    await getPiggyBankAxios(
      res => {
        setPiggyBankData(res.data.data)
      },
      err => {
        setPiggyBankData(null)
      }
    )
  }


  // 화면 포커싱 시 데이터 다시 가져오기
  useFocusEffect(
    React.useCallback(() => {
      setLoading(false)
      fetchData();
      setTimeout(() => {
        setLoading(true);
      }, 700);
    }, [])
  );

  // 계좌 데이터 - 더미
  const [account, setAccount] = useState({"accountAvailableAmount": 0, "accountBalance": 0, "accountId": 4, "accountMinAmount": 0, "accountName": "IDK 우리나라 국민우대통장", "accountNumber": "1234567891010", "accountPayDate": 1});
  // 돈포켓 데이터
  const [pocketData, setPocketData] = useState([]);

  let [pocketType, setPocketType] = useState("total");

  // 필터링 된 데이터
  let [savingPocketData, setSavingPocketData] = useState(
    pocketData.filter((item) => item.pocketType === "목표저축")
  );
  let [autoTransferPocketData, setAutoTransferPocketData] = useState(
    pocketData.filter((item) => item.pocketType === "자동이체")
  );
  let [autoDebitPocketData, setAutoDebitPocketData] = useState(
    pocketData.filter((item) => item.pocketType === "자동결제")
  );

  // 돈포켓 총 금액
  const totalPocket = pocketData.reduce((acc, curr) => acc + curr.balance, 0);
  // + 버튼 눌렸는지 판단
  let [isButtenOpen, setisButtenOpen] = useState(false);

  return (
    <View className="flex-1">
      {/* 로딩이 끝나야 보여줌 */}
      {loading ? (
        <View className="bg-white" style={styles.scrollViewContent}>
          <NestableScrollContainer>
            {/* 배경 */}
            <View style={styles.back}></View>
            {/* 로고 알람 */}
            <View className="px-10 mt-10 mb-2">
              <Header navigation={navigation}/>
            </View>

            {/* 계좌 */}
            <View className="justify-center items-center">
              <Account account={account} navigation={navigation} />
            </View>

            {/* 옵션 표기 */}
            <Option
              account={account}
              totalPocket={totalPocket}
              changePocketType={(type) => setPocketType(type)}
            />
            {/* 필터된 돈포켓 */}
            {pocketType === "total" ? (
              // 전체 돈포켓과 저금통 돈포켓
              <View>
                <DonPocketList
                  navigation={navigation}
                  pocketData={pocketData}
                  changePocketOrder={(data) => setPocketData(data)}
                  fetchData={fetchData}
                />
                {piggyBankData 
                  ? <PiggyBank piggyBankData={piggyBankData} navigation={navigation}/>
                  : null
                }
              </View>
            ) : pocketType === "목표저축" ? (
              // 저축 돈포켓
              <FilteredDonPocketList
                navigation={navigation}
                filteredPocketData={savingPocketData}
                fetchData={fetchData}
              />
            ) : pocketType === "자동이체" ? (
              // 자동이체 돈포켓
              <FilteredDonPocketList
                navigation={navigation}
                filteredPocketData={autoTransferPocketData}
                fetchData={fetchData}
              />
            ) : (
              // 자동 결제 돈포켓
              <FilteredDonPocketList
                navigation={navigation}
                filteredPocketData={autoDebitPocketData}
                fetchData={fetchData}
              />
            )}

            {/* 마이데이터 연결 */}
            <TouchableOpacity
              style={[styles.goMydata, styles.shadow]}
              onPress={() => {
                navigation.navigate("CheckMyData");
              }}
            >
              <Text className="text-lg font-bold">
                다른 은행 자동이체 확인하기
              </Text>
              <AntDesign name="right" size={20} color="black" />
            </TouchableOpacity>

            {/* 버튼들 */}
            <View style={styles.buttonlist}>
              {isButtenOpen ? (
                <View>
                  <PlusButton
                    title={"목표 저축 추가하기"}
                    destination={"RegistGoalSaving"}
                    navigation={navigation}
                  />
                  <PlusButton
                    title={"자동이체 등록하기"}
                    destination={"RegistAutoSendAgree"}
                    navigation={navigation}
                  />
                  <PlusButton
                    title={"돈포켓 생성하기"}
                    destination={"RegistDonPocket"}
                    navigation={navigation}
                  />
                  <PlusButton
                    title={"저금통 가입하기"}
                    destination={"RegistSavingBox"}
                    navigation={navigation}
                  />
                  <TouchableOpacity
                    style={[styles.button, styles.shadow]}
                    onPress={() => {
                      setisButtenOpen(!isButtenOpen);
                    }}
                  >
                    <Text className="text-lg font-bold">닫기</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={[styles.button, styles.shadow]}
                  onPress={() => {
                    setisButtenOpen(!isButtenOpen);
                  }}
                >
                  <Text className="text-3xl font-bold">+</Text>
                </TouchableOpacity>
              )}
            </View>
            <StatusBar style="auto" />
          </NestableScrollContainer>
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
});
// 헤더
const Header = ({navigation}) => {
  const logo = require("../../../assets/logo/white_idk_bank_logo.png");
  return (
    <View className="flex-row justify-between items-center">
      <View>
        <Image source={logo} style={{ width: 90, resizeMode: "contain" }} />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Notification")
          console.log("알람페이지로 가기");
        }}
      >
        <MaterialCommunityIcons name="bell" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

// 옵션
const Option = ({ account, totalPocket, changePocketType }) => {
  return (
    <View className="px-7 py-3 gap-3">
      {/* 최소 보유 금액 + 월급일 */}
      <View className="flex-row justify-between">
        <View className="flex-row gap-1">
          <Text>최소 보유 금액 </Text>
          <Text className="font-bold">
            {formattedNumber(account.accountMinAmount)}원
          </Text>
        </View>
        <View className="flex-row gap-1">
          <Text>월급일 </Text>
          <Text className="font-bold">{account.accountPayDate}일</Text>
        </View>
      </View>
      {/* 돈포켓 총액, 필터 */}
      <View className="flex-row justify-between items-center">
        <View className="flex-row gap-1">
          <Text>돈포켓 </Text>
          <Text className="font-bold">{formattedNumber(totalPocket)}원</Text>
        </View>
        <View>
          <ToggleFilter
            changePocketType={(type) => {
              changePocketType(type);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const PlusButton = function ({ title, destination, navigation }) {
  // 목표 물건 params로 보낼때 오류나지말라고 넣어주는 params
  const item = {};
  return (
    <TouchableOpacity
      onPress={() => {
        if (destination === "RegistGoalSaving") {
          navigation.navigate(destination, { item });
        } else {
          navigation.navigate(destination);
        }
      }}
      style={[styles.button, styles.shadow]}
    >
      <Text className="text-lg font-bold">{title}</Text>
    </TouchableOpacity>
  );
};

// 스타일
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  back: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * (1 / 4), // 화면 높이의 1/3
    backgroundColor: theme["sky-basic"],
  },
  buttonlist: {
    // height: SCREEN_HEIGHT * (1 / 8) * 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  button: {
    height: 90,
    // height: SCREEN_HEIGHT * (1 / 8),
    width: SCREEN_WIDTH * (6 / 7),
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  goMydata: {
    height: 90,
    width: SCREEN_WIDTH * (6 / 7),
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: "center",
    padding: 12,
  },
  text: {
    fontSize: 28,
    color: "red",
  },
});
export default Main;
