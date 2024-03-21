import React, { useRef, useState, useEffect } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, TextInput, Modal, Alert } from 'react-native';
import theme from '../../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginPINAxios, loginBioAxios } from '../../API/Member'
import * as LocalAuthentication from 'expo-local-authentication';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const AUTH_KEY = '@auth'
const SIGNUP_KEY = '@signup'

const AuthPIN = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [pin, setPin] = useState('');

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
    const p = await AsyncStorage.getItem(SIGNUP_KEY)
    const phoneNumber = JSON.parse(p).phoneNumber
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: '지문을 인식하여 로그인하세요', // 지문 인식 프롬프트 메시지
    });

    if (result.success) {
      // 인증 성공
      setShowModal(false)
      loginBioAxios(
        {
          phoneNumber: phoneNumber
        },
        async res => {
          console.log(res.data);
          Alert.alert('지문 인증이 완료되었습니다.','',[{text:'확인'}])
          navigation.navigate('Tab');
          // 로그인도 처리해야 하므로 AUTH_KEY로 memberId, accessToken 저장
          const a = JSON.stringify({accessToken:res.data.data.accessToken})
          await AsyncStorage.setItem(AUTH_KEY, a)
        },
        err => {
          console.log(err.response);
          if (err.response.data.code === 'M402') {
            Alert.alert('존재하지 않는 회원입니다.','',[{text:'확인'}])
          }
        }
      )
    } else {
      // 인증 실패 또는 취소
      setShowModal(false)
      Alert.alert('지문 인증이 실패했습니다.','',[{text:'확인'}])
    }
  };

  
  // 숫자 입력 시 호출되는 함수
  const handlePinChange = (text) => {
    // 입력값이 숫자가 아니면 무시
    if (!/^\d*$/.test(text)) return;
    // 숫자만 입력받도록 필터링
    const numericText = text.replace(/[^\d]/g, '');
    // 입력된 숫자가 6자리인지 확인
    if (numericText.length === 6) {
      // 6자리인 경우 자동으로 확인
      verifyPIN(numericText);
    } else {
      // 6자리가 아닌 경우 현재 입력된 값을 상태에 업데이트
      setPin(numericText);
    }
  };

  // 확인 함수
  const verifyPIN = async (numericText) => {
    const p = await AsyncStorage.getItem(SIGNUP_KEY)
    const phoneNumber = JSON.parse(p).phoneNumber
    loginPINAxios(
      {
        pin: numericText,
        phoneNumber: phoneNumber
      },
      async (res) => {
        setShowModal(false)
        Alert.alert('간편 인증이 완료되었습니다.','',[{text:'확인'}])
        navigation.navigate('Tab');
        // 로그인도 처리해야 하므로 AUTH_KEY로 memberId, accessToken 저장
        const a = JSON.stringify({accessToken:res.data.data.accessToken})
        await AsyncStorage.setItem(AUTH_KEY, a)
        // 입력된 비밀번호 초기화
        setPin('');
      },
      err => {
        if (err.response.data.code === 'M402') {
          Alert.alert('존재하지 않는 회원입니다.','',[{text:'확인'}])
        } else if (err.response.data.code === 'M403') {
          Alert.alert('유효하지 않은 비밀번호입니다.','',[{text:'확인'}])
        }
        // 입력된 비밀번호 초기화
        setPin('');
      }
    )
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
      <Text className='text-3xl font-bold mb-4 text-white'>간편 비밀번호 인증</Text>
      <Text className='text-lg mb-24 text-white'>숫자 6자리를 입력해주세요</Text>
      <TextInput
        autoFocus={true}
        placeholderTextColor={'white'}
        style={styles.input}
        returnKeyType='next'
        placeholder='******'
        maxLength={6}
        keyboardType='numeric'
        secureTextEntry={true} // 입력된 번호를 *로 대체하여 보여줌
        value={pin}
        onChangeText={handlePinChange} // 입력 시 핸들러 호출
      />

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text className='text-lg font-bold'>간편 로그인</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={handleNo} style={styles.modalButton}>
                <Text className='text-white'>간편 비밀번호 인증</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleYes} style={styles.modalButton} >
                <Text className='text-white'>생체 인증</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AuthPIN;

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme['sky-basic'],
  },
  input: {
    fontSize: 50,
    textAlign: 'center',
    width: 350,
    marginBottom: 100,
    letterSpacing: 10,
    color: 'white'
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
  modalButton: {
    width: 170,
    height: 50,
    backgroundColor: theme['sky-basic'],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
});
