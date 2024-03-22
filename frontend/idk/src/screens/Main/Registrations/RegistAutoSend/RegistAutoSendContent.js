import { Dropdown } from "react-native-element-dropdown";
import React, { useEffect, useState } from "react";

import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
// 년, 월 데이터
const yearData = [
  { label: "2024", value: 0 },
  { label: "2025", value: 1 },
  { label: "2026", value: 2 },
  { label: "2027", value: 3 },
  { label: "2028", value: 4 },
];
const monthData = [
  { label: "1", value: 0 },
  { label: "2", value: 1 },
  { label: "3", value: 2 },
  { label: "4", value: 3 },
  { label: "5", value: 4 },
  { label: "6", value: 5 },
  { label: "7", value: 6 },
  { label: "8", value: 7 },
  { label: "9", value: 8 },
  { label: "10", value: 9 },
  { label: "11", value: 10 },
  { label: "12", value: 11 },
];
// 오늘의 년도와 달
const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear();
};

const getCurrentMonth = () => {
  const date = new Date();
  return date.getMonth() + 1;
};
import theme from "../../../../style";
import BankToggle from "../../../../components/BankToggle";
import { getAccountAxios } from "../../../../API/Account";
import formattedNumber from "../../../../components/moneyFormatter";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
// 자동이체 페이지
const RegistAutoSendContent = ({ navigation }) => {
  let [bankName, setBankName] = useState("IDK은행");
  let [accountId, setAccountId] = useState("");
  let [date, setDate] = useState(15);
  let [amount, setAmount] = useState(5000);
  const today = new Date();

  // 시작 년월, 종료 년월
  const [startYear, setStartYear] = useState(getCurrentYear());
  const [startMonth, setStartMonth] = useState(getCurrentMonth());
  const [endYear, setEndYear] = useState(getCurrentYear() + 1);
  const [endMonth, setEndMonth] = useState(getCurrentMonth());
  let [showMyAccountName, setShowMyAccountName] = useState("내이름");
  let [showOtherAccountName, setShowOtherAccountName] =
    useState("자동이체 제목");
  console.log(startYear,startMonth,endYear,endMonth)
  let [settingStart, setSettingStart] = useState(false);
  let [settingEnd, setSettingEnd] = useState(false);

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
        console.log(res);
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
              value={String(date)}
              onChangeText={(text) => setDate(text)}
              keyboardType="numeric"
            />
            <Text className="text-lg font-bold">일</Text>
          </View>
        </View>

        {/* 자동이체 기간 */}
        <View style={styles.box}>
          <Text className="text-lg font-bold">자동 이체 기간</Text>
          <View className="flex-row items-center my-3">
            {/* 시작 년월 */}
            <TouchableOpacity
              onPress={() => setSettingStart(!settingStart)}
              className="border border-gray-300 rounded px-3 py-1 my-1"
            >
              <Text>시작일 설정</Text>
            </TouchableOpacity>
            {settingStart ? (
              <Picker
                defaultData={[0, 2]}
                onChangePick={(year, month, type) => {
                  if (type==="start"){
                    setStartYear(year)
                    setStartMonth(month)
                  }
                }}
                type="start"
                otherData={[endYear,endMonth]}
              />
            ) : null}
          </View>
          {/* 종료 년월 */}
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => setSettingEnd(!settingEnd)}
              className="border border-gray-300 rounded px-3 py-1 my-1"
            >
              <Text>종료일 설정</Text>
            </TouchableOpacity>
            {settingEnd ? (
              <Picker
                defaultData={[1, 2]}
                onChangePick={(year, month, type) => {
                  if (type==="end"){
                    setEndYear(year)
                    setEndMonth(month)
                  }
                }}
                type="end"
                otherData={[startYear,startMonth]}
              />
            ) : null}
          </View>
        </View>

        {/* 통장 표시 */}
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
          // 종료일 설정을 안해두고 시작보다 늦는다면 경고 띄우기
          if (settingEnd === true && (startYear > endYear
            || startYear==endYear && startMonth >endMonth
            ) ){
            alert('종료일이 시작일보다 빠를 수 없습니다')
            setEndYear(startYear)
            setEndMonth(startMonth)
          } else {
            navigation.navigate("RegistAutoSendFinish", {
              bankName,
              accountId,
              date,
              amount,
              startYear,
              startMonth,
              settingStart,
              settingEnd,
              endYear,
              endMonth,
              showMyAccountName,
              showOtherAccountName,
            });
            
          }
        }}
      >
        <Text className="text-white text-lg font-bold">등록하기</Text>
      </TouchableOpacity>
    </View>
  );
};
// 기간 픽커
const Picker = ({ defaultData, onChangePick,type, otherData }) => {
  const [yearValue, setYearValue] = useState(defaultData[0]);
  const [yearIsFocus, setYearIsFocus] = useState(false);
  const [monthvalue, setMonthValue] = useState(defaultData[1]);
  const [monthIsFocus, setMonthIsFocus] = useState(false);

  // 시작 년월이 맞는가?
  const isStartRight = function (yearvalue, monthvalue) {
    const year = Number(yearData[yearvalue].label);
    const month = Number(monthData[monthvalue].label);
    if (
      (year === getCurrentYear() && month >= getCurrentMonth()) ||
      year > getCurrentYear()
    ) {
      setYearValue(yearvalue);
      setMonthValue(monthvalue);
      onChangePick(year, month,type);
    } else {
      alert("시작일을 과거로 설정할 수 없습니다.");
      setYearValue(defaultData[0]);
      setMonthValue(defaultData[1]);
    }
  };
  
  const yearRenderItem = (item) => {
    return (
      <View style={styles.item} className="flex-row gap-3 p-3 items-center">
        <Text style={styles.textItem}>{item?.label}</Text>
      </View>
    );
  };

  const monthRenderItem = (item) => {
    return (
      <View style={styles.item} className="flex-row gap-3 p-3 items-center">
        <Text style={styles.textItem}>{item?.label}</Text>
      </View>
    );
  };

  return (
    <View className="flex-row">
      <View style={styles.dropdowncontainer}>
        {/* 년 고르기 */}
        <Dropdown
          style={[yearIsFocus && { borderColor: "blue" }]}
          selectedTextStyle={styles.selectedTextStyle}
          mode={"auto"}
          placeholder={""}
          data={yearData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          value={yearValue}
          onFocus={() => setYearIsFocus(true)}
          onBlur={() => setYearIsFocus(false)}
          activeColor={theme["sky-bright-5"]}
          onChange={(item) => {
            // 값 바꿔주기
            isStartRight(item.value, monthvalue);
            setYearIsFocus(false);
          }}
          renderItem={yearRenderItem}
          renderLeftIcon={() => (
            <View className="flex-row gap-3 items-center ml-1">
              <Text>{yearData[yearValue]?.label}</Text>
            </View>
          )}
        />
      </View>
      {/* 월 피커 */}
      <View style={styles.dropdowncontainer}>
        <Dropdown
          style={[monthIsFocus && { borderColor: "blue" }]}
          selectedTextStyle={styles.selectedTextStyle}
          mode={"auto"}
          placeholder={""}
          data={monthData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          value={monthvalue}
          onFocus={() => setMonthIsFocus(true)}
          onBlur={() => setMonthIsFocus(false)}
          activeColor={theme["sky-bright-5"]}
          onChange={(item) => {
            // 값 바꿔주기
            isStartRight(yearValue, item.value);
            setMonthIsFocus(false);
          }}
          renderItem={monthRenderItem}
          renderLeftIcon={() => (
            <View className="flex-row gap-3 items-center ml-1">
              <Text>{monthData[monthvalue]?.label}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdowncontainer: {
    backgroundColor: "white",
  },

  selectedTextStyle: {
    fontSize: 0,
  },
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
