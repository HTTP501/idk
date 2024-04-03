import { Dropdown } from "react-native-element-dropdown";
import React, { useEffect, useState } from "react";
import { registAutoTransferAxios } from "../../../../API/AutoTransfer";
import theme from "../../../../style";
import BankToggle from "../../../../components/BankToggle";
import { getAccountAxios } from "../../../../API/Account";
import formattedNumber from "../../../../components/moneyFormatter";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { getUserAccountAxios } from "../../../../API/Account";
import * as Animatable from 'react-native-animatable'; // 애니메이션을 위한 라이브러리 추가
import { AntDesign } from '@expo/vector-icons';

const imgMatch = {
  'KB국민은행': require("../../../../../assets/banks/KBBank.png"),
  '카카오뱅크': require("../../../../../assets/banks/KakaoBank.png"),
  '신한은행': require("../../../../../assets/banks/ShinhanBank.png"),
  'NH농협은행': require("../../../../../assets/banks/NHBank.png"),
  '하나은행': require("../../../../../assets/banks/HanaBank.png"),
  '우리은행': require("../../../../../assets/banks/WooriBank.png"),
  'IBK기업은행': require("../../../../../assets/banks/IBKBank.png"),
  '케이뱅크': require("../../../../../assets/banks/KBank.png"),
  'KB국민카드': require("../../../../../assets/banks/KBCard.png"),
  '신한카드': require("../../../../../assets/banks/ShinhanCard.png"),
  '현대카드': require("../../../../../assets/banks/HyundaiCard.png"),
  '카카오뱅크카드': require("../../../../../assets/banks/KakaoCard.png"),
  'NH농협카드': require("../../../../../assets/banks/NHCard.png"),
  '삼성카드': require("../../../../../assets/banks/SamsungCard.png"),
  '하나카드': require("../../../../../assets/banks/HanaCard.png"),
  '우리카드': require("../../../../../assets/banks/WooriCard.png"),
}

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
const getCurrentDate = () => {
  const date = new Date();
  return date.getDate();
};
// let [isLateThanToday, setIsLateThanToday] = useState(false)

// 자동이체 페이지
const RegistAutoSendContent = ({ navigation, route }) => {
  const [bankName, setBankName] = useState("IDK은행");
  const [accountId, setAccountId] = useState("");
  const [date, setDate] = useState(15);
  const [amount, setAmount] = useState(5000);
  const myDataInfo = route.params.myDataInfo

  // 시작 년월, 종료 년월
  const [startYear, setStartYear] = useState(getCurrentYear());
  const [startMonth, setStartMonth] = useState(getCurrentMonth() + 1);
  const [endYear, setEndYear] = useState(getCurrentYear() + 1);
  const [endMonth, setEndMonth] = useState(getCurrentMonth());
  const [showMyAccountName, setShowMyAccountName] = useState("");
  const [showOtherAccountName, setShowOtherAccountName] = useState("");
  const [myAccount, setMyAccount] = useState({});
  
  // 계좌 사람 판단
  const [isChecking, setIsChecking] = useState(false);
  const [accountOwner, setAccountOwner] = useState("");

  // '등록' 버튼 활성화 여부
  const isRegistButtonEnabled = showMyAccountName !== "" &&
    showOtherAccountName !== "" &&
    accountId !== "" &&
    amount > 0;
  // 이체 금액 필터링을 통해 저장
  const changeAmount = (text) => {
    if (text.length === 0) {
      setAmount(0);
    } else {
      const number = Number(text.replace(/[^0-9]/g, ""));
      setAmount(number);
    }
  };
  // params 받기
  useEffect(()=>{
    if (route?.params?.data?.isChecked){
      setBankName(route.params.data.bankName)
      setAccountId(route.params.data.accountId)
      setDate(route.params.data.date)
      setAmount(route.params.data.amount)
      setStartYear(route.params.data.startYear)
      setStartMonth(route.params.data.startMonth)
      setEndYear(route.params.data.endYear)
      setEndMonth(route.params.data.endMonth)
      setMyAccount(route.params.data.myAccount)
      registAutoSend()
    }
  },[route.params])
  useEffect(() => {
    if (date > 28 || date < 1) {
      Alert.alert("이체일은 1일에서 28일 사이만 가능합니다", "", [
        { text: "확인" },
      ]);
      setDate(1);
    }
  }, [date]);
  // 내 계좌 데이터 가져오기
  useEffect(() => {
    if (myDataInfo !== undefined) {
      setBankName(myDataInfo.orgName)
      setAccountId(myDataInfo.asset)
      setAmount(myDataInfo.claimAmount)
      setDate(myDataInfo.claimDate)
    }

    getAccountAxios(
      (res) => {
        setMyAccount(res.data.data);
        setShowOtherAccountName(res.data.data.userName)
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  // 받는 분 통장 표시 입력값 변경 이벤트 핸들러
  const handleShowOtherAccountNameChange = (text) => {
    // 10글자를 초과하는 경우
    if (text.length > 10) {
      // 경고 메시지 표시
      Alert.alert("10글자를 초과할 수 없습니다.", "", [{ text: "확인" }]);
    } else {
      // 10글자 이하인 경우에만 값을 업데이트
      setShowOtherAccountName(text);
    }
  };

  // 내 통장 표시 입력값 변경 이벤트 핸들러
  const handleShowMyAccountNameChange = (text) => {
    // 10글자를 초과하는 경우
    if (text.length > 10) {
      // 경고 메시지 표시
      Alert.alert("10글자를 초과할 수 없습니다.", "", [{ text: "확인" }]);
    } else {
      // 10글자 이하인 경우에만 값을 업데이트
      setShowMyAccountName(text);
    }
  };

  // 자동이체 등록
  const registAutoSend = async () => {
    const payload = {
      accountId: myAccount.accountId,
      toAccount: accountId,
      toAccountBank: bankName,
      amount: amount,
      date: date,
      startYearMonth: `${startYear}-${startMonth.toString().padStart(2, "0")}`,
      endYearMonth: `${endYear}-${endMonth.toString().padStart(2, "0")}`,
      showRecipientBankAccount: showOtherAccountName,
      showMyBankAccount: showMyAccountName,
    };
    await registAutoTransferAxios(
      payload,
      (res) => {
        navigation.navigate("RegistAutoSendFinish", {
          bankName,
          accountId,
          date,
          amount,
          startYear,
          startMonth,
          endYear,
          endMonth,
          showMyAccountName,
          showOtherAccountName,
          autoTransferId:res.data.data.autoTransferId
        });
      },
      (err) => {
        if (err.response.data.code === 'TR401') {
          Alert.alert(err.response.data.message, '', [{text:'확인'}])
        }
      }
    );
  };
  
  // 계좌에 있는 사람 있는지 확인
  const handleAccountNumber = (text) => {
    if (text) {
      // 조회 중 표시 상태 업데이트
      setIsChecking(true);
      
      // 사용자 조회 Axios
      getUserAccountAxios(
        { accountNumber: text, bankName: bankName },
        (res) => {
          // 조회 결과 표시 상태 업데이트
          setIsChecking(false);
          setAccountOwner(res.data?.data?.memberName);
        },
        (err) => {
          // 조회 결과 표시 상태 업데이트
          setAccountOwner('해당 계좌가 존재하지 않아요.')
          setIsChecking(false);
        }
      );
    } else {
      setAccountOwner('')
      setIsChecking(false);
    }
    setAccountId(text)
  }

  // 조회 중 표시 여부에 따라 텍스트 컴포넌트 반환 함수
  const renderCheckingIndicator = () => {
    if (isChecking) {
      return (
        <Animatable.Text
          animation="pulse" // 펄스 애니메이션
          iterationCount="infinite" // 무한 반복
          style={{...styles.checkingIndicator, alignSelf: 'flex-start'}}
        >
          조회 중...
        </Animatable.Text>
      );
    }
    return null;
  };
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems:'center' }}
      >
        <View style={styles.box} className="mb-16">
          <Text className="text-3xl font-bold pl-3">자동이체</Text>
        </View>
        <View style={styles.box}>
          <Text className="text-lg font-bold ">출금 계좌</Text>
          <View className="border p-2 mt-2 flex-row rounded border-gray-300">
            <Image source={require("../../../../../assets/logo/app_icon.png")} style={{ width: 40, height: 40, marginRight: 10}}/>
            <View>
              <Text className="text-base font-bold">{myAccount?.accountName}</Text>
              <Text>{myAccount?.accountNumber}</Text>
            </View>
          </View>
        </View>
        <View style={styles.box}>
          <Text className="text-lg font-bold mb-3">받는 분</Text>
          {/* 은행 토글 */}
          {myDataInfo === undefined ?
          <View>
            <BankToggle changeBank={(bankName) => setBankName(bankName)} />
            {/* 계좌 번호 */}
            <View
              className="flex-row justify-between items-end pb-3"
              style={styles.input}
            >
                <TextInput
                className="text-lg mt-3"
                value={accountId}
                onChangeText={handleAccountNumber}
                keyboardType="numeric"
                placeholder="ex) 110-357-123456"
                />
                <TouchableOpacity onPress={() => {setAccountId(""), setIsChecking(false), setAccountOwner('')}}>
                  <AntDesign name="closecircle" size={24} color="gray" />
                </TouchableOpacity>
            </View>
            <View style={{height:30}}>
              {/* 조회 중 표시 */}
              {renderCheckingIndicator()}
              {/* 조회 결과 표시 */}
              {accountOwner && !isChecking && (
                <View>
                  {accountOwner === '해당 계좌가 존재하지 않아요.' ?
                    <Text style={styles.accountOwnerText}>{accountOwner}</Text> :
                    <Text style={{...styles.accountOwnerText, color: theme["sky-basic"]}}>{accountOwner} 님에게 보낼게요!</Text>
                  }
                </View>
              )}
            </View>
          </View>
            :
            <View className='flex-row'>
              <Image source={imgMatch[bankName]} style={{ width: 50, height: 50}}/>
              <View>
                <Text className="text-base font-bold">{bankName}</Text>
                <Text>{accountId}</Text>
              </View>
            </View>
          }
        </View>
        <View style={styles.box}>
          <Text className="text-lg font-bold">이체 금액</Text>
          <View
            style={styles.input}
            className="flex-row items-center align-center justify-end gap-3 p-2"
          >
            {myDataInfo === undefined ?
              <TextInput
                className="text-lg"
                placeholder="5,000"
                value={formattedNumber(amount)}
                keyboardType="numeric"
                onChangeText={(text) => changeAmount(text)}
              />
              :
              <Text className='text-lg'>{formattedNumber(amount)}</Text>
            }
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
            {myDataInfo === undefined ?
            <TextInput
              className="text-lg"
              placeholder="15"
              value={String(date)}
              onChangeText={(text) => setDate(text)}
              keyboardType="numeric"
            />
            :
            <Text className='text-lg'>{date}</Text>
            }
            <Text className="text-lg font-bold">일</Text>
          </View>
        </View>

        {/* 자동이체 기간 */}
        <View style={styles.box}>
          <Text className="text-lg font-bold">자동 이체 기간</Text>
          <View className="flex-row items-center my-3">
            {/* 시작 년월 */}
            <Text>시작일 설정</Text>
            <Picker
              defaultData={[0, getCurrentMonth()]}
              date={date}
              onChangePick={(year, month, type) => {
                if (type === "start") {
                  setStartYear(year);
                  setStartMonth(month);
                }
              }}
              type="start"
              otherData={[endYear, endMonth]}
            />
          </View>
          {/* 종료 년월 */}
          <View className="flex-row items-center">
            <Text>종료일 설정</Text>
            <Picker
              defaultData={[1, getCurrentMonth() - 1]}
              date={date}
              onChangePick={(year, month, type) => {
                if (type === "end") {
                  setEndYear(year);
                  setEndMonth(month);
                }
              }}
              type="end"
              otherData={[startYear, startMonth]}
            />
          </View>
        </View>

        {/* 통장 표시 */}
        <View style={styles.box}>
          <Text className="text-lg font-bold">받는 분 통장 표시</Text>
          <TextInput
            value={showOtherAccountName}
            onChangeText={handleShowOtherAccountNameChange}
            style={styles.input}
            placeholder="ex) 홍길동"
          />
        </View>
        <View style={styles.box}>
          <Text className="text-lg font-bold">내 통장 표시</Text>
          <TextInput
            value={showMyAccountName}
            onChangeText={handleShowMyAccountNameChange}
            style={styles.input}
            placeholder="ex) 아이들과 미래재단 정기후원"
          />
        </View>
        <TouchableOpacity
          style={[styles.button,{ backgroundColor: isRegistButtonEnabled ? theme["sky-basic"] : theme["sky-bright-4"] }]}
          onPress={() => {
            // 종료일이 시작보다 늦는다면 경고 띄우기
            if (
              startYear > endYear ||
              (startYear == endYear && startMonth > endMonth)
            ) {
              Alert.alert("종료일이 시작일보다 빠를 수 없습니다", "", [
                { text: "확인" },
              ]);
              setEndYear(startYear);
              setEndMonth(startMonth);
            } else {
              registAutoSend();
            }
          }}
          disabled={!isRegistButtonEnabled}
        >
          <Text className="text-white text-lg font-bold">등록하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
// 기간 픽커
const Picker = ({ defaultData, onChangePick, type, otherData, date }) => {
  const [yearValue, setYearValue] = useState(defaultData[0]);
  const [yearIsFocus, setYearIsFocus] = useState(false);
  const [monthvalue, setMonthValue] = useState(defaultData[1]);
  const [monthIsFocus, setMonthIsFocus] = useState(false);

  // 시작 년월이 과거가 아닌가?
  const isStartRight = function (yearvalue, monthvalue) {
    const year = Number(yearData[yearvalue].label);
    const month = Number(monthData[monthvalue].label);
    if (
      (year === getCurrentYear() &&
        month === getCurrentMonth() &&
        date > getCurrentDate()) ||
      (year === getCurrentYear() && month > getCurrentMonth()) ||
      year > getCurrentYear()
    ) {
      setYearValue(yearvalue);
      setMonthValue(monthvalue);
      onChangePick(year, month, type);
    } else {
      Alert.alert("시작일을 과거로 설정할 수 없습니다.", "", [
        { text: "확인" },
      ]);
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
    marginTop: 20,
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
  accountOwnerText: {
    marginTop: 5,
    fontSize: 16,
  },
});

export default RegistAutoSendContent;
