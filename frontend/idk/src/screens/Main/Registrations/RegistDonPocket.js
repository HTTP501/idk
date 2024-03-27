import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
import theme from "../../../style";
import formattedNumber from "../../../components/moneyFormatter";
import { useEffect, useState } from "react";
import { getAutoDebitAxios } from '../../../API/AutoDebit'
import { getAutoTransferAxios } from '../../../API/AutoTransfer'
import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCOUNT_KEY = "@account";

// 페이지
const RegistDonPocket = ({navigation}) => {
  const [autoTransferList, setAutoTransferList] = useState(null)
  const [autoDebitList, setAutoDebitList] = useState(null)
  const [accountId, setAccountId] = useState(null)

  useEffect(() => {
    const getAccountId = async () => {
      const a = await AsyncStorage.getItem(ACCOUNT_KEY)
      setAccountId(JSON.parse(a).accountId)
    }
    // // 자동결제 Axios
    // getAutoDebitAxios(
    //   {accountId: accountId},
    //   res => {
    //     console.log(res.data);
    //   },
    //   err => {
    //     console.log(err);
    //     console.log(err.response);
    //   }
    // )
    // // 자동이체 Axios
    // getAutoTransferAxios(
    //   {accountId: accountId},
    //   res => {
    //     console.log(res.data);
    //   },
    //   err => {
    //     console.log(err);
    //     console.log(err.response);
    //   }
    // )
    getAccountId()
  })

  const myData = [
    {
      name: "어디로든 그린 카드",
      type: "결제",
      date: 15,
    },
    {
      name: "NH 농협 123-456-789",
      type: "이체",
      amount: 70000,
      date: 15,
    },
    {
      name: "어디로든 그린 카드",
      type: "결제",
      date: 15,
    },
  ];
  return (
    <View style={styles.container}>
      <Text
        className="text-2xl font-bold text-center"
        style={{ marginTop: 90, marginBottom: 30 }}
      >
        돈포켓 생성하기
      </Text>
      <View className="items-center">
        {myData.map((item, index) => (
          <Pocket myDataItemId={item} key={index} navigation={navigation}/>
        ))}
      </View>
    </View>
  );
};

const Pocket = function ({ myDataItemId,navigation }) {
  const [isSelected, setIsSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  console.log(myDataItemId);
  return (
    <View style={[styles.donpocket, styles.shadow]}>
      <View className="flex-row flex items-center px-3">
        <Text style={{ flex: 1 }}>아이콘</Text>
        <View style={{ flex: 4 }}>
          <Text className="text-lg font-bold">{myDataItemId.name}</Text>
          {myDataItemId.type === "결제" ? (
            <Text>매월 {myDataItemId.date}에 청구 대금 납입</Text>
          ) : (
            <Text>
              매월 {myDataItemId.date}에 {formattedNumber(myDataItemId.amount)}
              원 납입
            </Text>
          )}
        </View>
        {isSelected ? (
          <View style={styles.button} className="bg-gray-100">
            <Text className="font-bold">연결됨</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme["sky-bright-4"] }]}
            onPress={() => {
              console.log("돈포켓 연결");
              setIsSelected(true);
              setShowModal(true);
            }}
          >
            <Text className="font-bold">생성</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 모달 */}
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              className="self-end"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold mb-3">돈포켓이 생성되었습니다!</Text>
            <Text className="text-zinc-500 mb-8 font-bold">
            {myDataItemId.name}
            </Text>
            <TouchableOpacity
              style={styles.modalButton1}
              onPress={() => {
                setShowModal(false);
                navigation.navigate("Main")
              }}
            >
              <Text className="text-lg font-bold">메인페이지 가기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton2}
              onPress={() => {
                setShowModal(false);
              }}
            >
              <Text className="text-lg font-bold">다른 돈포켓 생성하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // alignItems:'center',
    height: "100%",
  },
  donpocket: {
    height: 90,
    width: SCREEN_WIDTH * (6 / 7),
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: theme["sky-basic"],
    width: 350,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 350,
    marginTop: 20,
  },
  modalButton1: {
    width: 290,
    height: 60,
    backgroundColor: theme["sky-bright-6"],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  modalButton2: {
    width: 290,
    height: 60,
    backgroundColor: theme["sky-bright-2"],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
export default RegistDonPocket;
