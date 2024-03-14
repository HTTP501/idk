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

const ShoppingMall = ({ navigation }) => {
  // 기믹에 이용될 상태들 선언
  const [products, setProducts] = useState("식품");
  const [ModalVisiable, setModalVisiable] = useState(false);
  const [choiceName, setChoiceName] = useState(null);
  const [choicePrice, setChoicePrice] = useState(null);
  const [choiceCommaPrice, setChoiceCommaPrice] = useState(null);
  const [choiceShop, setChoiceShop] = useState(null);

  // 화면 사이즈 찾기
  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
  const menuWidth = windowWidth * 0.4;
  const menuHeight = windowHeight * 0.3;
  const imgSize = menuWidth * 0.8;
  const modalHeight = windowHeight * 0.35;

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
      // backgroundColor: "white",
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
      fontFamily: "PretendardVariable",
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

  const tmp_data = {
    식품: [
      { name: "음식1", price: 10000, shop: "슈퍼", category: "음식" },
      { name: "음식2", price: 10000, shop: "슈퍼", category: "음식" },
      { name: "음식3", price: 10000, shop: "슈퍼", category: "음식" },
      { name: "음식4", price: 10000, shop: "슈퍼", category: "음식" },
    ],
    전자제품: [
      {
        name: "전자제품1",
        price: 10000,
        shop: "삼성전자",
        category: "전자제품",
      },
      {
        name: "전자제품2",
        price: 10000,
        shop: "삼성전자",
        category: "전자제품",
      },
      {
        name: "전자제품3",
        price: 10000,
        shop: "삼성전자",
        category: "전자제품",
      },
      {
        name: "전자제품4",
        price: 10000,
        shop: "삼성전자",
        category: "전자제품",
      },
    ],
    뷰티: [
      { name: "뷰티1", price: 10000, shop: "올리브영", category: "뷰티" },
      { name: "뷰티2", price: 10000, shop: "올리브영", category: "뷰티" },
      { name: "뷰티3", price: 10000, shop: "올리브영", category: "뷰티" },
      { name: "뷰티4", price: 10000, shop: "올리브영", category: "뷰티" },
    ],
    의류: [
      { name: "의류1", price: 10000, shop: "무신사", category: "의류" },
      { name: "의류2", price: 10000, shop: "무신사", category: "의류" },
      { name: "의류3", price: 10000, shop: "무신사", category: "의류" },
      { name: "의류4", price: 10000, shop: "무신사", category: "의류" },
    ],
    기타: [
      { name: "기타1", price: 10000, shop: "쿠팡", category: "기타" },
      { name: "기타2", price: 10000, shop: "쿠팡", category: "기타" },
      { name: "기타3", price: 10000, shop: "쿠팡", category: "기타" },
      { name: "기타4", price: 10000, shop: "쿠팡", category: "기타" },
    ],
  };
  const menuImage = {
    음식1: require("../../../assets/categoryItems/food1.jpg"),
    음식2: require("../../../assets/categoryItems/food2.jpg"),
    음식3: require("../../../assets/categoryItems/food3.jpg"),
    음식4: require("../../../assets/categoryItems/food4.jpg"),
    추가: require("../../../assets/categoryItems/add.png"),
  };
  // 액수에 쉼표 찍는 함수
  const formattedNumber = function (number) {
    return number.toLocaleString("ko-KR", { maximumFractionDigits: 0 });
  };

  // 메뉴 선택 시, 해당 메뉴의 정보를 상태로 가져줄 함수
  const choiceMenu = (item) => {
    const newNum = formattedNumber(item.price);
    setChoiceName(item.name);
    setChoicePrice(item.price);
    setChoiceShop(item.shop);
    setChoiceCommaPrice(newNum);
  };

  // FlatList에서 각각의 값에 들어갈 컴포넌트 선언
  const Things = ({ item }) => {
    // + 인지 아닌지 판별 맞다면 +만 출력
    if (item.name === "추가") {
      return (
        <View style={(style = ShoppingMallStyles.eachMenu)}>
          <TouchableOpacity>
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

  const Stack = createNativeStackNavigator;

  const sendData = {
    name: choiceName,
    price: choicePrice,
    shop: choiceShop,
  };

  // 코드 시작
  return (
    <View style={ShoppingMallStyles.container}>
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
                backgroundColor: theme["sky-bright-5"],
                borderColor: theme["sky-bright-5"],
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
                backgroundColor: theme["sky-bright-1"],
                borderColor: theme["sky-bright-1"],
              }}
              onPress={() => {
                navigation.navigate("FinishPayment", { sendData });
              }}
            >
              <Text style={ShoppingMallStyles.modalFont}>결제하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* 상단 부분 (뒤로가기, 카테고리 텍스트) */}
      <View style={ShoppingMallStyles.backBtn}>
        <TouchableOpacity>
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
