import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import formattedNumber from "./moneyFormatter";
const SCREEN_WIDTH = Dimensions.get("window").width;

// 돈포켓
const PiggyBank = ({ piggyBankData,navigation }) => {
  const donPocket = piggyBankData;
  const pigIcon = require("../../assets/icons/pig.png");

  return (

    <View style={styles.donpocketlist}>
    <TouchableOpacity
      className="flex-row items-center p-5"
      style={[styles.donpocket, styles.shadow]}
      onPress={()=>{
        navigation.navigate("DetailSavingBox", { pocketId:donPocket?.piggyBankId });
      }}
    >
      {/* 돈포켓 상태 */}
      <Image
        source={pigIcon}
        style={{ width: 30, height: 50, resizeMode: "contain" }}
      />

      {/* 돈포켓 내용 */}
      <View className="flex-grow items-start ml-3">
        <View className="flex-row items-center">
          <Text className="font-bold text-lg mr-3">저금통</Text>
     
        </View>
        <Text className="text-base">{formattedNumber(donPocket.balance)}원</Text>

      </View>
      
    </TouchableOpacity>
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
  donpocketlist: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
});
export default PiggyBank;
