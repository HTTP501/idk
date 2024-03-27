import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import DonPocket from "./DonPocketItem";

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
    const pocketType = data.pocketType
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("상세 페이지 이동");
          // 저금통은 저금통 페이지로 
          if (data.pocketType === "piggyBank") {
            navigation.navigate("DetailSavingBox", { pocketId, pocketType });
          } else {
            navigation.navigate("DetailPocket", { pocketId, pocketType });
          }
        }}
        activeOpacity={1}
        style={[styles.donpocketlist]}
      >
        <DonPocket item={data} isActive={null} isFiltered={true}/>
      </TouchableOpacity>
    );
  };
  // 반복해서 render 시켜주기
  const Pocket = () => {
    return (
      <View>
        {data.map((item) => (
          <RenderItem key={item.pocketId} data={item} keyExtractor={(item) => item.pocketId} />
        ))}
      </View>
    );
  };
  return <Pocket />;
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
