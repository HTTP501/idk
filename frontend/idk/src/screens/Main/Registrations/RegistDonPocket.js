import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Alert
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
import theme from "../../../style";
import formattedNumber from "../../../components/moneyFormatter";
import { useEffect, useState } from "react";
import { getAutoDebitAxios } from '../../../API/AutoDebit'
import { getAutoTransferAxios, deleteAutoTransferAxios } from '../../../API/AutoTransfer'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { joinDonPocketAutoTransferAxios } from '../../../API/DonPocket'
import Loading from "../../../components/Loading";

const ACCOUNT_KEY = "@account";

const imgMatch = {
  'IDK은행': require("../../../../assets/logo/app_icon.png"),
  'KB국민은행': require("../../../../assets/banks/KBBank.png"),
  '카카오뱅크': require("../../../../assets/banks/KakaoBank.png"),
  '신한은행': require("../../../../assets/banks/ShinhanBank.png"),
  'NH농협은행': require("../../../../assets/banks/NHBank.png"),
  '하나은행': require("../../../../assets/banks/HanaBank.png"),
  '우리은행': require("../../../../assets/banks/WooriBank.png"),
  'IBK기업은행': require("../../../../assets/banks/IBKBank.png"),
  '케이뱅크': require("../../../../assets/banks/KBank.png"),
  'KB국민카드': require("../../../../assets/banks/KBCard.png"),
  '신한카드': require("../../../../assets/banks/ShinhanCard.png"),
  '현대카드': require("../../../../assets/banks/HyundaiCard.png"),
  '카카오뱅크카드': require("../../../../assets/banks/KakaoCard.png"),
  'NH농협카드': require("../../../../assets/banks/NHCard.png"),
  '삼성카드': require("../../../../assets/banks/SamsungCard.png"),
  '하나카드': require("../../../../assets/banks/HanaCard.png"),
  '우리카드': require("../../../../assets/banks/WooriCard.png"),
}

// 페이지
const RegistDonPocket = ({navigation,route}) => {
  const [autoTransferList, setAutoTransferList] = useState([
    {
      amount: 70000,
      date: 15,
      toAccount: '123123123',
      toAccountBank: 'KB국민은행',
      pocktId: null
    },
    {
      amount: 80000,
      date: 12,
      toAccount: '123123123',
      toAccountBank: '우리은행',
      pocktId: 13
    },
  ])
  const [autoDebitList, setAutoDebitList] = useState(null)
  const [accountId, setAccountId] = useState(null)
  const [loading, setLoading] = useState(false);
  // 목적지
  const destination = { stack: "Main", screen: "RegistDonPocket" }
  // 해지 버튼 누르고 비밀번호 검증한 뒤 해지
  useEffect(()=>{
    if (route?.params?.data?.isChecked){
      handleDeletePocket()
    }
  },[route?.params])
  const getAccountId = async () => {
    const a = await AsyncStorage.getItem(ACCOUNT_KEY)
    setAccountId(JSON.parse(a).accountId)
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
    // 자동이체 Axios
    getAutoTransferAxios(
      JSON.parse(a).accountId,
      res => {
        console.log(res);
        setAutoTransferList(res.data.data.arrayAutoTransfer)
      },
      err => {
        console.log(err);
        console.log(err.response);
      }
    )
  }
  useEffect(() => {
    getAccountId()
    setTimeout(() => {
      setLoading(true);
    }, 500);
  }, [])

  return (
    <>
    {loading ? (
    <View style={styles.container}>
      <Text
        className="text-2xl font-bold text-center"
        style={{ marginTop: 90, marginBottom: 30 }}
      >
        돈포켓 생성하기
      </Text>
      <View className="items-center">
        <Text className='text-lg font-bold self-start mb-5' style={{marginLeft:SCREEN_WIDTH * (1/14)}}>자동이체 목록</Text>
        {autoTransferList.map((item, index) => (
          <Pocket getAccountId={getAccountId} dataType={'자동이체'} myDataItemId={item} key={index} navigation={navigation}/>
        ))}
      </View>
      {/* <View className="items-center">
        {autoDebitList.map((item, index) => (
          <Pocket myDataItemId={item} key={index} navigation={navigation}/>
        ))}
      </View> */}
      </View>
      ) : <Loading/>}
    </>
  );
};

const Pocket = function ({ getAccountId,dataType,myDataItemId,navigation }) {
  const [pocketShowModal, setPocketShowModal] = useState(false);
  const [deleteShowModal, setDeleteShowModal] = useState(false);


  // 돈포켓 생성 API
  const handelCreateDonPocket = () => {
    // 자동이체 Axios
    if (dataType === '자동이체') {
      joinDonPocketAutoTransferAxios(
        {autoTransferId: myDataItemId.autoTransferId},
        res => {
          console.log(res);
          setPocketShowModal(true);
          getAccountId()
        },
        err => {
          console.log(err);
        }
      )
    } else { // 자동결제 Axios

    }
  }

  // 자동이체, 자동결제 해지 API
  const handleDeletePocket = () => {
    if (dataType === '자동이체') {
      deleteAutoTransferAxios(
        myDataItemId.autoTransferId,
        res => {
          console.log(res);
          getAccountId()
          Alert.alert("자동이체 해지가 완료되었습니다.",
            '',
            [
              {
                text: "확인",
              },
          ]); 
        },
        err => {
          console.log(err);
          if (err.response.data.code === 'AT405') {
            Alert.alert("해당 자동이체 정보가 존재하지 않습니다.",
              '',
              [
                {
                  text: "확인",
                },
            ]);     
          } else if (err.response.data.code === 'C401') {
            Alert.alert("해당 요청 사용자와 해당 정보의 사용자가 일치하지 않습니다.", 
              '',
              [
                {
                  text: "확인",
                },
            ]);    
          }
        }
        )
      } else { // 자동결제 Axios

      }
    setDeleteShowModal(false)
  }
  return (
    <View style={[styles.donpocket, styles.shadow]}>
      {myDataItemId.pocketId ? (
        <View className="flex-row flex items-center p-3">
          <Image
            style={{ width: 40, height: 40, marginRight: 10 }}
            source={imgMatch[myDataItemId.toAccountBank]}
          />
          <View style={{ flex: 4 }}>
            <Text className="text-lg font-bold">{myDataItemId.toAccountBank} {myDataItemId.toAccount}</Text>
            {dataType === "자동결제" ? (
              <Text>매월 {myDataItemId.date}일에 청구 대금 납입</Text>
            ) : (
              <Text>
                매월 {myDataItemId.date}일에 {formattedNumber(myDataItemId.amount)}
                원 납입
              </Text>
            )}
          </View>
            <View style={styles.button} className="bg-gray-100">
              <Text className="font-bold">생성 완료</Text>
            </View>
        </View>
      ) : (
        <>
        <View className="flex-row flex items-center p-3">
          <Image
            style={{ width: 40, height: 40, marginRight: 10 }}
            source={imgMatch[myDataItemId.toAccountBank]}
          ></Image>
          <View style={{ flex: 4 }}>
            <Text className="text-lg font-bold">{myDataItemId.toAccountBank} {myDataItemId.toAccount}</Text>
            {dataType === "자동결제" ? (
              <Text>매월 {myDataItemId.date}일에 청구 대금 납입</Text>
            ) : (
              <Text>
                매월 {myDataItemId.date}일에 {formattedNumber(myDataItemId.amount)}
                원 납입
              </Text>
            )}
          </View>
        </View>
        <View className='flex-row justify-evenly mb-5 mt-2'>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme["sky-basic"] }]}
            onPress={handelCreateDonPocket}
          >
            <Text className="font-bold">돈포켓 생성하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme["sky-bright-6"] }]}
            onPress={() => {
              setDeleteShowModal(true);
            }}
          >
            <Text className="font-bold">{dataType} 해지하기</Text>
          </TouchableOpacity>
        </View>
        </>
      )}

      {/* 모달 */}
      <Modal visible={pocketShowModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              className="self-end"
              onPress={() => {
                setPocketShowModal(false);
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
                setPocketShowModal(false);
                navigation.navigate("Main")
              }}
            >
              <Text className="text-lg font-bold">메인페이지 가기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton2}
              onPress={() => {
                setPocketShowModal(false);
              }}
            >
              <Text className="text-lg font-bold">다른 돈포켓 생성하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={deleteShowModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDeleteShowModal(false)}
      >
        <View style={styles.modalContainer2}>
          <View style={styles.modalContent2}>
            <Text style={styles.modalTitle2}>정말 해지하시겠습니까?</Text>
            <View className="flex-row justify-between w-full px-5">
            <TouchableOpacity
              style={styles.modalButton12}
              onPress={()=>setDeleteShowModal(false)}
              
            >
              <Text className="font-bold text-lg">유지하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton22}
              onPress={()=>{
                navigation.navigate("AuthStack", {
                  screen: "AuthPW",
                  params: { data: { isChecked: false }, destination },
                });
              }}
            >
              <Text className="font-bold text-lg text-gray-500">해지하기</Text>
            </TouchableOpacity>
          </View>
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
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
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
  modalContainer2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle2: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 40,
  },
  modalContent2: {
    backgroundColor: "white",
    width: 350,
    borderWidth: 1,
    borderColor: theme["sky-basic"],
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  input2: {
    borderBottomWidth: 1,
    width: 320,
    borderColor: "gray",
    padding: 10,
    marginBottom: 30,
    textAlign: "center",
  },
  modalButton12: {
    flexGrow:1,
    height: 50,
    marginRight:30,
    backgroundColor: theme["sky-bright-2"],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  modalButton22: {
    flexGrow:1,
    height: 50,
    backgroundColor: theme.grey,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,}
});
export default RegistDonPocket;
