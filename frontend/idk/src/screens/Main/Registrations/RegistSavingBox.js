import React, { useRef, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import theme from "../../../style";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const RegistSavingBox = ({ navigation }) => {
  const pigIcon = require("../../../../assets/icons/pig.png");
  let [startSavingBoxMoney, setStartSavingBoxMoney] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.box} className="mb-16 flex-row items-center">
        <Image source={pigIcon} />
        <Text className="text-3xl font-bold pl-3">저금통</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* 설명 */}
        <Explain />
        {/* 입력란 */}
        <Text className="text-2xl font-bold mt-10 mb-3">넣고 시작하기</Text>
        <View style={styles.input} className="flex-row gap-3 justify-end">
          <TextInput
            className="text-xl"
            placeholder="100,000"
            value={String(startSavingBoxMoney)}
            keyboardType="numeric"
            onChangeText={(text) => setStartSavingBoxMoney(text)}
          />
          <Text className="text-2xl font-bold">원</Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
            console.log('저금통 등록')
          navigation.navigate("Main");
        }}
      >
        <Text className="text-white text-lg font-bold">만들기</Text>
      </TouchableOpacity>
    </View>
  );
};

const Explain = () => {
  return (
    <View className="gap-2">
      <View>
        <Text>저금통 기능은 월급일마다</Text>
      </View>
      <View>
        <Text>잔고에 남아있는 잔액을 저금하는 기능이에요.</Text>
      </View>
      <View>
        <Text>남아있는 잔액을 저금하고,</Text>
      </View>
      <View>
        <Text>새롭게 한 달을 시작해보세요!</Text>
      </View>
      <View>
        <Text>저금통의 돈은 언제든</Text>
      </View>
      <View>
        <Text>자유롭게 넣고 뺄 수 있어요!</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    paddingTop: 120,
    paddingHorizontal: 30,
  },
  box: {
    width: SCREEN_WIDTH * (4 / 5),
    marginBottom: 30,
  },
  input: {
    borderBottomWidth: 1,
    width: "100%",
    borderColor: theme.grey,
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

export default RegistSavingBox;
