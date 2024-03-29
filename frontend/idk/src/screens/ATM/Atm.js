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
const ATM = function ({ navigation }) {
  let [enterMoney, setEnterMoney] = useState(false);
  let [outMoney, setOutMoney] = useState(false);
  let [money, setMoney] = useState(0);
  let [myAccountAmount, setMyAccountAmount] = useState(0)
  let [myAccountNumber, setMyAccountNumber] = useState("")

  const getAccount = async () => {
    // 계좌 조회 Axios
    await getAccountAxios(
      (res) => {
        setMyAccountAmount(res.data.data.accountAvailableAmount);
        setMyAccountNumber(res.data.data.accountNumber);
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
        console.log("성공", res);
        setEnterMoney(false)
        setOutMoney(false)
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
  useEffect(() => {
    getAccount()
  }, [])
  // 출금
  const WithdrawMyAccount = function () {
    WithdrawMyAccountAxios(
      (data = { amount: Number(money) }),
      (res) => {
        console.log("성공", res);
        setEnterMoney(false)
        setOutMoney(false)
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
        <View
          className="mx-10 mt-20 flex"
          style={[
            // styles.darkblue,
            {
              backgroundColor: theme["sky-bright-6"],
              height: SCREEN_HEIGHT * 0.56,
              borderWidth: 3,
              borderColor: theme["sky-darkness-2"],
              borderRadius: 10,
            },
          ]}
        >
          {/* // 입출금 안했을때 */}

          <View>
            {/* 온라인 ATM 제목 */}

            <View style={{ borderWidth: 2, borderColor: theme["sky-darkness-2"] }}
              className="flex items-center m-5 py-2 rounded-lg">
              <Text className="text-2xl font-bold" style={{ color: theme["sky-darkness-2"] }}>온라인 ATM</Text>
            </View>
            {enterMoney === false && outMoney === false ? (
              <View>
                {/* 안내 문구*/}
                <View className="flex mx-5 my-3 bg-white px-5 py-3">
                  <Text className="text-2xl font-bold">원하시는 거래를</Text>
                  <Text className="text-2xl font-bold">선택하여 주십시오</Text>
                </View>
                {/* 버튼 */}
                <View className="flex items-center mx-5 my-3 py-3">
                  <TouchableOpacity
                    activeOpacity={0.6}
                    className="w-full"
                    onPress={() => {
                      setEnterMoney(true);
                      setOutMoney(false);
                    }}
                  >
                    <View
                      className="items-center rounded-lg w-full py-5 mb-5"
                      style={{ backgroundColor: theme["sky-bright-3"] }}
                    >
                      <Text className="text-2xl font-bold">입금</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    className="w-full"
                    onPress={() => {
                      setOutMoney(true);
                      setEnterMoney(false);
                    }}
                  >
                    <View
                      className="items-center rounded-lg w-full py-5"
                      style={{ backgroundColor: theme["sky-basic"] }}
                    >
                      <Text className="text-2xl font-bold">출금</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              // {/* // 입출금시 화면 */}
              <View className="bg-white mx-5 p-3 my-3 ">
                {/* 입금 출금 취소 */}
                <View className=" flex-row justify-between">
                  <TouchableOpacity
                    onPress={() => {
                      setEnterMoney(false);
                      setOutMoney(false);
                      setMoney(0);
                    }}
                    className="p-1 px-5 rounded"
                    style={{ backgroundColor: theme.red }}
                  >
                    <Text className="text-lg font-bold text-white">취소</Text>
                  </TouchableOpacity>

                  {enterMoney ? (
                    <TouchableOpacity
                      className="p-1 px-5 rounded"
                      style={{ backgroundColor: theme.grey }}
                      onPress={() => {
                        DepositMyAccount();


                      }}
                    >
                      <Text className="text-lg font-bold">입금</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      className="p-1 px-5 rounded"
                      style={{ backgroundColor: theme.grey }}
                      onPress={() => {
                        WithdrawMyAccount();

                      }}
                    >
                      <Text className="text-lg font-bold">출금</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View className="my-10 mx-3">
                  <Text className="text-3xl font-bold">내 계좌</Text>
                  <Text className="text-lg font-bold">
                    IDK 은행 {myAccountNumber}
                  </Text>
                </View>
                <View className="flex-row flex items-center mx-3">
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
                <Text className="mx-3 my-2">잔액 : {formattedNumber(myAccountAmount)}원</Text>
              </View>
            )}
          </View>
        </View>

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
  );
};

const styles = StyleSheet.create({
  darkblue: {
    backgroundColor: "#173D7D",
  },
});
export default ATM;
