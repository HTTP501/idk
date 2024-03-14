import React, { useRef, useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, Image } from 'react-native';
import theme from '../../style';
import { useNavigation } from '@react-navigation/native';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const FinishCreateAccount = ({ navigation }) => {
  
  

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/check.png')} />
      <Text className='text-3xl font-bold mb-10 mt-10'>계좌 생성 완료</Text>
      <View className='flex-row'>
        <Text className='text-base font-bold mb-8'>계좌번호 </Text>
        <Text>IDK은행 123121312313</Text>
      </View>
      <View className='flex-row'>
        <Text className='text-base font-bold mb-60'>개설일자 </Text>
        <Text>IDK은행 123121312313</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tab')}>
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
