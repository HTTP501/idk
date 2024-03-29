import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Modal,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import theme from "../../style";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import CheckBox from "expo-checkbox";
import { payRequestAxios, approvalPayAxios } from "../../API/PayRequest.js";
import { getAccountAxios } from "../../API/Account.js";

const FinishPayment = ({ route, navigation }) => {
  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
  const orderSize = windowWidth * 0.5;
  const orderPriceSize = windowWidth * 0.45;

  // 각종 상태들 선언
  const [isChecked, setChecking] = useState(false);
  const [myProducts, setProducts] = useState("");
  const [myPrice, setMyPrice] = useState("");
  const [myPlz, setMyPlz] = useState("");
  // 네비게이터에 껴서 보낼 계좌 정보 상태로 저장
  const [myAccount, setMyAccount] = useState(null);
  const [isGetAccount,setisGetAccount] = useState(true);
  const [orderId, setOrderId] = useState(null);
  const [showModalState, setShowModalState] = useState(false);

  // 입장시 계좌 정보 호출
  useEffect(() => {
    const getAccountData = (response) => {
      setMyAccount(response.data.data)
    }

    const fail = (error) => {
      console.log(error);
    }

    getAccountAxios(getAccountData, fail)
  }, [])

  // 계좌 정보를 받기 전까지 로딩 화면을 보여주기 위해서 useEffect 사용
  useEffect(() => {
    if (myAccount !== null) {
      setisGetAccount(false)
    }
  }, [myAccount])

  // 결제 요청을 보내서 orderId를 받으면 계좌 비밀번호 입력으로 이동
  useEffect(() => {
    if (orderId !== null) {
      const destination = {stack: "PaymentStack", screen: "FinishPayment"}
      const data = route.params.data
      navigation.navigate("AuthPW", { data , destination })
    }
  }, [orderId])

  // 결제 요청에서 비밀번호 인증을 받고 돌아왔다면,
  useEffect(() => {
    if (route.params.data.isChecked === true) {
      const successRequest = (response) => {
        console.log(response.data);
        navigation.replace("PayResult", { finalData });
      }

      const fail = (error) => {
        console.log(error);
      }

      approvalPayAxios(finishData, successRequest, fail)
    }
  }, [route.params.data.isChecked])

  const finalData = myAccount === null ? (null) : (
    {accountNumber: myAccount.accountNumber,
    accountName: myAccount.accountName,
    price: route.params.data.price})
    
  const modalHeight = windowHeight * 0.35;

  const FinishPaymentStyle = StyleSheet.create({
    container: {
      flex: 1,
    },
    backBtn: {
      flex: 3.5,
      marginTop: 60,
      paddingHorizontal: 20,
    },
    productsInfoBox: {
      flex: 2.5,
      paddingHorizontal: 10,
    },
    payMethodBox: {
      flex: 2.5,
      paddingHorizontal: 20,
    },
    resultBox: {
      flex: 2.5,
      paddingHorizontal: 25,
    },
    requestInput: {
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: theme["light-grey-darkness"],
      borderColor: theme["light-grey-darkness"],
      height: 30,
      marginVertical: "3%",
      marginHorizontal: "1%",
    },
    addressText: {
      fontWeight: "bold",
      marginVertical: 1,
    },
    sparateLine: {
      width: windowWidth,
      backgroundColor: theme["grey"],
      height: 5,
      marginTop: "5%",
      marginBottom: "3%",
      flex: 0.1,
    },
    payMethodStyle: {
      borderWidth: 1,
      flexDirection: "row",
      marginHorizontal: "2%",
      padding: "2%",
      borderRadius: 10,
      paddingVertical: "4%",
    },
    resultStyle: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    makeLine: {
      marginTop: "10%",
      borderWidth: 0.5,
      borderColor: "black",
      width: "100%",
    },
    purchaseBtn: {
      borderWidth: 1,
      borderColor: theme["sky-bright-2"],
      backgroundColor: theme["sky-bright-2"],
      width: "100%",
      height: 50,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    btnFont: {
      color: "white",
      fontWeight: "bold",
      fontSize: 23,
    },
    backgroundModal: {
      backgroundColor: "rgba(192, 192, 192, 0.7)",
      width: windowWidth,
      windowHeight: windowHeight,
      padding: windowHeight,
      paddingTop: "100%",
      position: "absolute"
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
    modalFont: {
      fontSize: 18,
      fontWeight: "bold",
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
  });

  const   menuImage = {
    식품: require("../../../assets/categoryIcons/foods.png"),
    뷰티: require("../../../assets/categoryIcons/beauty.png"),
    전자제품: require("../../../assets/categoryIcons/electronics.png"),
    의류: require("../../../assets/categoryIcons/clothes.png"),
    기타: require("../../../assets/categoryIcons/etc.png"),
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

  const formattedNumber = function (number) {
    return number.toLocaleString("ko-KR", { maximumFractionDigits: 0 });
  };

  const newNum = formattedNumber(route.params.data.price);
  const changeNum = formattedNumber(Number(myPrice));

  const showPrice = (price, format) => {
    return (
      <View
        style={{
          ...FinishPaymentStyle.resultStyle,
          marginTop: 20,
          marginHorizontal: 5,
        }}
      >
        <Text style={{ ...FinishPaymentStyle.addressText, fontSize: 18 }}>
          {format}
        </Text>
        {price === "없음" ? (
          <Text style={{ ...FinishPaymentStyle.addressText, fontSize: 18 }}>
            {changeNum}원
          </Text>
        ) : (
          <Text style={{ ...FinishPaymentStyle.addressText, fontSize: 18 }}>
            {price}원
          </Text>
        )}
      </View>
    );
  };

  const checkPart = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          marginVertical: 20,
        }}
      >
        <CheckBox
          value={isChecked}
          onValueChange={() => setChecking(!isChecked)}
        />
        <Text style={{ marginHorizontal: 5, fontWeight: "bold" }}>
          개인정보 제3자 제공 내용 및 결제에 동의합니다.
        </Text>
      </View>
    );
  };

  const plzCheckAlert = () => {
    Alert.alert("안내", "결제에 동의해주세요!", [
      { text: "알겠어요!", style: "cancel" },
    ]);
  };

  const selectProducts = () => {
    return (
      <View style={FinishPaymentStyle.productsInfoBox}>
        <Text
          style={{
            ...FinishPaymentStyle.addressText,
            fontSize: 18,
            marginBottom: 20,
          }}
        >
          주문상품 1건
        </Text>
        <View style={{ flexDirection: "row" }}>
            <Image
              source={menuImage[route.params.data.itemId]}
              style={{ width: 80, height: 80 }}
            />
          <View>
            <Text style={{ ...FinishPaymentStyle.addressText, marginLeft: 15 }}>
              {route.params.data.shop}
            </Text>
            <Text style={{ ...FinishPaymentStyle.addressText, marginLeft: 15 }}>
              {route.params.data.name}
            </Text>
            <Text style={{ ...FinishPaymentStyle.addressText, marginLeft: 15 }}>
              {newNum}원
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const onChangeProducts = (payload) => {
    setProducts(payload);
  };
  const onChangePrice = (payload) => {
    setMyPrice(payload);
  };
  const onChangePlz = (payload) => {
    setMyPlz(payload);
  };

  const selectedAdd = () => {
    return (
      <View style={FinishPaymentStyle.productsInfoBox}>
        <Text
          style={{
            ...FinishPaymentStyle.addressText,
            fontSize: 18,
            marginBottom: 20,
          }}
        >
          주문상품 1건
        </Text>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Image
            source={menuImage[route.params.data.category]}
            style={{ width: 60, height: 60, marginRight: 20 , marginTop: 5}}
          />
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 18, marginRight: 20 }}
              >
                상품이름
              </Text>
              <TextInput
                onChangeText={onChangeProducts}
                keyboardType="defalut"
                returnKeyType="done"
                value={myProducts}
                placeholder="물건을 입력해주세요"
                style={{
                  borderWidth: 0.5,
                  borderRadius: 5,
                  width: orderPriceSize,
                  height: 40,
                  paddingHorizontal: 15,
                }}
              ></TextInput>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 18, marginRight: 54 }}
              >
                가격
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextInput
                  onChangeText={onChangePrice}
                  keyboardType="numeric"
                  returnKeyType="done"
                  value={myPrice}
                  placeholder="가격을 입력해주세요"
                  style={{
                    borderWidth: 0.5,
                    borderRadius: 5,
                    width: orderPriceSize,
                    height: 40,
                    paddingHorizontal: 15,
                  }}
                ></TextInput>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // 어떤 것을 누르고 들어왔는지에 따라 상태 설정하기
  useEffect(() => {
    setChecking(false);
    if (route.params.data.name === "추가") {
      setProducts(null);
      setMyPrice(null);
    } else {
      setProducts(route.params.data.name);
      setMyPrice(route.params.data.price);
    }
  }, []);

  // 네비게이터에 같이 보낼 데이터
  const finishData = {
    orderId: orderId,
  };

  // 클릭 시 모달을 종료 시킬 함수
  const turnOffModal = () => {
    setShowModalState(false)
  }

  // 화면 출력 부분! //
  return (
    <View style={{flex: 1}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModalState}
        onRequestClose={() => {
          setShowModalState(false)
        }} 
      >      
        <View style={{...FinishPaymentStyle.backgroundModal}}></View>
        <View style={{...FinishPaymentStyle.modalContainer}}>
        
            <Text style={{...FinishPaymentStyle.modalFont}}>
              계좌에 남은 잔고가 모자라서 
            </Text>
            <Text style={{...FinishPaymentStyle.modalFont}}>
              결제에 실패하였습니다.
            </Text>
            <TouchableOpacity
              style={{
                ...FinishPaymentStyle.moveBtn,
                backgroundColor: theme["sky-bright-6"],
                borderColor: theme["sky-bright-6"],
                marginTop: 30,
              }}
              onPress={() => {
                setShowModalState(false)
              }}
            >
              <Text style={FinishPaymentStyle.modalFont}>
                확인
              </Text>
            </TouchableOpacity>

    
        </View>
      </Modal> 

      <ScrollView style={FinishPaymentStyle.container}>
        {/* 주소 및 받는 이 정보 부분 */}
        <View style={FinishPaymentStyle.backBtn}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MaterialIcons name="arrow-back-ios-new" size={36} color="black" />
          </TouchableOpacity>
          <Text style={{ marginTop: 20 }}>
            <Text
              style={{
                ...FinishPaymentStyle.addressText,
                color: theme["sky-bright-1"],
                fontSize: 22,
              }}
            >
              SSAFY
            </Text>{" "}
            <Text style={{ ...FinishPaymentStyle.addressText, fontSize: 22 }}>
              로 받기
            </Text>
          </Text>
          <Text style={FinishPaymentStyle.addressText}>
            로컬에서 나의 이름을 가져올게요
          </Text>
          <Text style={FinishPaymentStyle.addressText}>
            로컬에서 나의 전화번호를 가져올게요
          </Text>
          <Text style={FinishPaymentStyle.addressText}>
            서울특별시 강남구 테헤란로 212 (역삼동 718-5번지)
          </Text>
          <TextInput
            onChangeText={onChangePlz}
            placeholder={"배송 시 요청사항"}
            value={myPlz}
            style={{
              ...FinishPaymentStyle.requestInput,
              fontWeight: "bold",
              paddingHorizontal: 20,
            }}
          ></TextInput>
        </View>
        <View style={FinishPaymentStyle.sparateLine}>
          <Text></Text>
        </View>

        {/* 주문 상품 정보 부분 */}
        <View style={FinishPaymentStyle.productsInfoBox}>
          {route.params.data.name === "추가"
            ? (selectedAdd())
            : (selectProducts())}
        </View>

        <View style={FinishPaymentStyle.sparateLine}></View>

        {/* 결제 수단 정보 부분 */}
        <View style={FinishPaymentStyle.payMethodBox}>
          <Text
            style={{
              ...FinishPaymentStyle.addressText,
              fontSize: 18,
              marginBottom: 20,
            }}
          >
            결제수단
          </Text>
          <View
            style={{
              ...FinishPaymentStyle.payMethodStyle,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {isGetAccount ? (<ActivityIndicator size={"large"} color={theme["sky-basic"]} style={{marginVertical: 25,}} />) : (
              <React.Fragment>
                <View style={{ marginLeft: "5%" }}>
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    {myAccount.accountName}
                  </Text>
                  <Text>{myAccount.accountNumber}</Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 15,
                      marginRight: 20,
                    }}
                  >
                    {formattedNumber(myAccount.accountBalance)} 원
                  </Text>
                </View>
              </React.Fragment>
            )}
          </View>
        </View>

        <View style={FinishPaymentStyle.sparateLine}></View>

        {/* 결제 결과 정보 부분 */}
        <View style={FinishPaymentStyle.resultBox}>
          {showPrice(newNum, "상품금액")}
          {showPrice(0, "할인가")}
          {/* 경계선 */}
          <View style={FinishPaymentStyle.makeLine}></View>
          {showPrice(newNum, "총 결제금액")}
          {/* 버튼 부분 */}
          <TouchableOpacity
            onPress={() => {
              if (isChecked == true) {
                // 결제 완료 API 보내기
                const catchData = (response) => {
                  setOrderId(response.data.data)
                }
            
                const fail = (error) => {
                  console.log(error);
                  if (error.response.data.code === "P403") {
                    setShowModalState(true)
                  }
                }
                payRequestAxios(route.params.data.itemId, catchData, fail)
              } else {
                // 동의 체크하라고 alert 보내기!
                plzCheckAlert();
              }
            }}
          >
            <View style={{ ...FinishPaymentStyle.purchaseBtn }}>
              <Text style={{ ...FinishPaymentStyle.btnFont }}>
                동의하고 결제하기
              </Text>
            </View>
          </TouchableOpacity>
          {checkPart()}
        </View>
      </ScrollView>
    </View>
  );
};

export default FinishPayment;
