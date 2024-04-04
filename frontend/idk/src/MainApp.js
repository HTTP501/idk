import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Tab from "./navigations/Tab";
import AuthStack from "./navigations/AuthStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import theme from "./style";
import EventSource from "react-native-sse";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const AUTH_KEY = "@auth";
const SIGNUP_KEY = "@signup";

export default function MainApp() {
  
  // AsyncStorage.clear();
  const navigation = useNavigation();
  const [authData, setAuthData] = useState({});
  const [signupData, setSignupData] = useState({});
  const scrollViewRef = useRef(null); // ScrollView의 ref
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 인덱스

  // 앱이 처음 시작될 때 대기 화면 표시 스토리지 로딩 될 때까지 대기 화면 표시
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    const load = async () => {
      await loadStorages();
      SplashScreen.hideAsync();
    };
    load();
  }, []);

  // storage에 있으면 회원가입 안해도 되므로
  const loadStorages = async () => {
    const a = await AsyncStorage.getItem(AUTH_KEY);
    const s = await AsyncStorage.getItem(SIGNUP_KEY);
    if (a !== null) {
      setAuthData(JSON.parse(a));
    }
    if (s !== null) {
      setSignupData(JSON.parse(s));
    }
  };

  // 다음 페이지로 이동하는 함수
  const scrollToNextPage = () => {
    const nextPage = currentPage + 1;
    scrollViewRef.current.scrollTo({
      x: nextPage * 275,
      animated: true,
    });
    setCurrentPage(nextPage);
  };

  // 이전 페이지로 이동하는 함수
  const scrollToPreviousPage = () => {
    const previousPage = currentPage - 1;
    scrollViewRef.current.scrollTo({
      x: previousPage * 275,
      animated: true,
    });
    setCurrentPage(previousPage);
  };

  if (Object.keys(authData).length > 0) {
    // authData도 있으면 MainStack 실행
    return <Tab />;
  } else if (Object.keys(signupData).length > 0) {
    // signupData가 있으면 AuthStack 실행
    return <AuthStack />;
  } else {
    // 둘 다 없으면 이미지와 버튼 실행
    return (
      <View
        className="flex-1 items-center bg-white"
        style={{ backgroundColor: "#3FB7FF" }}
      >
        <Image
          source={require("../assets/logo/white_idk_logo_big.png")}
          style={{
            width: 100,
            height: 100,
            marginTop: 100
          }}
        />
        <View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
              marginVertical: 20,
            }}
          >
            나의 지출관리 도우미, IDK
          </Text>
          {/* <Text className='text-base text-center text-white mb-8 font-bold'>넘기며 확인해보세요!</Text> */}
        </View>
        <View className='flex-row justify-between items-center' style={{width:380}}>
          <TouchableOpacity
            // 이전 페이지로 이동하는 버튼
            onPress={scrollToPreviousPage}
            disabled={currentPage === 0}
            style={{opacity: currentPage===0 ? 0.2 : 1 }}
          >
            <AntDesign name="left" size={36} color="white" />
          </TouchableOpacity>
          <View style={{width:275}}>
        <ScrollView
          ref={scrollViewRef}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ width: 275, height: 427 }}
          onScroll={(event) => {
            const { x } = event.nativeEvent.contentOffset;
            const pageIndex = Math.round(x / 275);
            setCurrentPage(pageIndex);
          }}
        >
          <TouchableOpacity
            onPress={scrollToNextPage}
            activeOpacity={1}
          >
            <Image
              source={require("../assets/logo/explain1.png")}
              style={{ width: 275, height: 427, borderRadius: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={scrollToNextPage}
            activeOpacity={1}
          >
          <Image
            source={require("../assets/logo/explain2.png")}
            style={{ width: 275, height: 427, borderRadius: 20 }}
          />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={scrollToNextPage}
            activeOpacity={1}
          >
          <Image
            source={require("../assets/logo/explain3.png")}
            style={{ width: 275, height: 427, borderRadius: 20 }}
          />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={scrollToNextPage}
            activeOpacity={1}
          >
          <Image
            source={require("../assets/logo/explain4.png")}
            style={{ width: 274, height: 427, borderRadius: 20 }}
          />
          </TouchableOpacity>
          <View style={{ width: 275, height: 427, justifyContent: "center" }}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                
                borderWidth: 3,
                height: 80,
                borderColor: "white",
                borderRadius: 20,
                backgroundColor:theme["sky-bright-1"]
              }}
              onPress={() => {
                // 회원가입 페이지로 이동
                navigation.navigate("SignupStack");
              }}
            >
              <Text className="text-white text-2xl font-bold">IDK 은행 회원가입</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

          </View>
          <TouchableOpacity
            // 다음 페이지로 이동하는 버튼
            onPress={scrollToNextPage}
            disabled={currentPage === 4}
            style={{opacity: currentPage===4 ? 0.2 : 1 }}
          >
            <AntDesign name="right" size={36} color="white" />
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}
