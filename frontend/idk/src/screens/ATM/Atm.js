import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../../style";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
import { useEffect, useState } from "react";
import formattedNumber from "../../components/moneyFormatter";
import { DepositMyAccountAxios } from "../../API/Account";
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
const ATM = function () {
  let [enterMoney, setEnterMoney] = useState(false);
  let [outMoney, setOutMoney] = useState(false);
  let [money, setMoney] = useState(0);
  const myAccountAmount = 10100;
  // 입금
  const DepositMyAccount = function () {
    DepositMyAccountAxios(
      data={ amount: Number(money) },
      (res) => {
        console.log("성공", res);
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
      bgColor = theme.grey;
    }

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          changeMoney(item.text);
        }}
      >
        <LinearGradient
          colors={["#e3e3e3", "#969696"]}
          className="py-1 items-center rounded-lg"
          style={{
            width: SCREEN_WIDTH * (1 / 4),
            //   backgroundColor: bgColor,
            margin: 3,
            borderWidth: 3,
            borderColor: "#444444",
          }}
        >
          <Text className="text-2xl font-bold">{item.text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  return (
    <View className="flex">
      <LinearGradient
        colors={["#e3e3e3", "#969696"]}
        className="h-full w-full "
      >
        <View
          className="mx-10 mt-20 flex"
          style={[
            styles.darkblue,
            {
              height: SCREEN_HEIGHT * 0.56,
              borderWidth: 3,
              borderColor: "#444444",
              borderRadius: 10,
            },
          ]}
        >
          {/* // 입출금 안했을때 */}

          <View>
            {/* 온라인 ATM 제목 */}

            <View className="flex items-center m-5 border border-white py-2">
              <Text className="text-2xl font-bold text-white">온라인 ATM</Text>
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
                    <LinearGradient
                      className="items-center rounded-lg w-full py-5 mb-5"
                      colors={["#e3e3e3", "#969696"]}
                    >
                      <Text className="text-2xl font-bold">입금</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    className="w-full"
                    onPress={() => {
                      setOutMoney(true);
                      setEnterMoney(false);
                    }}
                  >
                    <LinearGradient
                      className="items-center rounded-lg w-full py-5"
                      colors={["#e3e3e3", "#969696"]}
                    >
                      <Text className="text-2xl font-bold">출금</Text>
                    </LinearGradient>
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
                      onPress={DepositMyAccount}
                    >
                      <Text className="text-lg font-bold">입금</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      className="p-1 px-5 rounded"
                      style={{ backgroundColor: theme.grey }}
                    >
                      <Text className="text-lg font-bold">출금</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View className="my-10 mx-3">
                  <Text className="text-3xl font-bold">윤예빈님</Text>
                  <Text className="text-lg font-bold">
                    IDK 은행 1234567891010
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
                <Text className="mx-3 my-2">잔액 : 10,100원</Text>
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
              height: SCREEN_HEIGHT * 0.44,
              marginTop: 10,
              marginBottom: 30,
              display: "flex",
              alignItems: "center",
            }}
          />
        ) : (
          <Text
            className="text-center font-bold mt-10"
            style={{ fontSize: 80 }}
          >
            ATM
          </Text>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  darkblue: {
    backgroundColor: "#173D7D",
  },
});
export default ATM;
