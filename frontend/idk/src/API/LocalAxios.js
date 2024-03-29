import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigations/AppNavigation";

// 내가 적은것
export default function localAxios() {
  const instance = axios.create({
    baseURL: "http://j10a501.p.ssafy.io:8081/api",
    headers: {
      tmp: "application/json",
    },
  });

  // 요청을 보낼때의 인터셉터
  // axios 요청의 설정값인 config를 가져옴
  instance.interceptors.request.use(
    async (config) => {
      try {
        const accessToken = await AsyncStorage.getItem("@auth");
        console.log(accessToken)
        config.headers["Content-Type"] = "application/json";
        if (accessToken !== null) {
          config.headers.Authorization = `Bearer ${
            JSON.parse(accessToken).accessToken
          }`;
        }
      } catch (error) {
        console.error("Error while setting authorization header:", error);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // 요청에 대한 응답을 인터셉트 한다.
  // 요청에 대한 응답인 response를 가져온다.
  instance.interceptors.response.use(
    // 요청을 보내서 응답이 왔다면 access 토큰에 문제가 없으므로 응답을 return
    async (response) => {
      return response;
    },
    // 만약 요청을 보내서 에러가 왔다면,
    async (error) => {
      // console.log("response",error.response.data)
      // 해당 에러의 코드를 가져온다.
      const status = error.response.data.status;

      // 만약 에러의 이유가 토큰의 유효기간이 만료된 것이라면?
      if (
        status == 401 &&
        error.response.data.message === "토큰이 만료되었습니다."
      ) {
        // try catch를 이용한다
        // 왜요?? refresh 토큰도 만료될 수 있기 때문이다.
        // 만약 요청을 보냈을 때 refresh 토큰도 만료되어 에러가 나온다면
        // 정해진 기믹을 수행하게 해주면 된다. ex) 재로그인 시켜서 refresh 토큰 재발급 받기
        try {
          // data라는 변수에 요청을 보내 받은 응답값을 저장하고자 한다.
          // instance는 상단에서 설정한 axios 함수이다.
          const p = await AsyncStorage.getItem("@signup");
          const phoneNumber = JSON.parse(p).phoneNumber;
          const { data } = await instance.post(
            // url(API주소)
            "/member/reissue",
            // API에 필요한 인자
            {
              phoneNumber: phoneNumber,
            }
          );
          // 받은 요청에서 accessToken을 꺼내서 저장하자!
          // 저번 회의의 결과로 refreshToken도 같이 갱신해주기로 했다면 이쪽에서 갱신해주면 된다!
          console.log(data);
          const a = JSON.stringify({ accessToken: data.data.accessToken });
          await AsyncStorage.setItem("@auth", a);
          const newAccessToken = data.data.accessToken;
          // 에러났던 요청 설정을 가져온다!
          const config = error.config;
          // 에러났던 요청에서 헤더의 accessToken만 갈아끼워서
          config.headers.Authorization = `Bearer ${newAccessToken}`;
          // 재요청을 보낸다.
          return axios.request(config);
        } catch (refreshError) {
          // refresh token이 만료되었거나 다른 문제로 실패한 경우
          // 여기 네비게이터를 추가해주세요~!
          const a = JSON.stringify({});
          await AsyncStorage.setItem("@auth", a);
          Alert.alert(
            "로그인 시간이 만료되었습니다.",
            "로그인 페이지로 이동합니다.",
            [
              {
                text: "확인",
                onPress: () => {
                  navigate("AuthStack");
                },
              },
            ]
          );
          // navigation.navigate('AuthStack')
        }
      }
      return Promise.reject(error);
    }
  );
  return instance;
}
