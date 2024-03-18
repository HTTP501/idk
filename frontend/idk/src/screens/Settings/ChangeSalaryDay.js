import React, { useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import theme from '../../style';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const ChangeSalaryDay = ({ navigation }) => {
  const [day, setDay] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const formattedNumber = function (text) {
    // 입력된 값에서 숫자만 남기기
    const formattedText = text.replace(/[^\d]/g, '');
    setDay(formattedText);
    // 입력된 값이 숫자가 아니거나 범위를 벗어날 때 에러 메시지 설정
    if (!/^\d+$/.test(formattedText) || parseInt(formattedText) < 1 || parseInt(formattedText) > 28) {
      setErrorMessage('월급일은 1일부터 28일까지로 설정할 수 있어요!');
    } else {
      setErrorMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={{ flexGrow:1, alignItems:'center', justifyContent:'center'}}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-16" style={{ marginLeft: SCREEN_WIDTH * (1 / 10) }}>
          <Text className="text-3xl font-bold mb-5">월급일 설정</Text>
          <Text className="text-lg" style={{ marginRight: SCREEN_WIDTH * (1 / 10)}}>돈포켓 기능은 월급일을 기준으로 구현했어요.</Text>
          <Text className="text-lg" style={{ marginRight: SCREEN_WIDTH * (1 / 10)}}>월급일 이후 돈포켓에 입금되지 않았을 때 한 눈에 확인할 수 있도록 화면을 제공해요!</Text>
          <Text className="text-lg" style={{ marginRight: SCREEN_WIDTH * (1 / 10)}}>실제 월급일에 영향을 주지는 않아요!</Text>
        </View>
        <Text className="text-xl font-bold mb-5" style={{ marginLeft: SCREEN_WIDTH * (1 / 10) }}>월급일</Text>
        <View style={{marginBottom: 100}}>
          <View style={styles.input}>
            <Text className='text-lg font-bold'>매월 </Text>
            <TextInput
              style={{ fontSize: 20, textAlign: 'right'}}
              returnKeyType="done"
              placeholder="15"
              keyboardType='numeric'
              maxLength={2}
              onChangeText={(text) => formattedNumber(text)}
              value={day}
            />
            <Text className='text-lg font-bold'> 일</Text>
          </View>
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        </View>
        <TouchableOpacity
          style={[styles.button, { opacity: errorMessage ? 0.5 : 1 }]}
          onPress={() => navigation.navigate('Settings')}
          disabled={errorMessage !== ''}
        >
          <Text className="text-white text-lg">다음</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ChangeSalaryDay;

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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    alignSelf: 'flex-end',
  }
});
