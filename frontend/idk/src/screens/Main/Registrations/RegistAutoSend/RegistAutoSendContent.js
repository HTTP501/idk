import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import theme from "../../../../style";
import BankToggle from "../../../../components/BankToggle";
import { getAccountAxios } from "../../../../API/Account";
import formattedNumber from "../../../../components/moneyFormatter";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const RegistAutoSendContent = ({ navigation }) => {
  let [bankName, setBankName] = useState("IDK은행");
  let [accountId, setAccountId] = useState("");
  let [date, setDate] = useState("");
  let [amount, setAmount] = useState("");
  const today = new Date();

  let [startYear, setStartYear] = useState(today.getFullYear());
  let [startMonth, setStartMonth] = useState(today.getMonth() + 1);
  let [endYear, setEndYear] = useState(today.getFullYear() + 1);
  let [endMonth, setEndMonth] = useState(today.getMonth() + 1);
  let [showMyAccountName, setShowMyAccountName] = useState("내이름");
  let [showOtherAccountName, setShowOtherAccountName] = useState("자동이체 제목");
  let [isEnd, setIsEnd] = useState(false);
  // 이체 금액 필터링을 통해 저장
  const changeAmount = (text) => {
    if (text.length === 0) { 
      setAmount(0);
    } else {
      const number = Number(text.replace(/[^0-9]/g, ""));
      setAmount(number);
    }
  };
  let [myAccount, setMyAccount] = useState({});
  // 내 계좌 데이터 가져오기
  useEffect(() => {
    getAccountAxios(
      (res) => {
        // console.log(res.data.data)
        setMyAccount(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.box} className="mb-16">
        <Text className="text-3xl font-bold pl-3">자동이체</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.box}>
          <Text className="text-lg font-bold ">출금 계좌</Text>
          <View className="border p-2 mt-2 rounded border-gray-300">
            <Text className="mb-2">{myAccount?.accountName}</Text>
            <Text>{myAccount?.accountNumber}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <Text className="text-lg font-bold mb-3">받는 분</Text>
          {/* 은행 토글 */}
          <BankToggle changeBank={(bankName) => setBankName(bankName)} />
          {/* 계좌 번호 */}
          <TextInput
            className="text-lg mt-3"
            value={accountId}
            onChangeText={(text) => setAccountId(text)}
            keyboardType="numeric"
            style={styles.input}
            placeholder="계좌번호"
          />
        </View>
        <View style={styles.box}>
          <Text className="text-lg font-bold">이체 금액</Text>
          <View
            style={styles.input}
            className="flex-row items-center align-center justify-end gap-3 p-2"
          >
            <TextInput
              className="text-lg"
              placeholder="5,000"
              value={formattedNumber(amount)}
              keyboardType="numeric"
              onChangeText={(text) => changeAmount(text)}
            />
            <Text className="text-lg font-bold">원</Text>
          </View>
        </View>
        {/* 자동이체 주기 */}
        <View style={styles.box}>
          <Text className="text-lg font-bold">자동 이체 주기</Text>
          <View
            style={styles.input}
            className="flex-row items-center align-center justify-end gap-3 p-2"
          >
            <Text className="text-lg font-bold">매월</Text>
            <TextInput
              className="text-lg"
              placeholder="15"
              value={date}
              onChangeText={(text) => setDate(text)}
              keyboardType="numeric"
            />
            <Text className="text-lg font-bold">일</Text>
          </View>
        </View>

        {/* 자동이체 기간 */}
        <View style={styles.box}>
          <Text className="text-lg font-bold">자동 이체 기간</Text>
          <View className="flex-row justify-between gap-3 mt-3 items-center">
            {/* 시작 년월 */}
            <View className="flex-1 flex-row justify-evenly items-center">
              <TextInput
                value={String(startYear)}
                onChangeText={(text) => setStartYear(text)}
                className="text-lg"
                keyboardType="numeric"
              />
              <Text>/</Text>
              <TextInput
                value={String(startMonth)}
                onChangeText={(text) => setStartMonth(text)}
                className="text-lg"
                keyboardType="numeric"
              />
            </View>
            <Text>~</Text>
            {/* 종료 년월 */}
            {isEnd ? (
              <View className="flex-1 flex-row justify-evenly items-center">
                <TextInput
                  value={String(endYear)}
                  onChange={(text) => setEndYear(text)}
                  className="text-lg"
                  keyboardType="numeric"
                />
                <Text>/</Text>
                <TextInput
                  value={String(endMonth)}
                  onChange={(text) => setEndMonth(text)}
                  className="text-lg"
                  keyboardType="numeric"
                />
              </View>
            ) : (
              <View className="flex-1 flex-row justify-evenly items-center">
                <TouchableOpacity
                  onPress={() => setIsEnd(!isEnd)}
                  className="border border-gray-300 rounded px-3 py-1"
                >
                  <Text>종료일 설정</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View style={styles.box}>
          <Text className="text-lg font-bold">받는 분 통장 표시</Text>
          <TextInput
            value={showMyAccountName}
            onChangeText={(text) => {
              setShowMyAccountName(text);
            }}
            style={styles.input}
            placeholder="내 이름"
          />
        </View>
        <View style={styles.box}>
          <Text className="text-lg font-bold">내 통장 표시</Text>
          <TextInput
            value={showOtherAccountName}
            onChangeText={(text) => {
              setShowOtherAccountName(text);
            }}
            style={styles.input}
            placeholder="아이들과 미래재단 정기후원"
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("RegistAutoSendFinish",{
            bankName,accountId,date,amount,startYear,startMonth,endYear,endMonth,showMyAccountName,showOtherAccountName
          })
        }}
      >
        <Text className="text-white text-lg font-bold">등록하기</Text>
      </TouchableOpacity>
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
    width: SCREEN_WIDTH * (4 / 5),
    marginBottom: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: theme["grey"],
    width: SCREEN_WIDTH * (4 / 5),
    // height: 40,
    paddingVertical: 10,
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
});

export default RegistAutoSendContent;
