import React, { useRef, useState, useEffect } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, Image, Modal, Alert } from 'react-native';
import theme from '../../style';
import * as LocalAuthentication from 'expo-local-authentication';
import { signupAxios, loginPINAxios } from '../../API/Member'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = '@auth'
const SIGNUP_KEY = '@signup'
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
  
const FinishEnterPIN = ({ route, navigation }) => {
  const [showModal, setShowModal] = useState(false);

  // 들어오자마자 지문 인식 가능한 기기인지 판단
  useEffect(() => {
    checkBiometricAvailability();

  }, []);

  const receiveData = route.params
  console.log(receiveData);

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
      setShowModal(false)
      // 지문 O로 회원가입 요청
      await signupAxios(
        {...receiveData, hasBiometric: true},
        async (res) => {
          console.log(res);
          // AsyncStorage에 회원가입 완료했으므로 SIGNUP_KEY로 번호 저장
          const s = JSON.stringify({phoneNumber:receiveData.phoneNumber})
          await AsyncStorage.setItem(SIGNUP_KEY, s)
          // 로그인도 처리해야 하므로 AUTH_KEY로 memberId, accessToken 저장
          const a = JSON.stringify({accessToken:res.data.data.accessToken})
          await AsyncStorage.setItem(AUTH_KEY, a)
          Alert.alert('회원가입에 성공했습니다.','',[{text:'확인'}])
        },
        err => {
          if (err.response.data.code === 'M401') {
            Alert.alert('회원 정보가 있습니다.','로그인 페이지로 이동합니다.',[{text:'확인', onPress: () => navigation.navigate('AuthStack')}])
          }
        }
      )
    } else {
      // 인증 실패 또는 취소
      console.log('Authentication failed or canceled');
      setShowModal(false)
    }
  };

  const handleYes = () => {
    setShowModal(false);
    authenticate();
  };

  const handleNo = async () => {
    setShowModal(false);
    // 지문 X로 회원가입 요청
      await signupAxios(
        {...receiveData, hasBiometric: false},
        async res =>  {
          console.log(res.data);
          // AsyncStorage에 회원가입 완료했으므로 SIGNUP_KEY로 번호 저장
          const s = JSON.stringify({phoneNumber:receiveData.phoneNumber})
          await AsyncStorage.setItem(SIGNUP_KEY, s)
          // 로그인도 처리해야 하므로 AUTH_KEY로 accessToken 저장
          const a = JSON.stringify({accessToken:res.data.data.accessToken})
          await AsyncStorage.setItem(AUTH_KEY, a)
          Alert.alert('회원가입에 성공했습니다.','',[{text:'확인'}])
        },
        async err => {
          console.log(err);
          console.log(err.response);
          if (err.response.data.code === 'M401') {
            Alert.alert('회원 정보가 있습니다.','로그인 페이지로 이동합니다.',[{text:'확인', onPress: () => navigation.navigate('AuthStack')}])
          }
        }
      )
  };
  
  

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/check.png')} />
      <Text className='text-3xl font-bold mb-72 mt-10'>간편 비밀번호 등록 완료</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.reset({routes: [{name: 'AccountStack'}]})}>
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
    borderWidth: 1,
    borderColor: theme['sky-basic'],
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
