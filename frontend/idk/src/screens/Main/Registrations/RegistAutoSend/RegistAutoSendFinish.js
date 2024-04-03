import React, { useRef, useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, Image, Modal, Alert } from 'react-native';
import theme from '../../../../style';
import { useNavigation } from '@react-navigation/native';
import formattedNumber from '../../../../components/moneyFormatter';
import { joinDonPocketAutoTransferAxios } from "../../../../API/DonPocket";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const RegistAutoSendFinish = ({ navigation,route }) => {
  const [showModal, setShowModal] = useState(false);
  const bankName = route.params.bankName
  const accountId = route.params.accountId
  const date = route.params.date
  const amount = route.params.amount
  const startYear = route.params.startYear
  const startMonth = route.params.startMonth
  const endYear = route.params.endYear
  const endMonth = route.params.endMonth
  const showMyAccountName = route.params.showMyAccountName
  const showOtherAccountName = route.params.showOtherAccountName
  const autoTransferId = route.params.autoTransferId
  
  
  // 돈포켓 생성 API
  const handelCreateDonPocket = () => {
    setShowModal(false)
    // 자동이체 Axios
    joinDonPocketAutoTransferAxios(
      {autoTransferId: autoTransferId},
      res => {
        Alert.alert(
          `${res.data.data.name} 이 생성되었습니다!`,
          "계좌 페이지로 이동합니다.",
          [
            {
              text: "확인",
              onPress: () => navigation.navigate("Main"),
            },
          ]
        )
      },
      err => {
        if (err.response.data.code === 'C401') {
          Alert.alert(
            err.response.data.message,
            "계좌 페이지로 이동합니다.",
            [
              {
                text: "확인",
                onPress: () => navigation.navigate("Main"),
              },
            ]
          )
        } else if (err.response.data.code === 'P402') {
          Alert.alert(
            err.response.data.message,
            "계좌 페이지로 이동합니다.",
            [
              {
                text: "확인",
                onPress: () => navigation.navigate("Main"),
              },
            ]
          )
        }
        

      }
    );
  };
  

  return (
    <View style={styles.container}>
      <Image source={require('../../../../../assets/check.png')} />
      <Text className='text-3xl font-bold mb-10 mt-10'>자동이체 등록 완료</Text>
      <View className="border-b-2 border-t-2 p-3 border-gray-200">

      <View style={styles.box}>
        <Text>자동이체 계좌 </Text>
        <Text>{bankName} {accountId}</Text>
      </View>
      <View style={styles.box}>
        <Text>이체 금액 </Text>
        <Text>{formattedNumber(amount)}원</Text>
      </View>
      <View style={styles.box}>
        <Text>자동이체 주기</Text>
        <Text>매월 {date}일</Text>
      </View>
      <View style={styles.box}>
        <Text>자동이체 기간</Text>
        <Text>{startYear}년 {startMonth}월 ~ {endYear}년 {endMonth}월</Text>
      </View>
      </View>
      <TouchableOpacity style={theme.bottomButton} 
      onPress={() => setShowModal(true)}>
        <Text className='text-white text-lg font-bold'>확인</Text>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text className='text-lg font-bold mb-1'>'{showMyAccountName}' 자동이체 돈포켓을</Text>
            <Text className='text-lg font-bold mb-1'>생성하시겠습니까?</Text>
            <TouchableOpacity
              style={styles.modalButton1}
              onPress={handelCreateDonPocket}
            >
              <Text className='text-lg font-bold'>돈포켓 생성하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton2}
              onPress={() => {setShowModal(false)}}
            >
              <Text className='text-lg font-bold'>다음에 생성하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RegistAutoSendFinish;

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  button: {
    width: SCREEN_WIDTH * (9 / 10),
    height: 50,
    backgroundColor: theme['sky-basic'],
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // 위치를 절대로 설정
    bottom: 20, // 화면 하단과의 간격
    alignSelf: 'center',
    borderRadius: 10
  },
  box:{
    width: SCREEN_WIDTH * (4/5),
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    marginVertical:10
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
    backgroundColor: theme['sky-bright-2'],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10
  },
  modalButton2: {
    width: 290,
    height: 60,
    backgroundColor: theme['sky-bright-6'],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
});
