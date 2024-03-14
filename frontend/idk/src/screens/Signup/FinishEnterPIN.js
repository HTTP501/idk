import React, { useRef, useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import theme from '../../style';
import { useNavigation } from '@react-navigation/native';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const EnterPINCheck = ({ navigation }) => {
  const [pin, setPin] = useState(['', '', '', '', '', '']); // 비밀번호를 배열로 저장
  const pinInputs = Array.from({ length: 6 }, () => useRef(null)); // TextInput에 대한 ref를 배열로 저장

  const handlePinChange = (index, value) => {
    // 입력값이 숫자가 아니면 무시
    if (!/^\d*$/.test(value)) return;
    // 비밀번호 배열을 업데이트
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // 현재 입력된 값이 없고, 이전 TextInput이 존재하면 포커스 이동
    if (!value && index > 0) {
      pinInputs[index - 1].current.focus();
    }

    // 현재 입력된 값이 있고, 다음 TextInput이 존재하면 포커스 이동
    if (value && index < pinInputs.length - 1) {
      pinInputs[index + 1].current.focus();
    }
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AccountStack')}>
        <Text className='text-white text-lg'>계좌 개설</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EnterPINCheck;

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
  },
});
