import {
  GestureHandlerRootView,
  gestureHandlerRootHOC,
} from "react-native-gesture-handler";
import DraggableFlatList, {
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
  useOnCellActiveAnimation,
  NestableDraggableFlatList,
} from "react-native-draggable-flatlist";

import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { useRef, useState } from "react";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
import formattedNumber from "./moneyFormatter";
import theme from "../style";

// 돈포켓 리스트
const FilteredDonPocketList = function ({ navigation, filteredPocketData }) {
  // 필터된 돈포켓 데이터
  const data = filteredPocketData;
  const RenderItem = ({ data }) => {
    // 상세 페이지로 넘길때 id만 넘긴다
    const pocketId = data.pocketId;
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("상세 페이지 이동");
          // 저금통은 저금통 페이지로 ㄱㄱ
          if (data.pocketType === "piggyBank") {
            navigation.navigate("DetailSavingBox", { pocketId });
          } else {
            navigation.navigate("DetailPocket", { pocketId });
          }
        }}
        activeOpacity={1}
        style={[styles.donpocketlist]}
      >
        <DonPocket data={data} />
      </TouchableOpacity>
    );
  };
  // 반복해서 render 시켜주기
  const Pocket = () => {
    return (
      <View>
      {data.map((item =>  <RenderItem data={item} keyExtractor={(item) => item.pocketId} />)
      )}
      </View>
    );
  };
  return <Pocket />;
};

// 돈포켓
const DonPocket = ({ data }) => {
  let today = new Date();
  
  const donPocket = data;
  const menuIcon = require("../../assets/icons/menu.png");
  const checkIcon = require("../../assets/icons/check.png");
  const closeIcon = require("../../assets/icons/close.png");
  const openIcon = require("../../assets/icons/open.png");
  const pigIcon = require("../../assets/icons/pig.png");

  return (
    <View
      className="flex-row items-center p-5"
      style={[styles.donpocket, styles.shadow]}
    >
      {/* 돈포켓 상태 */}
      {donPocket.pocketType === "piggyBank" ? (
        <Image source={pigIcon} />
      ) : donPocket.isPaid === true ? (
        <Image source={checkIcon} />
      ) : donPocket.isDeposited === true ? (
        <Image source={closeIcon} />
      ) : (
        <Image source={openIcon} />
      )}

      {/* 돈포켓 내용 */}
      <View className="flex-grow items-start ml-3">
        <View className="flex-row items-center">
          <Text className="font-bold text-lg mr-3">{donPocket.pocketName}</Text>
          <Text className="">
            {today.getMonth()}월 {donPocket.paymentDate}일
          </Text>
        </View>

        <Text className="">{formattedNumber(donPocket.balance)}원</Text>
      </View>
      {/* 돈포켓 순서 정렬 */}
      <Image source={menuIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  donpocketlist: {
    // height: SCREEN_HEIGHT * (1 / 8) * 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  donpocket: {
    height: 90,
    width: SCREEN_WIDTH * (6 / 7),
    backgroundColor: "white",
    borderRadius: 10,
  },
  activeItem: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default FilteredDonPocketList;
