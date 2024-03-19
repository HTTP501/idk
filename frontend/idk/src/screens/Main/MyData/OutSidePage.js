import React, { useRef, useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import theme from '../../../style';
import Checkbox from 'expo-checkbox';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const OutSidePage = ({ navigation, route }) => {
  const [isCheckekd, setIsChecked] = useState(false)

  console.log(route.params);
  return (
    <View style={styles.container}>
      <Text className='font-bold text-3xl mb-20'>{route.params.name} 납부방법 변경</Text>
      <View style={styles.input}>
        <Text className='font-bold text-lg mb-3'>현재 결제계좌</Text>
        <Text className='text-gray-500 text-lg mb-3'>{ route.params.account }</Text>
      </View>
      <View style={styles.input}>
        <Text className='font-bold text-lg mb-3'>결제계좌 변경</Text>
        <Text className='text-lg mb-3'>IDK은행</Text>
      </View>
      <View style={styles.input}>
        <Text className='text-lg mb-3'>12131231</Text>
      </View>
      <View style={styles.notbox}>
        <Checkbox color={theme.success} style={styles.checkbox} value={isCheckekd} onValueChange={setIsChecked} />
        <Text className='text-sm w-72'>본인의 계좌를 통하여 결제금액을 자동이체 출금 처리하는 것에 동의합니다.</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          { opacity: isCheckekd ? 1 : 0.5 }, 
        ]}
        onPress={() => navigation.navigate('CheckMyData')}
        disabled={!isCheckekd} 
      >
        <Text className='text-white text-lg'>변경</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OutSidePage;

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 100
  },
  box : {
    width: SCREEN_WIDTH * (9/10),
    marginBottom: 50,
  },
  input: {
    borderBottomWidth: 1,
    width: SCREEN_WIDTH*(8/10),
    alignSelf: 'center',
    marginBottom: 20
  },
  button: {
    width: SCREEN_WIDTH * (9 / 10),
    height: 50,
    backgroundColor: theme.success,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20, // 화면 하단과의 간격
    alignSelf: 'center',
    borderRadius: 10
  },
  notbox: {
    flexDirection: 'row',
    padding: 10,
    width: 350,
    height: 90,
  },
  checkbox: {
    marginRight: 10,
    width: 20,
    height: 20,
    borderWidth: 0.5,
  },
});
