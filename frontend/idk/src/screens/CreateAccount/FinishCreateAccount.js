import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, Image } from 'react-native';
import theme from '../../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MoneySendAnimation from '../../components/MoneySendAnimation';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const ACCOUNT_KEY = '@account'

const FinishCreateAccount = ({ navigation }) => {
  const [accountNumber, setAccountNumber] = useState('')
  const [accountCreatedAt, setAccountCreatedAt] = useState(null)

  useEffect(() => {
    const getAccount = async () => {
      const a = await AsyncStorage.getItem(ACCOUNT_KEY)
      setAccountNumber(JSON.parse(a).accountNumber)
      setAccountCreatedAt(JSON.parse(a).accountCreatedAt)
    }
    getAccount()
  })

  return (
    <View style={styles.container}>
      <MoneySendAnimation/>
      <Text className='text-3xl font-bold mb-10 mt-10'>계좌 생성 완료</Text>
      <View className='flex-row items-center mb-8' style={{ width: 200 }}>
        <Text className='text-lg font-bold mr-5'>계좌번호 </Text>
        <Text className='text-base'>{ accountNumber }</Text>
      </View>
      <View className='flex-row items-center mb-60' style={{ width: 200 }}>
        <Text className='text-lg font-bold mr-5'>개설일자 </Text>
        <Text className='text-base'>{ accountCreatedAt ? accountCreatedAt.substr(0,10) : '' }</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.reset({routes: [{name: 'Tab'}]})}>
        <Text className='text-white text-lg'>확인</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FinishCreateAccount;

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
});
