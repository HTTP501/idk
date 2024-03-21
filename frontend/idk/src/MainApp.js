import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import * as SplashScreen from "expo-splash-screen";
import * as Font from 'expo-font';
import Tab from './navigations/Tab'
import AuthStack from './navigations/AuthStack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

const AUTH_KEY = '@auth'
const SIGNUP_KEY = '@signup'

export default function MainApp() {
  // AsyncStorage.clear()
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [authData, setAuthData] = useState({});
  const [signupData, setSignupData] = useState({});
  // 앱이 처음 시작될 때 대기 화면 표시 + 폰트 로딩 될 때까지 대기 화면 표시
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    const loadFonts = async () => {
      try {
        // await Font.loadAsync({
        //   'MaplestoryBold': require('../assets/fonts/MaplestoryBold.ttf')
        // });
        setFontsLoaded(true);
        console.log('폰트 설치')
      } catch (error) {
        console.error("Error loading fonts:", error);
        // 폰트 로딩에 실패한 경우 에러 처리 추가
      }
    };
    
    const load = async () => {
      await loadFonts();
      await loadStorages();
      SplashScreen.hideAsync();
    };
    load();
  }, []);
  
  // storage에 있으면 회원가입 안해도 되므로
  const loadStorages = async () => {
    const a = await AsyncStorage.getItem(AUTH_KEY)
    const s = await AsyncStorage.getItem(SIGNUP_KEY)
    if (a !== null) {
      setAuthData(JSON.parse(a));
    }
    if (s !== null) {
      setSignupData(JSON.parse(s));
    }
  }

  // 폰트 로드 안되면 null
  if (!fontsLoaded) {
    return null;
  }

  if (Object.keys(authData).length > 0) {
    // authData도 있으면 MainStack 실행
    return <Tab />;
  } else if (Object.keys(signupData).length > 0) {
    // signupData가 있으면 AuthStack 실행
    return <AuthStack />;
  } else {
    // 둘 다 없으면 이미지와 버튼 실행
    return (
      <View className="flex-1 items-center justify-center bg-white" style={{backgroundColor:'#3FB7FF'}}>
        <Image source={require('../assets/logo/white_idk_logo_big.png')} style={{ width:120, height: 120, marginVertical: SCREEN_HEIGHT * (1/10) }} />
        <View>
          <Text style={{ fontFamily: 'MaplestoryBold', fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'white', marginBottom: 20 }}>매달 고정 지출 관리가 어렵다면?</Text>
        </View>
        <ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          centerContent={true}
          endFillColor='red'
          style={{ width: 275, height: 427 }}
        >
          <Image source={require('../assets/logo/explain1.png')}  style={{ width: 275, height: 427, borderRadius: 20 }}/>
          <Image source={require('../assets/logo/explain2.png')}  style={{ width: 275, height: 427, borderRadius: 20 }}/>
          <Image source={require('../assets/logo/explain3.png')}  style={{ width: 275, height: 427, borderRadius: 20 }}/>
          <Image source={require('../assets/logo/explain4.png')}  style={{ width: 275, height: 427, borderRadius: 20 }}/>
          <View
            style={{ width: 275, height: 427, justifyContent: 'center' }}
          >
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 0.5,
                height: 50,
                borderColor: 'white',
                borderRadius: 10
              }}
              onPress={() => {
                // 회원가입 페이지로 이동
                navigation.navigate('SignupStack');
              }}
            >
              <Text className='text-white'>IDK 은행 회원가입</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    );
  }
}
