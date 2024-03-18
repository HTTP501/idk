import React, { useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import theme from '../../style';
import { useNavigation } from '@react-navigation/native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const EnterName = ({ navigation }) => {
  const [name, setName] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleNameChange = (text) => {
    if (!/^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\s]*$/.test(text)) {
      Alert.alert('한글 또는 영어만 이름에 입력할 수 있습니다.','',[{text:'확인'}])
      return
    }
    setName(text);
    setIsButtonDisabled(text.length === 0 || !/^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\s]*$/.test(text));
  };

  const sendData = {name: name}

  return (
    <View style={styles.container}>
      <View className="flex-row mb-16" style={{ marginLeft: SCREEN_WIDTH * (1 / 10) }}>
        <Text className="text-3xl font-bold ">이름</Text>
        <Text className="text-3xl">을 입력해 주세요.</Text>
      </View>
      <TextInput
        style={styles.input}
        returnKeyType="done"
        placeholder="홍길동"
        value={name}
        onChangeText={handleNameChange}
      />
      <TouchableOpacity
        style={[styles.button, { opacity: isButtonDisabled ? 0.5 : 1 }]}
        disabled={isButtonDisabled}
        onPress={() => navigation.navigate('EnterBirthId', sendData)}>
        <Text className="text-white text-lg">다음</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EnterName;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  input: {
    borderBottomWidth: 2,
    width: SCREEN_WIDTH * (8 / 10),
    height: 50,
    marginBottom: 100,
    alignSelf: 'center',
    fontSize: 20,
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
