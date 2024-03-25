import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput
} from "react-native";
// 컴포넌트들
import theme from "../../../style";
import DepositList from "../../../components/DepositList";
import formattedNumber from "../../../components/moneyFormatter";
// 화면 크기
import { Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
import { useIsFocused } from "@react-navigation/native";
import Loading from "../../../components/Loading";

const MinusSavingBox = ({ navigation, route }) => {
  const [money, setMoney] = useState(0)
  const chnageTpye = route.params.change

  const handleChangeMoney = (text) => {
    // 입력값이 숫자가 아니면 무시
    if (!/^\d*$/.test(text)) return;
    setMoney(text)
  }

  // 저금통 돈 넣고 빼기 Axios
  const handleGoMain = () => {
    navigation.navigate('Main')
  }

  return (
    <View style={styles.back}>

      {/* 로고 알람 */}
      <View className="px-10 mt-10 mb-2">
        <Header navigation={navigation}/>
      </View>

      {/* 정보 */}
      <View style={styles.info}>
        <View className='flex-row items-center'>
          <Image source={require("../../../../assets/logo/pig_black.png")} style={{ width: 60, height: 60 }} />
          <Text className='text-2xl font-bold ml-5'>저금통</Text>
        </View>
        <View className='flex-row'>
          <Text className='text-3xl font-bold mt-5 text-zinc-500'>328,000</Text>
          <Text className='text-3xl font-bold mt-5 text-zinc-500'>원</Text>
        </View>
        <View style={styles.box}>
          <Text className='text-3xl font-bold'>{chnageTpye ? '+ ' : '- '}</Text>
          <TextInput
            autoFocus={true}
            className='text-3xl font-bold'
            placeholder="0"
            style={styles.text}
            keyboardType="numeric"
            onChangeText={handleChangeMoney}
          >
          </TextInput>
          <Text className='text-3xl font-bold'> 원</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, { opacity: money ? 1 : 0.5 }]}
        disabled={!money}
        onPress={handleGoMain}>
        <Text className="text-white text-lg">다음</Text>
      </TouchableOpacity>
    </View>
  );
};
// 헤더
const Header = ({navigation}) => {

  const logo = require("../../../../assets/logo/color_idk_bank_logo.png");
  return (
    <View className="items-end">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Text className='text-lg'>취소</Text>
      </TouchableOpacity>
    </View>
  );
};


// 스타일
const styles = StyleSheet.create({
  back: {
    backgroundColor: theme["sky-bright-6"],
    flex: 1
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  info: {
    flex: 1,
    marginBottom: 50,
    alignSelf: 'center',
    width: SCREEN_WIDTH * (8 / 10),
    justifyContent: 'center',
  },
  box: {
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'center',
    width: SCREEN_WIDTH*(9/10),
    height:50,
    backgroundColor: theme['sky-basic'],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 20,
  },
});
export default MinusSavingBox;
