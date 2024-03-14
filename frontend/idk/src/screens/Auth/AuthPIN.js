import React, { useRef, useState, useEffect } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, TextInput, Modal, Alert } from 'react-native';
import theme from '../../style';
import * as LocalAuthentication from 'expo-local-authentication';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

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
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: '지문을 인식하여 로그인하세요', // 지문 인식 프롬프트 메시지
    });

    if (result.success) {
      // 인증 성공
      Alert.alert('지문 인증이 완료되었습니다.','',[{text:'확인'}])
      navigation.navigate('Tab');
    } else {
      // 인증 실패 또는 취소
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
  const verifyPIN = (enteredPin) => {
    // 여기서는 가짜 비밀번호 "123456"으로 대체하였습니다. 실제로는 사용자가 설정한 비밀번호를 확인해야 합니다.
    if (enteredPin === '123456') {
      // 비밀번호가 맞을 경우 MainStack으로 이동
      Alert.alert('간편 인증이 완료되었습니다.','',[{text:'확인'}])
      navigation.navigate('Tab');
    } else {
      // 비밀번호가 틀릴 경우 경고 메시지 출력
      Alert.alert('비밀번호가 올바르지 않습니다.','',[{text:'확인'}])
      // 입력된 비밀번호 초기화
      setPin('');
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
      <Text className='text-3xl font-bold mb-4'>간편 비밀번호 인증</Text>
      <Text className='text-lg mb-24'>숫자 6자리를 입력해주세요</Text>
      <TextInput
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
    backgroundColor: 'white',
  },
  input: {
    fontSize: 50,
    textAlign: 'center',
    width: 350,
    marginBottom: 100,
    letterSpacing: 10,
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
