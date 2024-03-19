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
import theme from "../../../style";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
import formattedNumber from "../../../components/moneyFormatter";
const RegistGoalSaving = ({ navigation, route }) => {

  let [goalName, setGoalName] = useState("");
  let [date, setDate] = useState("");
  let [term, setTerm] = useState(0);
  let [monthlyAmount, setMonthlyAmount] = useState(0);
  let [goalAmount, setGoalAmount] = useState(0);
  let [itemId, setitemId] = useState(null);
  
  // 목표 물건 받기
  useEffect(()=>{
    const item = route.params.item
    if (Object.keys(route.params.item).length !== 0){
      // 이름, 가격, id
      setGoalName(item.name)
      setGoalAmount(item.price)
      setitemId(item.id)
    }
  },[])

  // 한달 금액, 기간, 최종 금액 양방향 데이터 변경
  const calculateGoalAmount = () => {
    if (monthlyAmount && term) {
      setGoalAmount(Number(monthlyAmount) * Number(term));
    }
  };

  const calculateTerm = () => {
    if (monthlyAmount && goalAmount) {
      setTerm(Math.ceil(Number(goalAmount) / Number(monthlyAmount)));
    }
  };

  // 이체 금액 변경(한달)
  const changeMonthlyAmount = (text) => {
    if (text.length === 0) {
      setMonthlyAmount(0);
    } else {
      const number = Number(text.replace(/[^0-9]/g, ""));
      setMonthlyAmount(number);
    }
  };
  // 목표 금액 변경
  const changeGoalAmount = (text) => {
    if (text.length === 0) {
      setGoalAmount(0);
    } else {
      const number = Number(text.replace(/[^0-9]/g, ""));
      setGoalAmount(number);
    }
  };
  // 등록 완료 보내기
  const registFinish = async () => {
    // await axios
    // 보낼 데이터
    const payload = {
      name: goalName,
      date: date,
      term: term,
      monthlyAmount: monthlyAmount,
      goalAmount: goalAmount,
      itemId: itemId,
    };
    console.log(payload);
    navigation.navigate("Main");
  };
  return (
    <View style={styles.container}>
      <View style={styles.box} className="mb-16">
        <Text className="text-3xl font-bold pl-3">목표저축</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        {/* 목표 저축  */}
        <View style={styles.box}>
          <Text className="text-base font-bold">목표를 적어주세요</Text>
          <TextInput
            style={styles.input}
            value={goalName}
            onChangeText={(text) => setGoalName(text)}
            placeholder="ex) 유럽 여행, 컴퓨터 사기 등등"
          />
        </View>
        {/* 저축일 */}
        <View style={styles.box}>
          <Text className="text-base font-bold">저축일</Text>
          <View style={styles.input} className="flex-row items-center gap-1">
            <Text style={{ marginBottom: 2 }}>매월</Text>
            <TextInput
              style={[]}
              value={String(date)}
              keyboardType="numeric"
              placeholder="15"
              onChangeText={(text) => {
                setDate(text);
              }}
            />
            <Text style={{ marginBottom: 2 }}>일</Text>
          </View>
        </View>
        {/* 목표 금액 */}
        <View style={styles.box}>
          <Text className="text-base font-bold">목표 금액을 설정해주세요</Text>
          <View style={styles.input} className="flex-row gap-3 justify-end">
            <TextInput
              className="text-xl"
              value={formattedNumber(goalAmount)}
              keyboardType="numeric"
              onChangeText={(text) => changeGoalAmount(text)}
              onEndEditing={() => {
                calculateTerm;
              }}
            />
            <Text className="text-2xl font-bold">원</Text>
          </View>
        </View>
        {/* 이체 금액 입력 */}
        <View style={styles.box}>
          <Text className="text-base font-bold">이체 금액</Text>
          <View style={styles.input} className="flex-row gap-3 justify-end">
            <TextInput
              className="text-xl"
              value={formattedNumber(monthlyAmount)}
              keyboardType="numeric"
              onChangeText={(text) => changeMonthlyAmount(text)}
              onEndEditing={calculateTerm}
            />
            <Text className="text-2xl font-bold">원</Text>
          </View>
        </View>
        {/* 기간 */}
        <View style={styles.box}>
          <Text className="text-base font-bold">기간을 설정해주세요</Text>
          <View className="flex-row items-center">
            <TextInput
              style={[styles.input, { width: SCREEN_WIDTH * (1 / 5) }]}
              keyboardType="numeric"
              value={String(term)}
              onChangeText={(text) => setTerm(Number(text))}
              placeholder="20"
              onEndEditing={calculateGoalAmount}
            />
            <Text>개월</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          registFinish();
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
    width: SCREEN_WIDTH * (8 / 10),
    marginBottom: 30,
  },
  input: {
    borderBottomWidth: 1,
    width: "100%",
    height: 40,
    alignSelf: "center",
    marginTop: 10,
    borderColor: theme.grey,
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

export default RegistGoalSaving;
