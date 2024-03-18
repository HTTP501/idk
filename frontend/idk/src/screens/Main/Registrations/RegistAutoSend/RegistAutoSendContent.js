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
import theme from "../../../../style";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const RegistAutoSendContent = ({ navigation }) => {
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
          <Text className="text-base font-bold">출금 계좌</Text>
          <TextInput style={styles.input} placeholder="내 계좌 내용" />
        </View>
        <View style={styles.box}>
          <Text className="text-base font-bold">받는 분</Text>
          <Text className="border">은행토글구현아직안함</Text>

          <TextInput style={styles.input} placeholder="계좌번호" />
        </View>
        <View style={styles.box}>
          <Text className="text-base font-bold">이체 금액</Text>
          <View style={styles.input} className="flex-row items-center align-center justify-end gap-3 p-2">
          <TextInput className="text-lg" placeholder="5,000" />
          <Text className="text-lg font-bold">원</Text>
          </View>
        </View>
        <View style={styles.box}>
          <Text className="text-base font-bold">자동 이체 주기</Text>
          <View style={styles.input} className="flex-row items-center align-center justify-end gap-3 p-2">
          <Text className="text-lg font-bold">매월</Text>
          <TextInput className="text-lg" placeholder="15" />
          <Text className="text-lg font-bold">일</Text>
          </View>
        </View>
        <View style={styles.box}>
          <Text className="text-base font-bold">받는 분 통장 표시</Text>
          <TextInput style={styles.input} placeholder="내 이름" />
        </View>
        <View style={styles.box}>
          <Text className="text-base font-bold">내 통장 표시</Text>
          <TextInput style={styles.input} placeholder="아이들과 미래재단 정기후원" />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("RegistAutoSendFinish");
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
    width: SCREEN_WIDTH * (9 / 10),
    marginBottom: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderColor:theme["grey"],
    width: SCREEN_WIDTH * (9 / 10),
    // height: 40,
    paddingVertical:10,
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
