import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Fontisto, MaterialIcons, Entypo } from "@expo/vector-icons";
import theme from "../../style";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import Loading from "../../components/Loading.js";
import {
  callProductsDataAxios,
  callProductsDetailDataAxios,
} from "../../API/ShoppingMallData.js";
import RNEventSource from "react-native-event-source";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { local } from "d3";

const ShoppingMall = ({ navigation }) => {
  // 기믹에 이용될 상태들 선언
  const [products, setProducts] = useState("식품");
  const [ModalVisiable, setModalVisiable] = useState(false);
  const [choiceName, setChoiceName] = useState(null);
  const [choicePrice, setChoicePrice] = useState(null);
  const [choiceCommaPrice, setChoiceCommaPrice] = useState(null);
  const [choiceShop, setChoiceShop] = useState(null);
  const [choiceId, setChoiceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCallDataLoading, setIsCallDataLoading] = useState(true);
  const [isSelectAdd, setIsSelectAdd] = useState(false);
  const [isSelectProduct, setIsSelectProduct] = useState(false);
  const [isPushBtn, setIsPushBtn] = useState(false);
  const [nowData, setNowData] = useState(null);
  const [wantGoGoal, setWantGoGoal] = useState(false);
  const [myAccessToken, setMyAccessToken] = useState(null);

  // 화면 사이즈 찾기
  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
  const menuWidth = windowWidth * 0.35;
  const menuHeight = windowHeight * 0.25;
  const imgSize = menuWidth * 0.7;
  const modalHeight = windowHeight * 0.35;

  useEffect(() => {
    const callAccess = async () => {
      const myAccess = await AsyncStorage.getItem("@auth");
      setMyAccessToken(myAccess);
    };

    callAccess();
  }, []);

  useEffect(() => {
    if (myAccessToken !== null) {
      // console.log("called");
      // const baseURL = "http://j10a501.p.ssafy.io:8081";
      // const baseLocalURL = "http://70.12.247.81:8080/sse/subscribe";
      // const localAccessToken =
      //   "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInBob25lTnVtYmVyIjoiMTIzNDU2Nzg5MDAiLCJpYXQiOjE3MTIwNDQ4MDEsImV4cCI6MTcxMjA1MDgwMX0.68VpjoPrzWeyWE-ReGXSdPlVDtevoxqEK3an8sZ2uPo";
      // const options = {
      //   headers: {
      //     // Authorization: `Bearer ${JSON.parse(myAccessToken).accessToken}`,
      //     Authorization: `Bearer ${localAccessToken}`,
      //   },
      // };
      // const eventSource = new RNEventSource(
      //   `${baseLocalURL}/sse/subscribe`,
      //   options
      // );
      // eventSource.addEventListener("pocket", function (event) {
      //   console.log(event.type); // message
      //   console.log(event.data);
      // });
      // eventSource.addEventListener("date", function (event) {
      //   console.log(event.type); // message
      //   console.log(event.data);
      // });
      // eventSource.addEventListener("error", function (event) {
      //   console.log("여기서 에러", event.type); // message
      //   console.log(event.currentTarget.readyState);
      // });
      // eventSource.addEventListener("message", function (event) {
      //   console.log(event.type); // message
      //   console.log(event.data);
      // });
      // return () => {
      //   eventSource.close();
      // };
    }
  }, [myAccessToken]);

  // useEffect(() => {
  //   const accessToken =
  //     "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInBob25lTnVtYmVyIjoiMTIzNDU2Nzg5MDAiLCJpYXQiOjE3MTIwMjY5NzYsImV4cCI6MTcxMjAzMjk3Nn0.m3Msj9ggWDmbmj4hKUef1S-X6YmTXl5pZbLBQMx7u3o";
  //   const option = {
  //     method: "GET",
  //     headers: `Bearer ${accessToken}`,
  //     "Content-Type": "text/event-stream",
  //     Connection: "keep-alive",
  //     "Cache-Control": "no-cache",
  //   };

  //   const myURL = "http://70.12.247.81:8080/sse/subscribe";

  //   const ES = new EventSource(myURL, option);

  //   ES.addEventListener("open", (event) => {
  //     console.log("연결됨");
  //   });

  //   ES.addEventListener("pocket", (event) => {
  //     console.log("New message event:", event.data);
  //   });

  //   ES.addEventListener("date", (event) => {
  //     console.log("New message event:", event.data);
  //   });

  //   ES.addEventListener("close", (event) => {
  //     console.log("Close SSE connection");
  //   });

  //   ES.addEventListener("error", (event) => {
  //     if (event.type === "error") {
  //       console.error("Connection error:", event.message);
  //     } else if (event.type === "exception") {
  //       console.error("Error:", event.message, event.error);
  //     }
  //   });
  // }, [myAccessToken]);

  useFocusEffect(
    React.useCallback(() => {
      setWantGoGoal(false);
      setIsSelectProduct(false);
      setIsPushBtn(false);
      setModalVisiable(false);
    }, [])
  );

  // 데이터가 설정되면 로딩 종료
  useEffect(() => {
    if (nowData !== null) {
      setIsCallDataLoading(false);
    }
  }, [nowData]);

  // 카테고리가 바뀌면 바뀐 카테고리로 데이터 요청
  useEffect(() => {
    if (products !== null) {
      const catchData = (response) => {
        setNowData(response.data.data);
      };

      const fail = (error) => {
        console.log(error);
      };
      callProductsDataAxios(matchCategorys[products], catchData, fail);
    }
  }, [products]);

  // 스타일 선언!
  const ShoppingMallStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      justifyContent: "center",
      alignContent: "center",
    },
    toptitle: {
      flex: 0.6,
      marginTop: 60,
    },
    backBtn: {
      flex: 1,
      marginTop: windowHeight * 0.07,
      marginLeft: windowWidth * 0.05,
      position: "absolute",
    },
    pageTitle: {
      fontSize: 30,
      marginTop: 10,
      fontWeight: "bold",
      textAlign: "center",
    },
    categorys: {
      flex: 0.8,
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    eachCategory: {
      alignItems: "center",
      textAlign: "center",
    },
    selectedCategory: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    changeBgColor: {
      backgroundColor: "skyblue",
    },
    mainContent: {
      flex: 6,
      marginTop: 20,
      paddingBottom: 25,
    },
    eachMenu: {
      justifyContent: "center",
      alignItems: "center",
      textAlign: "left",
      borderColor: "lightgrey",
      borderWidth: 1,
      marginTop: 15,
      marginHorizontal: 5,
      width: menuWidth,
      height: menuHeight,
    },
    menuText: {
      fontWeight: "bold",
      paddingHorizontal: 8,
    },
    modalContainer: {
      backgroundColor: "white",
      height: modalHeight,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: "8%",
      marginVertical: "50%",
      borderRadius: 20,
    },
    moveBtn: {
      borderWidth: 1,
      width: 300,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      marginTop: 10,
    },
    modalFont: {
      fontSize: 18,
      fontWeight: "bold",
    },
    backgroundModal: {
      backgroundColor: "rgba(192, 192, 192, 0.7)",
      width: windowWidth,
      windowHeight: windowHeight,
      padding: windowHeight,
    },
  });

  // 카테고리 종류 배열로 선언
  const productCategorys = ["식품", "전자제품", "뷰티", "의류", "기타"];
  const matchCategorys = { 식품: 1, 전자제품: 2, 뷰티: 3, 의류: 4, 기타: 5 };
  //
  const imgMatch = {
    식품: require("../../../assets/categoryIcons/foods.png"),
    뷰티: require("../../../assets/categoryIcons/beauty.png"),
    전자제품: require("../../../assets/categoryIcons/electronics.png"),
    의류: require("../../../assets/categoryIcons/clothes.png"),
    기타: require("../../../assets/categoryIcons/etc.png"),
  };

  const addPurchase = {
    itemId: 26,
    itemName: "추가",
    itemPrice: 0,
    itemShop: "입력",
    category: "임의",
  };

  const menuImage = {
    1: require("../../../assets/categoryItems/1.webp"),
    2: require("../../../assets/categoryItems/2.webp"),
    3: require("../../../assets/categoryItems/3.webp"),
    4: require("../../../assets/categoryItems/4.webp"),
    5: require("../../../assets/categoryItems/5.webp"),
    6: require("../../../assets/categoryItems/6.webp"),
    7: require("../../../assets/categoryItems/7.webp"),
    8: require("../../../assets/categoryItems/8.webp"),
    9: require("../../../assets/categoryItems/9.webp"),
    10: require("../../../assets/categoryItems/10.webp"),
    11: require("../../../assets/categoryItems/11.webp"),
    12: require("../../../assets/categoryItems/12.webp"),
    13: require("../../../assets/categoryItems/13.webp"),
    14: require("../../../assets/categoryItems/14.webp"),
    15: require("../../../assets/categoryItems/15.webp"),
    16: require("../../../assets/categoryItems/16.webp"),
    17: require("../../../assets/categoryItems/17.webp"),
    18: require("../../../assets/categoryItems/18.webp"),
    19: require("../../../assets/categoryItems/19.webp"),
    20: require("../../../assets/categoryItems/20.webp"),
    21: require("../../../assets/categoryItems/21.webp"),
    22: require("../../../assets/categoryItems/22.webp"),
    23: require("../../../assets/categoryItems/23.webp"),
    24: require("../../../assets/categoryItems/24.webp"),
    25: require("../../../assets/categoryItems/25.webp"),
    26: require("../../../assets/categoryItems/add.png"),
  };
  // 액수에 쉼표 찍는 함수
  const formattedNumber = function (number) {
    return number.toLocaleString("ko-KR", { maximumFractionDigits: 0 });
  };

  // 메뉴 선택 시, 해당 메뉴의 정보를 상태로 가져줄 함수
  const choiceMenu = async (item) => {
    const newNum = formattedNumber(item.itemPrice);
    setChoiceName(item.itemName);
    setChoicePrice(item.itemPrice);
    setChoiceShop(item.itemShop);
    setChoiceId(item.itemId);
    setChoiceCommaPrice(newNum);

    setIsSelectProduct(true);
  };

  const selectAdd = (item) => {
    setIsLoading(true);
    setChoiceName(item.itemName);
    setChoicePrice("없음");
    setChoiceShop("없음");
    setChoiceCommaPrice("없음");
    setChoiceId(item.itemId);

    setIsSelectAdd(true);
    setIsLoading(false);
  };

  // FlatList에서 각각의 값에 들어갈 컴포넌트 선언
  const Things = ({ item }) => {
    // + 인지 아닌지 판별 맞다면 +만 출력
    if (item.itemName === "추가") {
      return (
        <View style={(style = ShoppingMallStyles.eachMenu)}>
          <TouchableOpacity
            onPress={() => {
              selectAdd(item);
            }}
          >
            <Image
              source={menuImage[item.itemId]}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
        </View>
      );
      // 아니라면, 이미지와 상품명, 가격 출력
    } else {
      // 숫자에 쉼표달기!
      const newNum = formattedNumber(item.itemPrice);
      return (
        <View style={ShoppingMallStyles.eachMenu}>
          <TouchableOpacity
            onPress={(event) => {
              choiceMenu(item);
              setModalVisiable(true);
            }}
          >
            <Image
              source={menuImage[item.itemId]}
              style={{ width: imgSize, height: imgSize, alignSelf: "center" }}
            />
            <Text
              style={{ ...ShoppingMallStyles.menuText, fontSize: 13 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.itemShop} {item.itemName}
            </Text>
            <Text style={{ ...ShoppingMallStyles.menuText, fontSize: 20 }}>
              {newNum}원
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  // 카테고리 클릭시 해당 카테고리로 상태 변화
  const clickCategory = (choice) => {
    setProducts(choice);
  };

  const data = {
    itemId: choiceId,
    name: choiceName,
    price: choicePrice,
    shop: choiceShop,
    category: products,
    isChecked: false,
  };

  const item = {
    id: choiceId,
    name: choiceName,
    price: choicePrice,
  };

  useEffect(() => {
    if (isSelectAdd) {
      setIsSelectAdd(false);
      navigation.navigate("FinishPayment", { data });
    } else if (isSelectProduct && isPushBtn) {
      setIsSelectProduct(false);
      setIsPushBtn(false);
      navigation.navigate("FinishPayment", { data });
    }
  });

  // 목표저축으로 가는걸 감지해서 보내주는 useEffect
  useEffect(() => {
    if (wantGoGoal !== false) {
      if (item.name.length > 25) {
        item.name = item.name.substring(0, 20);
      }
      navigation.navigate("RegistGoalSaving", { item });
    }
  }, [wantGoGoal]);

  // 코드 시작
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          ...ShoppingMallStyles.container,
          width: windowWidth * 0.8,
          alignSelf: "center",
        }}
      >
        {isCallDataLoading ? (
          <Loading />
        ) : (
          <React.Fragment>
            {/* 모달 부분 */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={ModalVisiable}
              onRequestClose={() => {
                setModalVisiable(false);
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModalVisiable(false);
                }}
              >
                <View
                  style={{
                    ...ShoppingMallStyles.backgroundModal,
                    position: "absolute",
                  }}
                ></View>
              </TouchableOpacity>
              <View
                style={{
                  ...ShoppingMallStyles.modalContainer,
                }}
              >
                <Text
                  style={{
                    ...ShoppingMallStyles.modalFont,
                    fontSize: 23,
                    paddingHorizontal: 20,
                  }}
                >
                  {choiceShop} {choiceName}
                </Text>
                <Text
                  style={{
                    ...ShoppingMallStyles.modalFont,
                    color: theme["black"],
                    marginBottom: 15,
                    fontSize: 20,
                  }}
                >
                  {" "}
                  {choiceCommaPrice}원{" "}
                </Text>
                {/* 목표저축으로 가는 버튼 연결하기 */}
                <View>
                  <TouchableOpacity
                    style={{
                      ...ShoppingMallStyles.moveBtn,
                      backgroundColor: theme["sky-bright-6"],
                      borderColor: theme["sky-bright-6"],
                    }}
                    onPress={() => {
                      setWantGoGoal(true);
                    }}
                  >
                    <Text style={ShoppingMallStyles.modalFont}>
                      목표 저축 등록하러 가기
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* 결제화면으로 가는 버튼 */}
                <View>
                  <TouchableOpacity
                    style={{
                      ...ShoppingMallStyles.moveBtn,
                      backgroundColor: theme["sky-bright-2"],
                      borderColor: theme["sky-bright-2"],
                    }}
                    onPress={() => {
                      setModalVisiable(false);
                      setIsPushBtn(true);
                      // navigation.navigate("FinishPayment", { data });
                    }}
                  >
                    <Text style={ShoppingMallStyles.modalFont}>결제하기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            {/* 상단 부분 (뒤로가기, 카테고리 텍스트) */}
            <View style={{ ...ShoppingMallStyles.toptitle }}>
              <Text style={ShoppingMallStyles.pageTitle}>IDK 몰</Text>
            </View>
            {/* 뒤로가기 버튼 부분 */}
            {/* <View style={{...ShoppingMallStyles.backBtn}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <MaterialIcons name="arrow-back-ios-new" size={36} color="black" />
              </TouchableOpacity>
              
            </View> */}

            {/* 카테고리 바 부분 */}
            <View style={ShoppingMallStyles.categorys}>
              {productCategorys.map((cate) => (
                <View key={cate} style={ShoppingMallStyles.eachCategory}>
                  <TouchableOpacity onPress={() => clickCategory(cate)}>
                    <View
                      style={{
                        ...ShoppingMallStyles.selectedCategory,
                        backgroundColor: products === cate ? "skyblue" : null,
                      }}
                    >
                      <Image
                        source={imgMatch[cate]}
                        style={{ width: 35, height: 35 }}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text>{cate}</Text>
                </View>
              ))}
            </View>

            {/* 카테고리 별 상품 출력 부분 */}
            <View style={ShoppingMallStyles.mainContent}>
              <FlatList
                // 먼저 필수 prop인 data를 보자 무조건 배열로 받아야한다!
                // 만약 + 구현할거면! 여기에 addPurchase 추가해주자!
                data={[...nowData]}
                // 다음 필수 prop인 renderItem이다.
                renderItem={Things}
                // 이것도 필수 prop인것 같다. key값을 주는 것인듯!(map을 생각해보자)
                keyExtractor={(item, index) => index}
                // 한개의 row에 몇개의 item(배열 안 요소)을 출력할지에 대해 정하는 prop
                numColumns={2}
                // numColumns가 있을 때만 사용가능한 props로 열간의 간격, 각 열의 스타일을 설정할 수 있다.
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </React.Fragment>
        )}
      </View>
    </View>
  );
};

export default ShoppingMall;
