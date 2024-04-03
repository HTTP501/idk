import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import ToggleFilter from "./Toggle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { NestableScrollContainer } from "react-native-draggable-flatlist";
import EventSource from "react-native-sse";

// const options = {
//   headers: {
//     Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInBob25lTnVtYmVyIjoiMDEwMjI5OTU0MTQiLCJpYXQiOjE3MTIxMzIyNjcsImV4cCI6MTcxMjEzNDA2N30.xEXPMlv7N5_JMIl4vStqYQfyXd5yh9y_7l4KOvdk7zY`,
//   },
// };
// const es = new EventSource(`https://j10a501.p.ssafy.io/api/sse/sub/1000`, options);

// es.addEventListener("open", (event) => {
//   console.log("Open SSE connection.");
// });

// // es.addEventListener("date", (event) => {
// //   console.log("New message event:", event.data);
// // });

// // es.addEventListener("sse", (event) => {
// //   console.log("New message event:", event.data);
// // });

// es.onmessage = (event) => console.log(event);

// es.addEventListener("error", (event) => {
//   if (event.type === "error") {
//     console.error("Connection error:", event.message);
//   } else if (event.type === "exception") {
//     console.error("Error:", event.message, event.error);
//   }
// });

// es.addEventListener("close", (event) => {
//   console.log("Close SSE connection.");
// });

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
import { getPocketListAxios } from "../../API/DonPocket";
import FilteredDonPocketList from "../../components/FilteredDonPocketList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PiggyBank from "../../components/PiggyBankItem";

import { useFocusEffect } from "@react-navigation/native";
import Loading from "../../components/Loading";
import { changeDonPocketOrderAxios } from "../../API/DonPocket";
import RNEventSource from "react-native-event-source";
import { callFiveSecond } from "../../API/PayRequest";

const ACCOUNT_KEY = "@account";
const AUTH_KEY = "@auth";

// 메인 페이지
const Main = gestureHandlerRootHOC(({ navigation }) => {
  let [loading, setLoading] = useState(false);
  // 필터링 된 데이터
  const [savingPocketData, setSavingPocketData] = useState(null);
  const [autoTransferPocketData, setAutoTransferPocketData] = useState(null);
  const [autoDebitPocketData, setAutoDebitPocketData] = useState(null);
  // 저금통 데이터
  const [piggyBankData, setPiggyBankData] = useState(null);
  const [totalPocket, setTotalPocket] = useState(0);

  // SSE 에서 받은 날짜를 저장할 상태 선언
  const [receivedDate, setReceivedDate] = useState(" ");
  const [myAccountId, setMyAccountId] = useState(null);
  const [myAccessToken, setMyAccessToken] = useState(null);
  const [myMemberId, setMyMemberId] = useState(null)
  const [systemDate, setSystemDate] = useState(null)
  // useEffect(() => {
  //   const callAccess = async () => {
  //     const myAccess = await AsyncStorage.getItem("@auth");
  //     setMyAccessToken(myAccess);
  //   };

  //   callAccess();
  // }, [navigation]);

  // useEffect(() => {
  //   if (myAccessToken !== null) {
  //     console.log("called");
  //     console.log(JSON.parse(myAccessToken).accessToken);

  //     // setisSseCalled(true);

  //     const baseURL = "https://j10a501.p.ssafy.io/api";
  //     const options = {
  //       headers: {
  //         Connection: "keep-alive",
  //         "Content-Type": "application/json",
  //         "Cache-Control": "no-cache",
  //         "Access-Control-Allow-Origin": "*",
  //         "X-Accel-Buffering": "no",
  //         Authorization: `Bearer ${JSON.parse(myAccessToken).accessToken}`,
  //       },
  //     };
  //     const eventSource = new RNEventSource(`${baseURL}/sse/sub/99`, options);

  //     // eventSource.onmessage = function (event) {
  //     //   console.log(event.type);
  //     //   console.log(event.data);
  //     //   // data 사용
  //     // };
  //     eventSource.onError = function (event) {
  //       console.log(event.type);
  //       console.log("온에러", event);
  //       // data 사용
  //     };

  //     eventSource.onOpen = function (event) {
  //       console.log("나 연결했다");
  //     };

  //     eventSource.addEventListener("open", function (event) {
  //       console.log(event.type); // message
  //       console.log(event.data);
  //     });
  //     eventSource.addEventListener("sse", function (event) {
  //       console.log(event.type); // message
  //       console.log(event.data);
  //     });
  //     eventSource.addEventListener("update", function (event) {
  //       console.log(event.type); // message
  //       console.log("update메세지", event.data);

  //       // 업데이트 이벤트 인식

  //       // 사용자가 MAIN 화면에 있을 때만 MAIN API 요청
  //     });
  //     eventSource.addEventListener("date", function (event) {
  //       console.log(event.type); // message
  //       console.log(event.data);
  //     });
  //     eventSource.addEventListener("error", function (event) {
  //       console.log("여기서 에러", event.type); // message
  //       console.log(event);
  //     });
  //     eventSource.addEventListener("message", function (event) {
  //       console.log(event.type); // message
  //       console.log(event.data);
  //     });
  //     return () => {
  //       eventSource.close();
  //     };
  //   }
  // }, [myAccessToken]);



  // Axios 데이터 불러오기
  const fetchData = async () => {
    // 계좌 조회 Axios
    await getAccountAxios(
      (res) => {
        // 스토리지에 계좌정보만 저장해주기
        const data = JSON.stringify({
          accountNumber: res.data.data.accountNumber,
          accountId: res.data.data.accountId,
        });
        AsyncStorage.setItem(ACCOUNT_KEY, data);
        // 돈포켓 조회 Axios
        getPocketListAxios(
          (res) => {
            if (myMemberId === null ){

              setMyMemberId(res?.data?.data?.memberId)
            }
            setPocketData(res.data.data.arrayPocket);
            setSavingPocketData(
              res.data.data.arrayPocket.filter(
                (item) => item.pocketType === "목표저축"
              )
            );
            setAutoTransferPocketData(
              res.data.data.arrayPocket.filter(
                (item) => item.pocketType === "자동이체"
              )
            );
            setAutoDebitPocketData(
              res.data.data.arrayPocket.filter(
                (item) => item.pocketType === "자동결제"
              )
            );
          },
          (err) => { }
        );
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
      (res) => {
        setPiggyBankData(res.data.data);
      },
      (err) => {
        setPiggyBankData(null);
      }
    );
  };

  useEffect(() => {
    const t =
      pocketData.reduce((acc, curr) => acc + curr.balance, 0) +
      piggyBankData?.balance;
    if (typeof t == Number) {
      setTotalPocket(t);
    }
    console.log(
      pocketData.reduce((acc, curr) => acc + curr.balance, 0) +
      piggyBankData?.balance
    );
  }, [pocketData]);

  // 화면 포커싱 시 데이터 다시 가져오기
  useFocusEffect(
    React.useCallback(() => {
      setLoading(false);
      fetchData();
      setTimeout(() => {
        setLoading(true);
      }, 700);
    }, [])
  );

  // 멤버 Id 받아오면 interval 실행
  useEffect(() => {
    let count = 0;
    const intervalId = setInterval(() => {
      fetchData()
      callFiveSecond(res => { 
        setSystemDate(res?.data?.data?.systemDate)
      }, err => {
        console.log(err)
      })
      count += 5;
      if (count >= 900) {
        clearInterval(intervalId);
      }
    }, 5000);
  }, [myMemberId])
  // 계좌 데이터 - 더미
  const [account, setAccount] = useState({
    accountAvailableAmount: 0,
    accountBalance: 0,
    accountId: 4,
    accountMinAmount: 0,
    accountName: "IDK 우리나라 국민우대통장",
    accountNumber: "",
    accountPayDate: 1,
  });
  // 돈포켓 데이터
  const [pocketData, setPocketData] = useState([]);

  let [pocketType, setPocketType] = useState("total");

  // 포켓 순서 바꾸기
  const changePocketOrder = async function (data) {
    setPocketData(data);
    let orderedId = [];
    await data.map((item) => {
      orderedId.push(item.pocketId);
    });
    console.log(orderedId);
    changeDonPocketOrderAxios(
      { arrayPocketId: orderedId },
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  // 돈포켓 총 금액

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
              <Header navigation={navigation} systemDate={systemDate} />
            </View>

            {/* 계좌 */}
            <View className="justify-center items-center">
              <Account
                account={account}
                navigation={navigation}
                totalPocket={totalPocket}
              />
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
                  changePocketOrder={(data) => changePocketOrder(data)}
                  fetchData={fetchData}
                />
                {piggyBankData ? (
                  <PiggyBank
                    piggyBankData={piggyBankData}
                    navigation={navigation}
                  />
                ) : null}
              </View>
            ) : pocketType === "saving" ? (
              // 저축 돈포켓
              <FilteredDonPocketList
                navigation={navigation}
                filteredPocketData={savingPocketData}
                fetchData={fetchData}
              />
            ) : pocketType === "autoTransfer" ? (
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
                  {/* 저금통 가입시 안보여주기 */}
                  {piggyBankData ? null : (
                    <PlusButton
                      title={"저금통 가입하기"}
                      destination={"RegistSavingBox"}
                      navigation={navigation}
                    />
                  )}
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
const Header = ({ navigation, systemDate }) => {
  
  const dateObj = new Date(systemDate);
  const month = dateObj.getMonth() + 1; // getMonth() 메서드는 0부터 시작하므로 1을 더합니다.
  const day = dateObj.getDate();
  const logo = require("../../../assets/logo/white_idk_bank_logo.png");
  return (
    <View className="flex-row justify-between items-center">
      <View>
        <Image source={logo} style={{ width: 90, resizeMode: "contain" }} />
      </View>
      <Text className="text-2xl text-white font-bold">{month}월 {day}일</Text>
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
    justifyContent: "space-around",
    alignItems: "center",
    padding: 12,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 28,
    color: "red",
  },
});
export default Main;
