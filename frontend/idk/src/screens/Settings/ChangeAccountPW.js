import React, { useRef, useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import theme from '../../style';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const ChangeAccountPW = ({ navigation }) => {
  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const [accountBeforePassword, setAccountBeforePassword] = useState('');
  const [accountPassword, setaccountPassword] = useState('');
  const [accountPasswordCheck, setaccountPasswordCheck] = useState('');
  const [passwordSame, setPasswordSame] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)

  const handleFirstTextInputChange = (text) => {
    // 입력값이 숫자가 아니면 무시
    if (!/^\d*$/.test(text)) return;
    setAccountBeforePassword(text);
    if (text.length === 4) {
      // 비밀번호가 맞으면
      // 4글자 입력 시 두 번째 TextInput으로 포커스 이동
      secondTextInputRef.current.focus();
    }
  };

  const handleSecondTextInputChange = (text) => {
    // 입력값이 숫자가 아니면 무시
    if (!/^\d*$/.test(text)) return;
    setaccountPassword(text);
    if (text.length === 4) {
      // 비밀번호가 이전 것과 똑같으면 안되므로
      if (text === accountBeforePassword) {
        setPasswordSame(true)
      } else {
        setPasswordSame(false)
        // 4글자 입력 시 두 번째 TextInput으로 포커스 이동
        thirdTextInputRef.current.focus();
      }
    }
  };

  const handleThirdTextInputChange = (text) => {
    // 입력값이 숫자가 아니면 무시
    if (!/^\d*$/.test(text)) return;
    setaccountPasswordCheck(text);
    if (text.length === 4) {
      if (text === accountPassword) {
        setPasswordMatch(true)
      } else {
        setPasswordMatch(false)
      }

    }
  };

  // '다음' 버튼 활성화 여부
  const isNextButtonEnabled = accountBeforePassword.length === 4 && accountPassword.length === 4 && accountPasswordCheck.length === 4 && passwordSame === false && passwordMatch === true;

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={{ flexGrow:1, alignItems:'center', justifyContent:'center'}}
        showsVerticalScrollIndicator={false}
      >
        <View className='mb-16'>
          <Text className='text-3xl font-bold '>계좌 비밀번호 변경</Text>
        </View>
        <View style={styles.box}>
          <Text className='text-base font-bold mb-3'>계좌 번호</Text>
          <Text 
            style={styles.input}
          >123-123-123</Text>
        </View>
        <View style={styles.box}>
          <Text className='text-base font-bold'>현재 계좌 비밀번호</Text>
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
          <Text className='text-base font-bold'>새로운 계좌 비밀번호</Text>
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
          {passwordSame && <Text style={styles.errorText}>비밀번호가 이전과 동일합니다.</Text>}
        </View>
        <View style={styles.box}>
          <Text className='text-base font-bold'>새로운 계좌 비밀번호 확인</Text>
          <TextInput 
            ref={thirdTextInputRef}
            style={styles.input}
            returnKeyType='next'
            placeholder='****'
            maxLength={4}
            keyboardType='numeric'
            onChangeText={handleThirdTextInputChange}
            secureTextEntry={true} // 입력된 번호를 *로 대체하여 보여줌
          ></TextInput>
          {!passwordMatch && <Text style={styles.errorText}>변경할 비밀번호가 다릅니다.</Text>}
        </View>
        <TouchableOpacity
          style={[styles.button, { opacity: isNextButtonEnabled ? 1 : 0.5 }]}
          onPress={() => navigation.navigate('Settings')}
          disabled={!isNextButtonEnabled}
        >
          <Text className='text-white text-lg'>변경</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ChangeAccountPW;

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
    // position: 'absolute',
    bottom: 20, // 화면 하단과의 간격
    alignSelf: 'center',
    borderRadius: 10
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  }
});
