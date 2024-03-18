import React, { useRef, useState } from "react";
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
const RegistGoalSaving = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.box} className="mb-16">
        <Text className="text-3xl font-bold pl-3">목표저축</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.box}>
          <Text className="text-base font-bold">목표를 적어주세요</Text>
          <TextInput
            style={styles.input}
            placeholder="ex) 유럽 여행, 컴퓨터 사기 등등"
          />
        </View>
        <View style={styles.box}>
          <Text className="text-base font-bold">저축일</Text>
          <TextInput style={styles.input} 
          placeholder="매월넣을날짜변수"/>
        </View>
        <View style={styles.box}>
          <Text className="text-base font-bold">이체 금액</Text>
          <TextInput style={styles.input} 
          placeholder="100,000원"/>
        </View>
        <View style={styles.box}>
          <Text className="text-base font-bold">기간을 설정해주세요</Text>
          <View className="flex-row items-center">
            <TextInput style={[styles.input,{width:SCREEN_WIDTH*(1/5)}]} 
            keyboardType="numeric"
            placeholder="개월수"
            />
            <Text>개월</Text>
          </View>
        </View>

        <View style={styles.box}>
          <Text className="text-base font-bold">목표 금액을 설정해주세요</Text>
          <TextInput style={styles.input} 
          placeholder="999,999,999원"
          />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button}
      onPress={()=>{
        navigation.navigate("Main")
      }}>
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
    width: SCREEN_WIDTH * (9 / 10),
    marginBottom: 30,
  },
  input: {
    borderBottomWidth: 1,
    width: SCREEN_WIDTH * (9 / 10),
    height: 40,
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

export default RegistGoalSaving;
