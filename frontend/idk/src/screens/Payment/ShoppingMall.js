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
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import theme from "../../style";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Loading from "../../components/Loading.js";
import {
  callProductsDataAxios,
  callProductsDetailDataAxios,
} from "../../API/ShoppingMallData.js";

const ShoppingMall = ({ navigation }) => {
  // 기믹에 이용될 상태들 선언
  const [products, setProducts] = useState("식품");
  const [ModalVisiable, setModalVisiable] = useState(false);
  const [choiceName, setChoiceName] = useState(null);
  const [choicePrice, setChoicePrice] = useState(null);
  const [choiceCommaPrice, setChoiceCommaPrice] = useState(null);
  const [choiceShop, setChoiceShop] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelectAdd, setIsSelectAdd] = useState(false);
  const [isSelectProduct, setIsSelectProduct] = useState(false);
  const [isPushBtn, setIsPushBtn] = useState(false);
  const [nowData, setNowData] = useState(false);
  const [nowDetailData, setNowDetailData] = useState(false);

  // 화면 사이즈 찾기
  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
  const menuWidth = windowWidth * 0.4;
  const menuHeight = windowHeight * 0.4;
  const imgSize = menuWidth * 0.8;
  const modalHeight = windowHeight * 0.35;

  // useEffect(() => {
  //   const catchData = (response) => {
  //     setNowData(response.data.data)
  //   }

  //   const fail = (error) => {
  //     console.log(error);
  //   }
  //   callProductsDataAxios(, catchData, fail)
  // }, [])

  // 스타일 선언!
  const ShoppingMallStyles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
    },
    backBtn: {
      flex: 1,
      marginTop: 60,
    },
    pageTitle: {
      fontSize: 25,
      marginTop: 10,
      fontWeight: "bold",
    },
    categorys: {
      flex: 1,
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
      paddingHorizontal: 5,
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
  const productCategorys = ["식품", "뷰티", "전자제품", "의류", "기타"];
  //
  const imgMatch = {
    식품: require("../../../assets/categoryIcons/foods.png"),
    뷰티: require("../../../assets/categoryIcons/beauty.png"),
    전자제품: require("../../../assets/categoryIcons/electronics.png"),
    의류: require("../../../assets/categoryIcons/clothes.png"),
    기타: require("../../../assets/categoryIcons/etc.png"),
  };

  const addPurchase = {
    name: "추가",
    price: 0,
    shop: "입력",
    category: "임의",
  };

  // const tmp_data = {
  //   식품: [
  //     { name: "음식1", price: 10000, shop: "슈퍼", category: "음식" },
  //     { name: "음식2", price: 10000, shop: "슈퍼", category: "음식" },
  //     { name: "음식3", price: 10000, shop: "슈퍼", category: "음식" },
  //     { name: "음식4", price: 10000, shop: "슈퍼", category: "음식" },
  //   ],
  //   전자제품: [
  //     {
  //       name: "전자제품1",
  //       price: 10000,
  //       shop: "삼성전자",
  //       category: "전자제품",
  //     },
  //     {
  //       name: "전자제품2",
  //       price: 10000,
  //       shop: "삼성전자",
  //       category: "전자제품",
  //     },
  //     {
  //       name: "전자제품3",
  //       price: 10000,
  //       shop: "삼성전자",
  //       category: "전자제품",
  //     },
  //     {
  //       name: "전자제품4",
  //       price: 10000,
  //       shop: "삼성전자",
  //       category: "전자제품",
  //     },
  //   ],
  //   뷰티: [
  //     { name: "뷰티1", price: 10000, shop: "올리브영", category: "뷰티" },
  //     { name: "뷰티2", price: 10000, shop: "올리브영", category: "뷰티" },
  //     { name: "뷰티3", price: 10000, shop: "올리브영", category: "뷰티" },
  //     { name: "뷰티4", price: 10000, shop: "올리브영", category: "뷰티" },
  //   ],
  //   의류: [
  //     { name: "의류1", price: 10000, shop: "무신사", category: "의류" },
  //     { name: "의류2", price: 10000, shop: "무신사", category: "의류" },
  //     { name: "의류3", price: 10000, shop: "무신사", category: "의류" },
  //     { name: "의류4", price: 10000, shop: "무신사", category: "의류" },
  //   ],
  //   기타: [
  //     { name: "기타1", price: 10000, shop: "쿠팡", category: "기타" },
  //     { name: "기타2", price: 10000, shop: "쿠팡", category: "기타" },
  //     { name: "기타3", price: 10000, shop: "쿠팡", category: "기타" },
  //     { name: "기타4", price: 10000, shop: "쿠팡", category: "기타" },
  //   ],
  // };
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
    추가: require("../../../assets/categoryItems/add.png"),
  };
  // 액수에 쉼표 찍는 함수
  const formattedNumber = function (number) {
    return number.toLocaleString("ko-KR", { maximumFractionDigits: 0 });
  };

  // 메뉴 선택 시, 해당 메뉴의 정보를 상태로 가져줄 함수
  const choiceMenu = async (item) => {
    //   const catchDetailData = (response) => {
    //     setNowDetailData(response.data.data)
    //   }

    //   const fail = (error) => {
    //     console.log(error);
    //   }
    // callProductsDetailDataAxios("아이템 id 넣으세요", catchDetailData, fail)

    const newNum = formattedNumber(item.price);
    setChoiceName(item.name);
    setChoicePrice(item.price);
    setChoiceShop(item.shop);
    setChoiceCommaPrice(newNum);

    setIsSelectProduct(true);
  };

  const selectAdd = (item) => {
    setIsLoading(true);
    setChoiceName(item.name);
    setChoicePrice("없음");
    setChoiceShop("없음");
    setChoiceCommaPrice("없음");

    setIsSelectAdd(true);
    setIsLoading(false);

    // navigation.navigate("FinishPayment", { sendData });
  };

  // FlatList에서 각각의 값에 들어갈 컴포넌트 선언
  const Things = ({ item }) => {
    // + 인지 아닌지 판별 맞다면 +만 출력
    if (item.name === "추가") {
      return (
        <View style={(style = ShoppingMallStyles.eachMenu)}>
          <TouchableOpacity
            onPress={() => {
              selectAdd(item);
            }}
          >
            <Image
              source={menuImage[item.name]}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
        </View>
      );
      // 아니라면, 이미지와 상품명, 가격 출력
    } else {
      // 숫자에 쉼표달기!
      const newNum = formattedNumber(item.price);
      return (
        <View style={ShoppingMallStyles.eachMenu}>
          <TouchableOpacity
            onPress={(event) => {
              choiceMenu(item);
              setModalVisiable(true);
            }}
          >
            <Image
              source={menuImage[item.name]}
              style={{ width: imgSize, height: imgSize }}
            />
            <Text
              style={{ ...ShoppingMallStyles.menuText, fontSize: 13 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.shop} {item.name}
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

  const sendData = {
    name: choiceName,
    price: choicePrice,
    shop: choiceShop,
    category: products,
  };

  useEffect(() => {
    if (isSelectAdd) {
      setIsSelectAdd(false);
      navigation.navigate("FinishPayment", { sendData });
    } else if (isSelectProduct && isPushBtn) {
      setIsSelectProduct(false);
      setIsPushBtn(false);
      navigation.navigate("FinishPayment", { sendData });
    }
  });
  // 코드 시작
  return (
    <View style={ShoppingMallStyles.container}>
      {/* {isLoading ? (<Loading/>) : ()} */}
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
          <Text style={{ ...ShoppingMallStyles.modalFont, fontSize: 25 }}>
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
                // navigation.navigate("FinishPayment", { sendData });
              }}
            >
              <Text style={ShoppingMallStyles.modalFont}>결제하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* 상단 부분 (뒤로가기, 카테고리 텍스트) */}
      <View style={ShoppingMallStyles.backBtn}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons name="arrow-back-ios-new" size={36} color="black" />
        </TouchableOpacity>
        <Text style={ShoppingMallStyles.pageTitle}>카테고리</Text>
      </View>

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
                  style={{ width: 50, height: 50 }}
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
          data={[...tmp_data[products], addPurchase]}
          // 다음 필수 prop인 renderItem이다.
          renderItem={Things}
          // 이것도 필수 prop인것 같다. key값을 주는 것인듯!(map을 생각해보자)
          keyExtractor={(item, index) => index}
          // 한개의 row에 몇개의 item(배열 안 요소)을 출력할지에 대해 정하는 prop
          numColumns={2}
          // numColumns가 있을 때만 사용가능한 props로 열간의 간격, 각 열의 스타일을 설정할 수 있다.
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 10,
            alignItems: "center",
          }}
        />
      </View>
    </View>
  );
};

export default ShoppingMall;
