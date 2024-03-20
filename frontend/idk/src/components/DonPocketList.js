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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const formattedNumber = function (number) {
  return number.toLocaleString("ko-KR", { maximumFractionDigits: 0 });
};
import theme from "../style";

// 돈포켓 리스트
const DonPocketList = function ({ navigation, pocketData, changePocketOrder }) {
  const ref = useRef();
  const data = pocketData;
  const renderItem = ({ item, drag }) => {
    // 상세 페이지로 넘길때 id만 넘긴다
    const pocketId = item.pocketId;
    const { isActive } = useOnCellActiveAnimation();
    return (
      <ScaleDecorator>
        <OpacityDecorator activeOpacity={0.1}>
          <ShadowDecorator>
            <TouchableOpacity
              onLongPress={drag}
              onPress={() => {
                console.log("상세 페이지 이동");
                if(item.pocketType==="piggyBank"){
                  navigation.navigate("DetailSavingBox", { pocketId });
                }else{
                  navigation.navigate("DetailPocket", { pocketId });
                }
              }}
              activeOpacity={1}
              style={[styles.donpocketlist]}
            >
              <DonPocket item={item} isActive={isActive} />
            </TouchableOpacity>
          </ShadowDecorator>
        </OpacityDecorator>
      </ScaleDecorator>
    );
  };
  const Pocket = () => {
    return (
      <GestureHandlerRootView>
        <NestableDraggableFlatList
          ref={ref}
          data={data}
          keyExtractor={(item) => item.pocketId}
          onDragEnd={({ data }) => {
            // 부모에게 바뀐 데이터 올려주기
            changePocketOrder(data);
            console.log("드래그로 바꿈!");
          }}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </GestureHandlerRootView>
    );
  };
  return <Pocket />;
};

// 돈포켓
const DonPocket = ({ item, isActive }) => {
  let today = new Date();
  const donPocket = item;
  const menuIcon = require("../../assets/icons/menu.png");
  const checkIcon = require("../../assets/icons/check.png");
  const closeIcon = require("../../assets/icons/close.png");
  const openIcon = require("../../assets/icons/open.png");
  const pigIcon = require("../../assets/icons/pig.png");
  // 꾹 누르면 그림자 없에기
  const shadow = isActive ? null : styles.shadow;

  return (
    <View
      className="flex-row items-center p-5"
      style={[styles.donpocket, shadow]}
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
    // height: windowHeight * (1 / 8) * 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  donpocket: {
    height: 90,
    width: windowWidth * (6 / 7),
    backgroundColor: "white",
    borderRadius: 10,
  },
  activeItem: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default DonPocketList;
