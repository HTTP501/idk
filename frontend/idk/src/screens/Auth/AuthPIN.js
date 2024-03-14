import React, { useRef, useState, useEffect } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, TextInput, Modal } from 'react-native';
import theme from '../../style';
import * as LocalAuthentication from 'expo-local-authentication';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const AuthPIN = ({ navigation }) => {
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
      promptMessage: '지문을 인식하여 로그인하세요', // 지문 인식 프롬프트 메시지
    });

    if (result.success) {
      // 인증 성공
      console.log('Authentication successful');
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
      <Text className='text-3xl font-bold mb-4'>간편 비밀번호 인증</Text>
      <Text className='text-lg mb-24'>숫자 6자리를 입력해주세요</Text>
      <TextInput
        style={styles.input}
        returnKeyType='next'
        placeholder='******'
        maxLength={6}
        keyboardType='numeric'
        secureTextEntry={true} // 입력된 번호를 *로 대체하여 보여줌
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tab')}>
        <Text className='text-white text-lg'>로그인</Text>
      </TouchableOpacity>

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
  },
});
