import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function AuthLocal() {
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState(null);

  const checkBiometricAvailability = async () => {
    const available = await LocalAuthentication.hasHardwareAsync();
    const biometricType = await LocalAuthentication.supportedAuthenticationTypesAsync();
    
    setIsBiometricAvailable(available);
    setBiometricType(biometricType);
  };

  const authenticate = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: '지문을 인식하여 로그인하세요', // 지문 인식 프롬프트 메시지
    });

    if (result.success) {
      // 인증 성공
      console.log('Authentication successful');
    } else {
      // 인증 실패 또는 취소
      console.log('Authentication failed or canceled');
    }
  };

  return (
    <View style={styles.container}>
      <Text>지문 인식 가능 여부: {isBiometricAvailable ? 'Yes' : 'No'}</Text>
      <Text>지문 인식 타입: {biometricType}</Text>
      <Button title="지문 인식 가능 여부 확인" onPress={checkBiometricAvailability} />
      {isBiometricAvailable && <Button title="지문 인식으로 인증하기" onPress={authenticate} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
