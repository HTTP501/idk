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
  Modal
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

const DetailSavingBox = ({ navigation, route }) => {
  const pocketId = route.params.pocketId
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, []);

  const date = new Date()

    // 이체 데이터
    let [deposit, setDeposit] = useState([
      {
        transactionId: 1,
        transactionContent: "SSAFY",
        transactionAmount: 1000000,
        transactionBalance: 1283600,
        type: "입금",
        depositType: "월급",
        transactionCreatedAt: "2024-03-03 12:00:01",
      },
      {
        transactionId: 2,
        transactionContent: "조용훈",
        transactionAmount: 50000,
        transactionBalance: 333600,
        type: "출금",
        depositType: "계좌이체",
        transactionCreatedAt: "2024-03-01 12:00:01",
      },
      {
        transactionId: 3,
        transactionContent: "윤예빈",
        transactionAmount: 50000,
        transactionBalance: 383600,
        type: "출금",
        depositType: "계좌이체",
        transactionCreatedAt: "2024-02-29 12:00:01",
      },
      {
        transactionId: 4,
        transactionContent: "최현기",
        transactionAmount: 10000,
        transactionBalance: 393600,
        type: "출금",
        depositType: "계좌이체",
        transactionCreatedAt: "2024-03-03 12:00:01",
      },
    ]);

  return (
    <View className="flex-1">
      {loading ? (
        <ScrollView className="bg-white" style={styles.scrollViewContent}>
          {/* 배경 */}
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
              <Text className='text-3xl font-bold mt-5'>6,085원</Text>
              <Text className='text-base mt-3'>매달 월급일, 남은 잔고가 쌓인 돈이에요!</Text>
              
              <View className='flex-row justify-around my-6'>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {navigation.navigate('MinusSavingBox', {change: true})}}
                >
                  <Text className='text-base'>+ 넣기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {navigation.navigate('MinusSavingBox', {change: false})}}
                >
                  <Text className='text-base'>- 빼기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* 이체내역 */}
          <DepositList deposit={deposit} />
          <StatusBar style="auto" />
        </ScrollView>
      ) : <Loading/>}
    </View>
  );
};
// 헤더
const Header = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);

  // 저금통 해지 Axios
  const deleteDonPocket = () => {
    setShowModal(true)
  }
  const logo = require("../../../../assets/logo/color_idk_bank_logo.png");
  return (
    <View className="flex-row justify-between items-center">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Main");
        }}
      >
        <Image source={logo} style={{ width: 90, resizeMode: "contain" }} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={deleteDonPocket}
      >
        <Text className='text-lg'>해지하기</Text>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text className='text-2xl font-bold mb-3'>저금통을</Text>
            <Text className='text-2xl font-bold mb-3'>해지하시겠습니까?</Text>
            <TouchableOpacity
              style={styles.modalButton1}
              onPress={deleteDonPocket}
            >
              <Text className='text-lg font-bold'>해지하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton2}
              onPress={() => {setShowModal(false)}}
            >
              <Text className='text-lg font-bold'>유지하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


// 스타일
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  back: {
    backgroundColor: theme["sky-bright-6"],
    marginBottom: 30
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  info: {
    marginTop: 40,
    alignSelf: 'center',
    width: SCREEN_WIDTH * (8 / 10),
    justifyContent: 'center',
  },
  text: {
    fontSize: 28,
    color: "red",
  },
  lock: {
    position: 'absolute',
    end: 20,
    top: 20
  },
  setting: {
    position: 'absolute',
    end: 20,
    bottom: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: theme['sky-basic'],
    width: 350,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 350,
    marginTop: 20,
  },
  modalButton1: {
    width: 290,
    height: 60,
    backgroundColor: theme['sky-bright-6'],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10
  },
  modalButton2: {
    width: 290,
    height: 60,
    backgroundColor: theme['sky-bright-2'],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
   button: {
    backgroundColor: theme["light-grey"],
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
   }
});
export default DetailSavingBox;
