import React, { useRef, useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import theme from '../../style';
import { useNavigation } from '@react-navigation/native';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const CreateAccount = ({ navigation }) => {
  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null)
  const [firstInputValue, setFirstInputValue] = useState('');
  const [secondInputValue, setSecondInputValue] = useState('');

  const handleFirstTextInputChange = (text) => {
    setFirstInputValue(text);
    if (text.length === 4) {
      // 4글자 입력 시 두 번째 TextInput으로 포커스 이동
      secondTextInputRef.current.focus();
    }
  };

  const handleSecondTextInputChange = (text) => {
    setSecondInputValue(text);
    if (text.length === 4) {
      // 4글자 입력 시 세 번째 TextInput으로 포커스 이동
      thirdTextInputRef.current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View className='mb-16'>
        <Text className='text-3xl font-bold '>계좌 개설</Text>
      </View>
      <View style={styles.box}>
        <Text className='text-base font-bold'>[필수] 비밀번호 설정</Text>
        <TextInput 
          ref={firstTextInputRef}
          style={styles.input}
          returnKeyType='next'
          placeholder='****'
          maxLength={4}
          keyboardType='numeric'
          onChangeText={handleFirstTextInputChange}
          secureTextEntry={true} // 입력된 번호를 *로 대체하여 보여줌
        ></TextInput>
      </View>
      <View style={styles.box}>
        <Text className='text-base font-bold'>[필수] 비밀번호 확인</Text>
        <TextInput 
          ref={secondTextInputRef}
          style={styles.input}
          returnKeyType='next'
          placeholder='****'
          maxLength={4}
          keyboardType='numeric'
          onChangeText={handleSecondTextInputChange}
          secureTextEntry={true} // 입력된 번호를 *로 대체하여 보여줌
        ></TextInput>
      </View>
      <View style={styles.box}>
        <Text className='text-base font-bold'>[선택] 계좌 별명 설정</Text>
        <TextInput 
          ref={thirdTextInputRef}
          style={styles.input}
          returnKeyType='next'
          placeholder='IDK우리나라국민우대통장'
          maxLength={16}
        ></TextInput>
      </View>
      <View style={styles.box}>
        <Text className='text-base font-bold'>[선택] 급여 이체일</Text>
        <TextInput 
          style={styles.input}
          returnKeyType='next'
          placeholder='15'
          maxLength={2}
        ></TextInput>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FinishCreateAccount')}>
        <Text className='text-white text-lg'>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  box : {
    width: SCREEN_WIDTH * (9/10),
    marginBottom: 50,
  },
  input: {
    borderBottomWidth: 1,
    width: SCREEN_WIDTH*(9/10),
    height: 40,
    alignSelf: 'center'
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
