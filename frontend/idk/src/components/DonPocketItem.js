import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import formattedNumber from "./moneyFormatter";
const SCREEN_WIDTH = Dimensions.get("window").width;

// 돈포켓
const DonPocket = ({ item, isActive, isFiltered }) => {
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
        <Image
          source={pigIcon}
          style={{ width: 30, height: 50, resizeMode: "contain" }}
        />
      ) : donPocket.isPaid === true ? (
        <Image
          source={checkIcon}
          style={{ width: 30, height: 50, resizeMode: "contain" }}
        />
      ) : donPocket.isDeposited === true ? (
        <TouchableOpacity
        onPress={()=>{console.log('돈포켓해제')}}>
          <Image
            source={closeIcon}
            style={{ width: 30, height: 50, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
        onPress={()=>{console.log('돈포켓잠금')}}>
          <Image
            source={openIcon}
            style={{ width: 30, height: 50, resizeMode: "contain" }}
          />
        </TouchableOpacity>
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
      {isFiltered ? null : <Image source={menuIcon} />}
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
export default DonPocket;
