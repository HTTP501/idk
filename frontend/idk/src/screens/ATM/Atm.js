import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../../style";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
import { useEffect, useState } from "react";
import formattedNumber from "../../components/moneyFormatter";
import {
  DepositMyAccountAxios,
  WithdrawMyAccountAxios,
  getAccountAxios,
} from "../../API/Account";
import { useFocusEffect } from "@react-navigation/native";

const keyboard = [
  {
    text: 1,
  },
  {
    text: 2,
  },
  {
    text: 3,
  },
  {
    text: 4,
  },
  {
    text: 5,
  },
  {
    text: 6,
  },
  {
    text: 7,
  },
  {
    text: 8,
  },
  {
    text: 9,
  },
  {
    text: "만",
  },
  {
    text: 0,
  },
  {
    text: "정정",
  },
];
const ATM = function ({ navigation, route }) {
  let [enterMoney, setEnterMoney] = useState(false);
  let [outMoney, setOutMoney] = useState(false);
  let [money, setMoney] = useState(0);
  let [myAccountAmount, setMyAccountAmount] = useState(0)
  let [myAccountNumber, setMyAccountNumber] = useState("")
  let [myName,setMyName] = useState("")
  const destination = { stack: "ATM", screen: "ATM" };
  // 다시 돌아올때 route 체크를 확인하고 해지한다
  useEffect(() => {

    console.log("ATM 입장", route);
    if (route?.params?.params?.data?.isChecked) {
      setMoney(route?.params?.params?.data?.money)
      if (route?.params?.params?.data?.type === "입금") {
        DepositMyAccount()
      } else if (route?.params?.params?.data?.type === "출금") {
        WithdrawMyAccount()
      }
    }
  }, [route?.params]);
  useFocusEffect(
    React.useCallback(() => {
      // 계좌 조회
      getAccount()
    }, [])
  );

  const getAccount = async () => {
    // 계좌 조회 Axios
    await getAccountAxios(
      (res) => {
        setMyAccountAmount(res.data.data.accountBalance);
        setMyAccountNumber(res.data.data.accountNumber);
        setMyName(res.data.data.userName)
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
  };

  // 입금
  const DepositMyAccount = function () {
    DepositMyAccountAxios(
      (data = { amount: Number(money) }),
      (res) => {
        console.log("성공", res.data.message);
        setEnterMoney(false)
        setOutMoney(false)
        setMoney(0)
        Alert.alert(
          "입금을 완료하였습니다.",
          "메인 페이지로 이동합니다.",
          [
            {
              text: "확인",
              onPress: () => navigation.navigate("Main"),
            },
          ]
        );
      },
      (err) => {
        console.log("실패", err);
      }
    );
  };

  // 출금
  const WithdrawMyAccount = function () {
    WithdrawMyAccountAxios(
      (data = { amount: Number(money) }),
      (res) => {
        console.log("성공", res.data.message);
        setEnterMoney(false)
        setOutMoney(false)
        setMoney(0)
        Alert.alert(
          "출금을 완료하였습니다.",
          "메인 페이지로 이동합니다.",
          [
            {
              text: "확인",
              onPress: () => navigation.navigate("Main"),
            },
          ]
        );
      },
      (err) => {
        console.log("실패", err);
      }
    );
  };
  // 돈 변경
  const changeMoney = function (num) {
    if (num === "정정") {
      setMoney(Math.floor(money / 10));
    } else if (num === "만") {
      setMoney(money * 10000);
    } else {
      setMoney(money * 10 + Number(num));
    }
  };
  useEffect(() => {
    if (outMoney && money > myAccountAmount) {
      alert("잔액 이상 출금할 수 없습니다");
      setMoney(myAccountAmount);
    } else if (enterMoney && money > 50000000) {
      alert("5천만원 이상 입금할 수 없습니다");
      setMoney(50000000);
    }
  }, [money]);
  //   버튼
  const renderItem = ({ item }) => {
    let bgColor = null;
    if (item.text === "정정") {
      bgColor = theme.red;
    } else {
      bgColor = theme["sky-bright-6"];
    }

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          changeMoney(item.text);
        }}
      >
        <View
          className="items-center rounded-lg"
          style={{
            width: SCREEN_WIDTH * (1 / 4),
            // backgroundColor:theme["sky-bright-2"]
            backgroundColor: bgColor,
            margin: 3,
            borderWidth: 2,
            borderColor: theme["sky-darkness-2"],
          }}
        >
          <Text className="text-xl py-1 font-bold">{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View className="flex">
      <View
        style={{ backgroundColor: theme["sky-bright-4"] }}
        className="h-full w-full "
      >
        <View style={{ flex: 2.5, display: "flex" }}>
          {/* 화면 */}
          <View style={{ flex: 1, backgroundColor: theme["sky-bright-6"], marginHorizontal: 30, marginTop: 100, borderRadius: 10, borderWidth: 2, borderColor: theme["sky-darkness-2"] }}>
            {/* 온라인 ATM 상단 */}
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, marginTop: 15, marginHorizontal: 15, borderRadius: 10, borderWidth: 2, borderColor: theme["sky-darkness-2"] }}>
                <Text className="text-2xl font-bold m-auto" style={{color:theme["sky-darkness-2"]}}>온라인 ATM</Text>
              </View>
            </View>

            <View style={{ flex: 4 }}>
              {enterMoney === false && outMoney === false ?
                (
                  <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                      <View style={{ flex: 1, backgroundColor: 'white', margin: 10, marginHorizontal: 15, borderRadius: 5, paddingLeft: 10, justifyContent: 'center' }}>
                        <Text className="font-bold text-2xl">원하시는 거래를</Text>
                        <Text className="font-bold text-2xl">선택하여 주십시오</Text>
                      </View>
                    </View>
                    {/* 입금버튼 */}
                    <View style={{ flex: 1 }}>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                          setEnterMoney(true);
                          setOutMoney(false);
                        }}
                        className="rounded-lg items-center"
                        style={{ flex: 1, backgroundColor: theme["sky-bright-3"], justifyContent: 'center', margin: 15 }}
                      >
                        <Text className="text-2xl font-bold">입금</Text>
                      </TouchableOpacity>

                    </View>
                    <View style={{ flex: 1 }}>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                          setOutMoney(true);
                          setEnterMoney(false);
                        }}
                        className="rounded-lg items-center"
                        style={{ flex: 1, backgroundColor: theme["sky-basic"], justifyContent: 'center', margin: 15 }}
                      >
                        <Text className="text-2xl font-bold">출금</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
                :
                (
                  <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                      <View style={{ flex: 1, backgroundColor: 'white', margin: 10, marginHorizontal: 15, marginBottom:20, borderRadius: 5, justifyContent: 'center' }}>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", padding: 20 }}>
                          <TouchableOpacity
                            onPress={() => {
                              setEnterMoney(false);
                              setOutMoney(false);
                              setMoney(0);
                            }}
                          ><Text className="rounded bg-red-400 px-5 py-1 text-lg font-bold">취소</Text></TouchableOpacity>
                          {enterMoney ?
                            <TouchableOpacity
                              onPress={() => {

                                navigation.navigate("AuthStack", {
                                  screen: "AuthPW",
                                  params: { data: { isChecked: false, type: "입금", money: money }, destination },
                                });

                              }}
                            ><Text className="rounded bg-gray-300  px-5  py-1 text-lg font-bold">입금</Text></TouchableOpacity>
                            :
                            <TouchableOpacity
                              onPress={() => {

                                navigation.navigate("AuthStack", {
                                  screen: "AuthPW",
                                  params: { data: { isChecked: false, type: "출금", money: money }, destination },
                                });
                              }}

                            ><Text className="rounded bg-gray-300  px-5  py-1 text-lg font-bold">출금</Text></TouchableOpacity>
                          }
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', paddingLeft: 20 }}>
                          <Text className="text-3xl font-bold">{myName}님</Text>
                          <Text className="text-lg font-bold">
                            IDK 은행 {myAccountNumber}
                          </Text>

                        </View>
                        <View style={{ flex: 2, justifyContent:'center' }}>
                          <View className="flex-row flex items-center mx-5">
                            <Text
                              className="font-bold text-3xl bg-gray-100 mr-2"
                              style={{ flex: 9 }}
                            >
                              {formattedNumber(money)}
                            </Text>
                            <Text className="font-bold text-2xl" style={{ flex: 1 }}>
                              원
                            </Text>
                          </View>
                          <Text className="mx-5 my-2">잔액 : {formattedNumber(myAccountAmount)}원</Text>
                        </View>

                      </View>



                    </View>
                  </View>

                )
              }


            </View>
          </View>
        </View>

        {/* 키보드 */}
        <View style={{ flex: 1 }}>
          {enterMoney || outMoney ? (
            <FlatList
              data={keyboard}
              renderItem={renderItem}
              numColumns={3}
              // className="justify-between"
              contentContainerStyle={{
                // height: SCREEN_HEIGHT * 0.35,
                marginTop: 10,
                marginBottom: 30,
                display: "flex",
                alignItems: "center",
              }}
            />
          ) : (
            <Text
              className="text-center font-bold mt-10 text-white"
              style={{ fontSize: 80 }}
            >
              ATM
            </Text>
          )}
        </View>



      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  darkblue: {
    backgroundColor: "#173D7D",
  },
});
export default ATM;

