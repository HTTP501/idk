import axios from "axios";

const BASE_URL = "";

// 헤더 로컬 스토리지에서 가져오는 부분 추후 구현
const header = {
  accessToken: null,
  refreshToken: null,
};

// 기본 axios 양식
const localAxios = function (method, url = "", data = null) {
  // restAPI 메서드, 보내는 주소, 데이터 매개변수로 받아오기
  return axios({
    method: method,
    url: `${BASE_URL}${url}`,
    header: header,
    data: data,
  });
};

// 요청 인터셉터
axios.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

export default localAxios;

// 영준오빠 참고 코드
// instance.interceptors.response.use(
//     async (response) => {
//         // 응답 후 로직 추가 가능
//         // pinia 스토어 불러오기
//         const authStore = useauthControllerStore();
//         const accessToken = authStore.myAccessToken;

//         if (accessToken) {
//           // Check if 'headers' property exists in 'response', if not, create it
//           if (!response.headers) {
//             response.headers = {};
//           }
//           // Add 'accessToken' property to 'headers'
//           response.headers.accessToken = accessToken;
//         }

//         return response;
//       },
//       async (error) => {
//         // 오류 응답에서 상태 코드를 가져옴
//         console.log(error);
//         const status = error.response.data.status;

//         // 상태 코드가 400이면서 메시지가 "Unauthorized"일 경우 access Token이 만료됨
//         if (
//           status === 400 &&
//           error.response.data.message === "토큰의 유효 기간이 만료되었습니다."
//         ) {
//           try {
//             const newStore = useauthControllerStore();

//             // access Token을 재발급 받는 요청
//             const { data } = await instance.post(
//               "/auth/refresh",
//               {
//                 memberId: newStore.myName,
//                 grantType: newStore.myGrantType,
//                 accessToken: newStore.myAccessToken,
//                 refreshToken: newStore.myRefreshToken,
//               },
//               function (response) {
//                 console.log(response);
//               },
//               function (error) {
//                 console.log(error);
//               }
//             );
//             // Store에 새로운 access Token 저장
//             newStore.myAccessToken = data.data.accessToken;

//             // 새로 받은 access Token으로 이전 요청 다시 보내기
//             const config = error.config;
//             //   console.log(config);
//             config.headers.Authorization = `Bearer ${newStore.myAccessToken}`;
//             return axios.request(config);
//           } catch (refreshError) {
//             // refresh token이 만료되었거나 다른 문제로 실패한 경우 로그인 페이지로 이동
//             console.error("Failed to refresh access token");
//             console.log(error);
//             alert("로그인 정보가 만료되어 다시 로그인이 필요합니다.");
//             router.push("/auth");
//           }
//         }

//         // access Token 만료 오류가 아닌 다른 오류의 경우 오류 처리
//         return Promise.reject(error);
//       }
//     );

//     return instance;
//   }
