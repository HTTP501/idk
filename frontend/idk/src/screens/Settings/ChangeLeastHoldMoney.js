import React, { useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import theme from '../../style';
import { settingMinumumAxios } from '../../API/Account'

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const ChangeLeastHoldMoney = ({ navigation }) => {
  const [money, setMoney] = useState(null)
  const [numMoney, setNumMoney] = useState(100000)
  
  const formattedNumber = function (text) {
    // 입력된 값에서 숫자만 남기기
    const formattedText = text.replace(/[^\d]/g, '');
    const number = Number(formattedText)
    setMoney(number.toLocaleString("ko-KR", { maximumFractionDigits: 0 }))
    setNumMoney(number)
  };

  // 최소보유금액 등록
  const handleSettingMinimum = () => {
    settingMinumumAxios(
      {amount:numMoney},
      res => {
        Alert.alert('최소보유금액 설정이 완료되었습니다.', `${money} 원`,[{text:'확인'}])
        navigation.navigate('Settings')
      },
      err => {
        if (err.response.data.code === 'M402') {
          Alert.alert(err.response.data.message, '', [{text:'확인', onPress: () => navigation.navigate('Main')}])
        } else if (err.response.data.code === 'A409') {
          Alert.alert(err.response.data.message, '', [{text:'확인', onPress: () => navigation.navigate('Main')}])  
        }
      }
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={{ flexGrow:1, alignItems:'center', justifyContent:'center'}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="mb-16" style={{ marginLeft: SCREEN_WIDTH * (1 / 10) }}>
          <Text className="text-3xl font-bold mb-5">최소보유금액 설정</Text>
          <Text className="text-lg" style={{ marginRight: SCREEN_WIDTH * (1 / 10)}}>돈포켓으로 자동으로 빠져나가지 않는 최소보유금액을 설정할 수 있어요!</Text>
          <Text className="text-lg" style={{ marginRight: SCREEN_WIDTH * (1 / 10)}}>이미 계좌 잔고가 최소보유금액보다 작을 경우 돈포켓으로 빠져나가지 않아요!</Text>
        </View>
        <View style={styles.input}>
          <TextInput
            style={{ fontSize: 20, textAlign: 'right'}}
            returnKeyType="done"
            placeholder="100,000"
            keyboardType='numeric'
            onChangeText={(text) => formattedNumber(text)}
            value={money}
          />
          <Text className='text-lg font-bold'> 원</Text>
        </View>
        <TouchableOpacity
          style={[styles.button, {opacity: money===null ? 0.5 : 1}]}
          disabled={money===null}
          onPress={handleSettingMinimum}>
          <Text className="text-white text-lg">설정</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ChangeLeastHoldMoney;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 100,
  },
  input: {
    borderBottomWidth: 2,
    width: SCREEN_WIDTH * (8 / 10),
    height: 50,
    marginBottom: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontSize: 20,
    flexDirection: 'row',
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
