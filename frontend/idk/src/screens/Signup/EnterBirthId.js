import React, { useRef, useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import theme from '../../style';
import { useNavigation } from '@react-navigation/native';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const EnterBirthId = ({ navigation }) => {
  const secondTextInputRef = useRef(null);
  const [firstInputValue, setFirstInputValue] = useState('');

  const handleFirstTextInputChange = (text) => {
    setFirstInputValue(text);
    if (text.length === 6) { // 입력 길이가 6일 때 포커스 이동
      secondTextInputRef.current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View className='mb-16' style={{ marginLeft: SCREEN_WIDTH * (1 / 10) }}>
        <Text className='text-3xl font-bold '>주민등록번호</Text>
        <Text className='text-lg'>주민등록번호를 입력해 주세요.</Text>
      </View>
      <View className='flex-row self-center'>
        <TextInput
          style={styles.input}
          returnKeyType='next'
          placeholder='000000'
          maxLength={6}
          keyboardType='numeric'
          value={firstInputValue}
          onChangeText={handleFirstTextInputChange} // 입력이 변경될 때마다 포커스 이동
        ></TextInput>
        <Text className='text-7xl'>-</Text>
        <TextInput
          ref={secondTextInputRef}
          style={{ ...styles.input, letterSpacing: 3 }}
          returnKeyType='done'
          placeholder='0******'
          maxLength={7}
          keyboardType='numeric'
          secureTextEntry={true}
        ></TextInput>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EnterPhoneNumber')}>
        <Text className='text-white text-lg'>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EnterBirthId;

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  input: {
    fontSize: 40,
    textAlign: 'center',
    borderBottomWidth: 2,
    width: SCREEN_WIDTH * (4 / 10),
    height: 60,
    marginBottom: 100,
    letterSpacing: 2,
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
