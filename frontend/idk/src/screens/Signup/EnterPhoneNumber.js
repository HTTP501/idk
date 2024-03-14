import React, { useRef, useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import theme from '../../style';
import { useNavigation } from '@react-navigation/native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const EnterPhoneNumber = ({ navigation }) => {
  const textInputRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showVerificationInput, setShowVerificationInput] = useState(false); // 인증번호 입력창을 보여줄지 여부
  const [verificationRequested, setVerificationRequested] = useState(false); // 인증 요청 여부


  const handlePhoneNumberChange = (text) => {
    // 입력된 값에서 숫자만 남기기
    const formattedText = text.replace(/[^\d]/g, '');
    
    // 전화번호 형식에 맞게 '-' 삽입
    let formattedPhoneNumber = '';
    if (formattedText.length < 4) {
      formattedPhoneNumber = formattedText
    } else if (formattedText.length < 8) {
      formattedPhoneNumber = formattedText.substring(0, 3) + '-' + formattedText.substring(3, 7);
    } else {
      formattedPhoneNumber = formattedText.substring(0, 3) + '-' + formattedText.substring(3, 7) + '-' + formattedText.substring(7, formattedText.length)
    }

    // state 업데이트
    setPhoneNumber(formattedPhoneNumber);

    // 입력된 번호가 13자리인 경우 인증 요청 버튼 활성화
    if (formattedPhoneNumber.length === 13) {
      setVerificationRequested(false); // 인증 요청 상태 초기화
    }
  };

  const handleVerificationRequest = async () => {
    // 인증 요청 로직 수행 후
    await setShowVerificationInput(true); // 인증 번호 입력창 보이도록 설정
    // 아래 인증 번호 입력란으로 포커스 이동
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
    setVerificationRequested(true); // 인증 요청 상태 변경
  };

  const handleNext = () => {
    if (showVerificationInput) {
      // 인증 번호를 입력했을 때 다음 화면으로 이동하는 로직
      navigation.navigate('EnterBirthId');
    } else {
      // 인증 요청 버튼을 눌렀을 때 인증 번호를 입력할 수 있는 창으로 전환
      handleVerificationRequest();
    }
  };


  return (
    <View style={styles.container}>
      <View className='mb-16' style={{ marginLeft: SCREEN_WIDTH * (1 / 10) }}>
        <Text className='text-3xl font-bold '>휴대폰 번호</Text>
        <Text className='text-lg'>휴대폰 번호를 입력해주세요.</Text>
      </View>
      <View style={styles.number}>
        <TextInput
          style={{ ...styles.input, marginLeft: SCREEN_WIDTH * (1 / 10) }}
          returnKeyType='done'
          placeholder='010-1234-5678'
          maxLength={13}
          keyboardType='numeric'
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          editable={!verificationRequested} // 인증 요청 후에는 편집 불가능하도록 설정
        ></TextInput>
        <TouchableOpacity 
          disabled={verificationRequested || phoneNumber.length !== 13}
          style={[styles.certificationButton, !verificationRequested && phoneNumber.length === 13 ? null : styles.disabled]}
          onPress={handleVerificationRequest}
        >
          <Text className='text-white text-sm'>인증 요청</Text>
        </TouchableOpacity>
      </View>
      {showVerificationInput && (
        <View style={{...styles.number, marginBottom: 0}}>
          <TextInput
            ref={textInputRef}
            style={{ ...styles.input, fontSize:24, borderBottomWidth: 0, marginLeft: SCREEN_WIDTH * (1 / 10) }}
            placeholder='인증 번호 6자리 입력'
            keyboardType='numeric'
            maxLength={6}
          />
          <TouchableOpacity 
            style={{...styles.certificationButton, marginTop: 5}}
          >
            <Text className='text-white text-sm'>인증 확인</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EnterPIN')}>
        <Text className='text-white text-lg'>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EnterPhoneNumber;

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  number: {
    marginBottom: 100,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60
  },
  input: {
    fontSize: 30,
    borderBottomWidth: 2,
    width: SCREEN_WIDTH * (6 / 10),
    height: 50,
    letterSpacing: 1,
    marginRight: 20
  },
  certificationButton: {
    width: 70,
    height: 40,
    backgroundColor: theme['sky-basic'],
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
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
  disabled: {
    opacity: 0.6
  }
});
