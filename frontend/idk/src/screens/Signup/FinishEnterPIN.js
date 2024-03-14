import React, { useRef, useState, useEffect } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, Image, Modal, Alert } from 'react-native';
import theme from '../../style';
import * as LocalAuthentication from 'expo-local-authentication';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const FinishEnterPIN = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);

  // 들어오자마자 지문 인식 가능한 기기인지 판단
  useEffect(() => {
    checkBiometricAvailability();

  }, []);

  const checkBiometricAvailability = async () => {
    const available = await LocalAuthentication.hasHardwareAsync();

    // 지문 인식 가능한 기기면 모달 띄우기
    if (available) {
      setShowModal(true)
    }
  };

  const authenticate = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: '지문을 인식하여 등록하세요.', // 지문 인식 프롬프트 메시지
    });

    if (result.success) {
      // 인증 성공
      console.log('Authentication successful');
      Alert.alert('지문 등록이 완료되었습니다.','',[{text:'확인'}])
    } else {
      // 인증 실패 또는 취소
      console.log('Authentication failed or canceled');
    }
  };

  const handleYes = () => {
    setShowModal(false);
    authenticate();
  };

  const handleNo = () => {
    setShowModal(false);
  };
  
  

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/check.png')} />
      <Text className='text-3xl font-bold mb-72 mt-10'>간편 비밀번호 등록 완료</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AccountStack')}>
        <Text className='text-white text-lg'>계좌 개설</Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text className='text-lg font-bold'>생체정보 추가 등록</Text>
            <Text>등록한 간편 비밀번호 대신</Text>
            <View className='flex-row mb-8'>
              <Text style={{color: theme['sky-basic']}}>지문 인식</Text>
              <Text>으로 로그인 할 수 있어요!</Text>
            </View>
            <View className='flex-row'>
              <Text style={{color: theme['sky-basic']}}>지문 인식</Text>
              <Text>정보를 추가할까요?</Text>
            </View>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={handleNo} style={styles.modalButton1}>
                <Text className=''>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleYes} style={styles.modalButton2} >
                <Text className='text-white'>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FinishEnterPIN;

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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
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
    width: 170,
    height: 50,
    borderColor: theme['sky-basic'],
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  modalButton2: {
    width: 170,
    height: 50,
    backgroundColor: theme['sky-basic'],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
});
