import React, { useRef, useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import theme from '../../style';
import { useNavigation } from '@react-navigation/native';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const EnterPINCheck = ({ route, navigation }) => {
  const [pin, setPin] = useState(['', '', '', '', '', '']); // 비밀번호를 배열로 저장
  const pinInputs = Array.from({ length: 6 }, () => useRef(null)); // TextInput에 대한 ref를 배열로 저장

  const receiveData = route.params

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
      <View className='mb-16'>
        <Text className='text-3xl font-bold '>간편 비밀번호 등록 확인</Text>
      </View>
      <View className='flex-row self-center'>
        {pin.map((value, index) => (
          <TextInput
            key={index}
            ref={pinInputs[index]}
            style={styles.input}
            returnKeyType='next'
            placeholder='*'
            maxLength={1}
            keyboardType='numeric'
            value={value}
            onChangeText={(text) => handlePinChange(index, text)}
            secureTextEntry={true} // 입력된 번호를 *로 대체하여 보여줌
          />
        ))}
      </View>
      <TouchableOpacity
        disabled={!pin.every(value => value !== '')}
        style={[styles.button, { opacity: pin.every(value => value !== '') ? 1 : 0.5 }]}
        onPress={() => {
          if (receiveData.pin !== pin.join('')) {
            // receiveData.pin과 pin이 다를 때 경고 띄우기
            Alert.alert('간편 비밀번호가 일치하지 않습니다.','',[{text:'확인'}]);
          } else {
            // receiveData.pin과 pin이 일치할 때 다음 화면으로 이동
            Alert.alert('간편 비밀번호가 일치합니다.','',[{text:'확인'}]);
            navigation.navigate('FinishEnterPIN', receiveData);
          }
        }}
      >
        <Text className='text-white text-lg'>다음</Text>
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
  input: {
    fontSize: 50,
    textAlign: 'center',
    borderBottomWidth: 2,
    width: 30,
    height: 60,
    marginBottom: 100,
    marginRight: 10
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
});
