import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Animatable from 'react-native-animatable'; // 애니메이션을 위한 라이브러리 추가
import { AntDesign } from '@expo/vector-icons';

import theme from "../../../style";
import { getUserAccountAxios } from "../../../API/Account";
import BankToggle from "../../../components/BankToggle";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const EnterAccount = ({ navigation }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [transferBank, setTransferBank] = useState("IDK은행");
  const [isChecking, setIsChecking] = useState(false);
  const [accountOwner, setAccountOwner] = useState("");
  const gotoEnterMoney = async () => {
    // 사용자 조회
    getUserAccountAxios(
      { accountNumber: accountNumber, bankName: transferBank },
      (res) => {
        navigation.navigate("EnterMoney", {
          data: {
            accountNumber: accountNumber,
            transferBank: transferBank,
            memberName: res.data?.data?.memberName,
            memberId: res.data?.data?.memberId,
          },
        });
      },
      (err) => {
        Alert.alert("사용자를 찾을 수 없습니다", "", [{ text: "확인" }]);
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
        { accountNumber: text, bankName: transferBank },
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
    setAccountNumber(text)
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
      <Text style={styles.pageName} className="text-3xl font-bold">
        계좌 이체
      </Text>

      {/* 계좌이체 ~ 은행 토글 */}
      <View className="p-10 gap-10">
        {/* 은행 선택 */}
        <View>
          <Text className="text-s mb-3">은행 선택</Text>
          <BankToggle
            changeBank={(transferBank) => setTransferBank(transferBank)}
          />
        </View>
        {/* 계좌 번호 입력 */}
        <View>
          <Text className="text-s mb-3">계좌번호 입력</Text>
          <View
            className="flex-row justify-between items-end pb-3"
            style={styles.input}
          >
            <TextInput
              onChangeText={handleAccountNumber}
              value={accountNumber}
              className="text-2xl"
              keyboardType="number-pad"
              returnKeyType="next"
              placeholder="계좌번호 입력"
            />
            <TouchableOpacity onPress={() => {setAccountNumber(""), setIsChecking(false)}}>
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
      </View>

      {/* 다음 버튼*/}
      <TouchableOpacity
        disabled={!accountNumber.length > 0}
        style={[
          theme.bottomButton,
          {
            backgroundColor:
              accountNumber.length > 0
                ? theme["sky-basic"]
                : theme["sky-bright-4"],
          },
        ]}
        className="self-center"
        onPress={() => {
          // 돈 입력 페이지 이동
          gotoEnterMoney();
        }}
      >
        <Text className="text-xl font-bold text-white">다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pageName: {
    marginLeft: SCREEN_WIDTH * (1 / 10),
    marginTop: 120
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  input: {
    width: "100%",
    borderBottomWidth: 2,
    letterSpacing: 2,
  },
  accountOwnerText: {
    marginTop: 5,
    fontSize: 16,
  },
  checkingIndicator: {
    marginTop: 5,
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
});

export default EnterAccount;
