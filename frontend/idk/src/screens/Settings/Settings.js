import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Modal,
  Switch,
  Alert,
} from "react-native";
import theme from "../../style";
import { AntDesign } from "@expo/vector-icons"; // Import Ionicons from Expo
import {
  autoTransferAxios,
  transactionAxios,
  memberAxios,
} from "../../API/Member";
import { ChangeAccountNameAxios, deleteAccountAxios } from "../../API/Account";
import AuthPW from "../Auth/AuthPW";
import { useFocusEffect } from "@react-navigation/native";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const Settings = ({ navigation, route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [isDepositNotificationEnabled, setIsDepositNotificationEnabled] =
    useState(false);
  const [
    isAutoTransferNotificationEnabled,
    setIsAutoTransferNotificationEnabled,
  ] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isPasswordChecked, setIsPasswordChecked] = useState(false);
  
  // 다시 돌아올때 route 체크를 확인하고 해지한다
  useEffect(()=>{
    console.log(route)
    if (route?.params?.data?.isChecked){
      deleteAccount()
    }
    }, [navigation])
  
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const destination = {stack:"SettingStack",screen:"Settings"}
  // 계좌 별명 변경 Axios
  const handleNicknameChange = () => {
    setIsModalVisible(false);
    ChangeAccountNameAxios(
      { accountName: accountName },
      (res) => {
        Alert.alert("계좌 별명 변경이 완료되었습니다.", "", [{ text: "확인" }]);
      },
      (err) => {}
    );
  };

  // 자동이체 알림 설정 Axios
  const HandleAutoTransfer = () => {
    setIsAutoTransferNotificationEnabled((previousState) => !previousState);
    autoTransferAxios(
      (res) => {},
      (err) => {}
    );
  };

  // 입출금 알림 설정 Axios
  const HandleTransactionAxios = () => {
    setIsDepositNotificationEnabled((previousState) => !previousState);
    transactionAxios(
      (res) => {},
      (err) => {}
    );
  };
  // 계좌 해지
  const deleteAccount = (res) => {
    deleteAccountAxios(
      (response) => {
        console.log(response.data.message);
        Alert.alert("계좌가 해지되었습니다.", "", [
          {
            text: "확인",
            onPress: () => {
              navigation.navigate("AccountStack", { screen: "Agreement" });
            },
          },
        ]);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  // 회원 정보 조회
  useEffect(() => {
    memberAxios(
      (res) => {
        console.log("회원정보조회");
        setIsDepositNotificationEnabled(res.data.data.transactionPushEnabled);
        setIsAutoTransferNotificationEnabled(
          res.data.data.autoTransferPushEnabled
        );
      },
      (err) => {}
    );
  }, []);

  return (
    // <View className="flex flex-1">
    //   {
    //     isChecking ?
    //       // 체크한 결과 올려서 저장
    //       <AuthPW changeResult={(res) => {
    //         deleteAccount(res)

    //       }} /> :
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 50,
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-5 self-start">
          <Text className="text-3xl font-bold">계좌 관리</Text>
        </View>
        <TouchableOpacity
          style={styles.box}
          onPress={toggleModal} // Open modal when the button is pressed
        >
          <Text className="text-base text-zinc-500">계좌 별명 변경</Text>
          <AntDesign name="right" size={20} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("ChangeAccountPW")}
        >
          <Text className="text-base text-zinc-500">계좌 비밀번호 변경</Text>
          <AntDesign name="right" size={20} color="grey" />
        </TouchableOpacity>
        <View className="my-3 self-start">
          <Text className="text-3xl font-bold">알림 관리</Text>
        </View>
        <View style={{ ...styles.box, marginBottom: 20, paddingBottom: 0 }}>
          <Text className="text-base text-zinc-500">입출금 알림(Push)</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDepositNotificationEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={HandleTransactionAxios}
            value={isDepositNotificationEnabled}
          />
        </View>
        <View style={{ ...styles.box, paddingBottom: 0 }}>
          <Text className="text-base text-zinc-500">자동이체 알림</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={
              isAutoTransferNotificationEnabled ? "#f4f3f4" : "#f4f3f4"
            }
            ios_backgroundColor="#3e3e3e"
            onValueChange={HandleAutoTransfer}
            value={isAutoTransferNotificationEnabled}
          />
        </View>
        <View className="my-5 self-start">
          <Text className="text-3xl font-bold">돈포켓 관리</Text>
        </View>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("ChangeLeastHoldMoney")}
        >
          <Text className="text-base text-zinc-500">최소보유금액 설정</Text>
          <AntDesign name="right" size={20} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("ChangeSalaryDay")}
        >
          <Text className="text-base text-zinc-500">월급일 설정</Text>
          <AntDesign name="right" size={20} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("RegistSavingBox")}
        >
          <Text className="text-base text-zinc-500">저금통 등록</Text>
          <AntDesign name="right" size={20} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => {
            setIsDeleteModalVisible(true);
            console.log("해지하기");
          }}
        >
          <Text className="text-base text-zinc-500">계좌 해지하기</Text>
          <AntDesign name="right" size={20} color="grey" />
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>계좌 별명 변경</Text>
            <TextInput
              style={styles.input}
              placeholder="새로운 별명을 입력하세요"
              value={accountName}
              onChangeText={setAccountName}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleNicknameChange} // Call function to change nickname
            >
              <Text style={styles.buttonText}>변경</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isDeleteModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>정말 해지하시겠습니까?</Text>
            <View className="flex-row justify-between w-full px-5">
              <TouchableOpacity
                style={styles.modalButton1}
                onPress={() => setIsDeleteModalVisible(false)}
              >
                <Text className="font-bold text-lg">유지하기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton2}
                onPress={() => {
                  setIsDeleteModalVisible(false);
                  navigation.navigate(
                    "AuthStack",
                    { screen: "AuthPW",params:{data:{isChecked:false},destination} },
                    
                  );
                  // setIsChecking(true)
                }}
              >
                <Text className="font-bold text-lg text-gray-500">
                  해지하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
    // }
    // </View>
  );
};

// Settings.screenOptions = {
//   tabBatStyle: "none",
//   headerShown: false,
// };

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: 100,
  },
  box: {
    width: SCREEN_WIDTH * (8 / 10),
    marginBottom: 30,
    borderBottomWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 40,
  },
  modalContent: {
    backgroundColor: "white",
    width: 350,
    borderWidth: 1,
    borderColor: theme["sky-basic"],
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    width: 320,
    borderColor: "gray",
    padding: 10,
    marginBottom: 30,
    textAlign: "center",
  },
  modalButton: {
    width: 80,
    height: 40,
    borderColor: theme["sky-basic"],
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  modalButton1: {
    flexGrow: 1,
    height: 50,
    marginRight: 30,
    backgroundColor: theme["sky-bright-2"],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  modalButton2: {
    flexGrow: 1,
    height: 50,
    backgroundColor: theme.grey,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
