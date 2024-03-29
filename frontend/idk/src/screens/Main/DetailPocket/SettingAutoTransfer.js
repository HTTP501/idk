import { Dropdown } from "react-native-element-dropdown";
import React, { useEffect, useState } from "react";

import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Alert,
  Modal,
  Switch
} from "react-native";

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

import theme from "../../../style";
import BankToggle from "../../../components/BankToggle";
import { getAccountAxios } from "../../../API/Account";
import { getDetailAutoTransferAxios } from '../../../API/AutoTransfer'
import { changeDonPocketNameAxios, 
  deleteDonPocketAutoTransferAxios,
  changeDonPocketActivateAxios  } from '../../../API/DonPocket'
import formattedNumber from "../../../components/moneyFormatter";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
// 자동이체 설정 페이지
const SettingAutoTransfer = ({ navigation, route }) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(route.params.name)
  const [isActivated, setIsActivated] = useState(route.params.activated);
  const donPocketId = route.params.donPocketId
  const pocketId = route.params.pocketId
  const [data, setData] = useState(null)

  const [myAccount, setMyAccount] = useState({});
  // 내 계좌 데이터 가져오기
  useEffect(() => {
    getAccountAxios(
      (res) => {
        setMyAccount(res.data.data);
      },
      (err) => {
      }
    );
    getDetailAutoTransferAxios(
      donPocketId,
      res => {
        setData(res.data.data)
      },
      err => {
        if (err.response.data.code === 'C401') {
          Alert.alert(err.response.data.message, '', [{text:'확인', onPress: () => navigation.navigate('Main')}])
        } else if (err.response.data.code === 'AT405') {
          Alert.alert(err.response.data.message, '', [{text:'확인', onPress: () => navigation.navigate('Main')}])  
        }
      }
    )
  }, []);

  // 수정 Axios
  const handleSetting = () => {
    changeDonPocketNameAxios(
      pocketId,
      {name: name},
      res => {
        console.log(res);
        Alert.alert('수정이 완료되었습니다.', '', [{text:'확인', onPress: () => navigation.navigate('Main')}])
      },
      err => {
        if (err.response.data.code === 'C401') {
          Alert.alert(err.response.data.message, '', [{text:'확인', onPress: () => navigation.navigate('Main')}])
        } else if (err.response.data.code === 'P404') {
          Alert.alert(err.response.data.message, '', [{text:'확인', onPress: () => navigation.navigate('Main')}])  
        }
      }
    )
  }
  
  // 돈포켓 해지 Axios
  const deleteDonPocket = () => {
    deleteDonPocketAutoTransferAxios(
      pocketId,
      res => {
        Alert.alert('해지가 완료되었습니다.', '', [{text:'확인', onPress: () => navigation.navigate('Main')}])
      },
      err => {
        if (err.response.data.code === 'C401') {
          Alert.alert(err.response.data.message, '', [{text:'확인', onPress: () => navigation.navigate('Main')}])
        } else if (err.response.data.code === 'P404') {
          Alert.alert(err.response.data.message, '', [{text:'확인', onPress: () => navigation.navigate('Main')}])  
        }
      }
    )
    setShowModal(false)
  }

  // 돈 포켓 자동 넣기 Axios
  const HandleIsActivated = () => {
    changeDonPocketActivateAxios(
      pocketId,
      res => {
      },
      err => {
        if (err.response.data.code === 'C401') {
          Alert.alert(err.response.data.message, '', [{text:'확인', onPress: () => navigation.navigate('Main')}])
        } else if (err.response.data.code === 'P404') {
          Alert.alert(err.response.data.message, '', [{text:'확인', onPress: () => navigation.navigate('Main')}])  
        }
      }
    )
    setIsActivated(previousState => !previousState)
  }


  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: 'center' }}
      >
        <View style={styles.upbox}>
          <Text className='text-xl font-bold'>돈 포켓 자동 넣기</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isActivated ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={HandleIsActivated}
            value={isActivated}
          />
        </View>
        <View style={[styles.box, styles.input]}>
          <Text className='text-xl font-bold mb-1'>돈포켓 이름</Text>
          <TextInput
            placeholder={data?.name}
            className='text-lg'
            value={name}
            onChangeText={(text) => setName(text)}
          >
          </TextInput>
        </View>
        <View style={styles.box}>
          <Text className="text-xl font-bold mb-3">출금 계좌</Text>
          <View className="flex-row items-center">
            <Image source={imgMatch['IDK은행']} style={{width: 50, height:50, marginRight: 10}}/>
            <View>
              <Text className='text-lg'>{myAccount?.accountName}</Text>
              <Text className='text-lg'>{myAccount?.accountNumber}</Text>
            </View>
          </View>
        </View>
        <View style={styles.box}>
          <Text className="text-xl font-bold mb-3">받는 분</Text>
          <View className='flex-row items-center'>
            <Image source={imgMatch[data?.toAccountBank]} style={{width: 50, height:50, marginRight: 10}}/>
            <View className=''>
              <Text className='text-lg'>{data?.toAccountBank}</Text>
              <Text className='text-lg'>{data?.toAccount}</Text>
            </View>
          </View>
        </View>
        <View style={styles.box}>
          <Text className="text-xl font-bold mb-1">이체 금액</Text>
          <Text className="text-lg">{data?.amount} 원</Text>
        </View>
        {/* 자동이체 주기 */}
        <View style={styles.box}>
          <Text className="text-xl font-bold mb-1">자동 이체 주기</Text>
          <Text className="text-lg">매월 {data?.date} 일</Text>
        </View>

        {/* 자동이체 기간 */}
        <View style={styles.box}>
          <Text className="text-xl font-bold mb-1">자동 이체 기간</Text>
          <View className="flex-row items-center">
            <Text className='text-lg'>시작일 : </Text>
            <Text className='text-lg'>{data?.startYearMonth}</Text>
          </View>
          <View className="flex-row items-center">
              <Text className='text-lg'>종료일 : </Text>
              <Text className='text-lg'>{data?.endYearMonth}</Text>
          </View>
        </View>

        {/* 통장 표시 */}
        <View style={styles.box}>
          <Text className="text-xl font-bold">받는 분 통장 표시</Text>
          <Text className='text-lg'>{data?.showRecipientBankAccount}</Text>
        </View>
        <View style={styles.box}>
          <Text className="text-xl font-bold">내 통장 표시</Text>
          <Text className='text-lg'>{data?.showMyBankAccount}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setShowModal(true)}
        >
          <Text className="text-zinc-500 text-lg">돈포켓 해지하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSetting}
        >
          <Text className="text-white text-lg font-bold">이름 수정</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text className='text-xl font-bold mb-1'>'{route.params.name}' 자동이체 돈포켓을</Text>
            <Text className='text-xl font-bold mb-1'>해지하시겠습니까?</Text>
            <TouchableOpacity
              style={styles.modalButton1}
              onPress={deleteDonPocket}
            >
              <Text className='text-lg font-bold'>돈포켓 해지하기</Text>
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

const styles = StyleSheet.create({
  dropdowncontainer: {
    backgroundColor: "white",
  },

  selectedTextStyle: {
    fontSize: 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: 120,
  },
  upbox : {
    width: SCREEN_WIDTH * (8/10),
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
  },
  box: {
    width: SCREEN_WIDTH * (4 / 5),
    marginBottom: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: theme["grey"],
    width: SCREEN_WIDTH * (4 / 5),
    // height: 40,
    paddingVertical: 10,
    alignSelf: "center",
  },
  button: {
    width: SCREEN_WIDTH * (9 / 10),
    height: 50,
    backgroundColor: theme["sky-basic"],
    alignItems: "center",
    justifyContent: "center",
    // position: 'absolute',
    // bottom: 20, // 화면 하단과의 간격
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 10
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
  deleteButton: {
    width: SCREEN_WIDTH*(9/10),
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginVertical: 20,
    marginBottom: 10
  },
});

export default SettingAutoTransfer;
