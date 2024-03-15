import {
  GestureHandlerRootView,
  gestureHandlerRootHOC,
} from "react-native-gesture-handler";
import DraggableFlatList, {
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
  useOnCellActiveAnimation,
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
const DonPocketList = function () {
  const ref = useRef();

  let [data, setdata] = useState([
    {
      key: "1",
      donPocketTitle: "돈포켓이름1",
      donPocketAmount: 60200,
      payDay: "15",
      donPocketState: "open",
    },
    {
      key: "2",
      donPocketTitle: "돈포켓이름2",
      donPocketAmount: 12567000,
      payDay: "15",
      donPocketState: "check",
    },
    {
      key: "3",
      donPocketTitle: "돈포켓이름3",
      donPocketAmount: 12000,
      payDay: "23",
      donPocketState: "close",
    },
    {
      key: "4",
      donPocketTitle: "돈포켓이름4",
      donPocketAmount: 920200,
      payDay: "14",
      donPocketState: "open",
    },
    {
      key: "5",
      donPocketTitle: "돈포켓이름5",
      donPocketAmount: 28300,
      payDay: "3",
      donPocketState: "check",
    },
  ]);
  const renderItem = ({ item, drag }) => {
    const { isActive } = useOnCellActiveAnimation();
    return (
      <ScaleDecorator>
        <OpacityDecorator activeOpacity={0.5}>
          <ShadowDecorator>
            <TouchableOpacity
              onLongPress={drag}
              activeOpacity={1}
              style={styles.donpocketlist}
            >
              <DonPocket item={item} />
            </TouchableOpacity>
          </ShadowDecorator>
        </OpacityDecorator>
      </ScaleDecorator>
    );
  };
  const Pocket = gestureHandlerRootHOC(() => {
    return (
      <GestureHandlerRootView>
        <DraggableFlatList
          ref={ref}
          data={data}
          keyExtractor={(item) => item.key}
          onDragEnd={({ data }) => {
            setdata(data)
            console.log('드래그로 바꿈!')
          }}
          renderItem={renderItem}
        />
      </GestureHandlerRootView>
    );
  });
  return <Pocket />;
};

// 돈포켓
const DonPocket = (item) => {
  let today = new Date();
  const donPocket = item.item;
  const menuIcon = require("../../assets/icons/menu.png");
  const checkIcon = require("../../assets/icons/check.png");
  const closeIcon = require("../../assets/icons/close.png");
  const openIcon = require("../../assets/icons/open.png");
  return (
    <View
      className="flex-row items-center p-5"
      style={[styles.donpocket, styles.shadow]}
    >
      {/* 돈포켓 상태 */}
      {donPocket.donPocketState === "check" ? (
        <Image source={checkIcon} />
      ) : null}
      {donPocket.donPocketState === "close" ? (
        <Image source={closeIcon} />
      ) : null}
      {donPocket.donPocketState === "open" ? <Image source={openIcon} /> : null}

      {/* 돈포켓 내용 */}
      <View className="flex-grow items-start ml-3">
        <View className="flex-row items-center">
          <Text className="font-bold text-lg mr-3">
            {donPocket.donPocketTitle}
          </Text>
          <Text className="">
            {today.getMonth()}월 {donPocket.payDay}일
          </Text>
        </View>

        <Text className="">{formattedNumber(donPocket.donPocketAmount)}원</Text>
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
    // height: windowHeight * (1 / 8),
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
