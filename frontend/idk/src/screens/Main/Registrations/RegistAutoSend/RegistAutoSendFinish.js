import React, { useRef, useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, Image } from 'react-native';
import theme from '../../../../style';
import { useNavigation } from '@react-navigation/native';
import formattedNumber from '../../../../components/moneyFormatter';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const RegistAutoSendFinish = ({ navigation,route }) => {
  const bankName = route.params.bankName
  const accountId = route.params.accountId
  const date = route.params.date
  const amount = route.params.amount
  const startYear = route.params.startYear
  const startMonth = route.params.startMonth
  const endYear = route.params.endYear
  const endMonth = route.params.endMonth
  const showMyAccountName = route.params.showMyAccountName
  const showOtherAccountName = route.params.showOtherAccountName
  
  
  const payload = {
    bankName,accountId,date,amount,startYear,startMonth,endYear,endMonth,showMyAccountName,showOtherAccountName
  }
  

  return (
    <View style={styles.container}>
      <Image source={require('../../../../../assets/check.png')} />
      <Text className='text-3xl font-bold mb-10 mt-10'>자동이체 등록 완료</Text>
      <View className="border-b-2 border-t-2 p-3 border-gray-200">

      <View style={styles.box}>
        <Text>자동이체 계좌 </Text>
        <Text>{bankName} {accountId}</Text>
      </View>
      <View style={styles.box}>
        <Text>이체 금액 </Text>
        <Text>{formattedNumber(amount)}원</Text>
      </View>
      <View style={styles.box}>
        <Text>자동이체 주기</Text>
        <Text>매월 {date}일</Text>
      </View>
      <View style={styles.box}>
        <Text>자동이체 기간</Text>
        <Text>{startYear}년 {startMonth}월 ~ {endYear}년 {endMonth}월</Text>
      </View>
      </View>
      <TouchableOpacity style={theme.bottomButton} 
      onPress={() => {
        console.log(payload)
        navigation.navigate('Main')}}>
        <Text className='text-white text-lg font-bold'>확인</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistAutoSendFinish;

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
  box:{
    width: SCREEN_WIDTH * (4/5),
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    marginVertical:10
  }
});
