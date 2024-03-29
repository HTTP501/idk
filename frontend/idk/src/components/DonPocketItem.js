import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import formattedNumber from "./moneyFormatter";
import theme from "../style";
import { depositDonPocketAxios, withdrawalDonPocketAxios} from '../API/DonPocket'
const SCREEN_WIDTH = Dimensions.get("window").width;

// 돈포켓
const DonPocket = ({ item, isActive, isFiltered, fetchData }) => {
  let today = new Date();
  const donPocket = item;
  const menuIcon = require("../../assets/icons/menu.png");
  const checkIcon = require("../../assets/icons/check.png");
  const closeIcon = require("../../assets/icons/close.png");
  const openIcon = require("../../assets/icons/open.png");
  const pigIcon = require("../../assets/icons/pig.png");
  // 꾹 누르면 그림자 없에기
  const shadow = isActive ? null : styles.shadow;

  const stringDate = new Date(donPocket.expectedDate)

  // 돈포켓 입금 Axios
  const handleDepositDonPocket = () => {
    depositDonPocketAxios(
      donPocket.pocketId,
      res => {
        fetchData()
      },
      err => {
        if (err.response.data.code === 'C401') {
          Alert.alert(err.response.data.message, '', [{text:'확인'}])
        } else if (err.response.data.code === 'P404') {
          Alert.alert(err.response.data.message, '', [{text:'확인'}])  
        } else if (err.response.data.code === 'P405') {
          Alert.alert(err.response.data.message, '', [{text:'확인'}])  
        }
      }
    )
  }

  // 돈포켓 출금 Axios
  const handleWithdrawalDonPocket = () => {
    withdrawalDonPocketAxios(
      donPocket.pocketId,
      res => {
        fetchData()
      },
      err => {
        if (err.response.data.code === 'C401') {
          Alert.alert(err.response.data.message, '', [{text:'확인'}])
        } else if (err.response.data.code === 'P404') {
          Alert.alert(err.response.data.message, '', [{text:'확인'}])  
        } else if (err.response.data.code === 'P405') {
          Alert.alert(err.response.data.message, '', [{text:'확인'}])  
        }
      }
    )
  }

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
      ) : donPocket.paid === true ? (
        <Image
          source={checkIcon}
          style={{ width: 30, height: 50, resizeMode: "contain" }}
        />
      ) : donPocket.deposited === true ? (
        <TouchableOpacity
        onPress={handleWithdrawalDonPocket}>
          <Image
            source={closeIcon}
            style={{ width: 30, height: 50, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
        onPress={handleDepositDonPocket}>
          <Image
            source={openIcon}
            style={{ width: 30, height: 50, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      )}

      {/* 돈포켓 내용 */}
      <View className="flex-grow items-start ml-3" >
        <View className="flex-row items-center">
          <Text className="font-bold text-lg mr-3" style={donPocket.paid ? styles.notPaidColor : null}>{donPocket.name}</Text>
          <Text className="" style={[donPocket.paid ? styles.notPaidColor : null, donPocket.deposited ? {color:theme["sky-basic"]} : {color:theme.red}]}>
            {donPocket.expectedDate.substring(5, 7)}월 {donPocket.expectedDate.substring(8, 10)}일
          </Text>
        </View>

        <Text className="text-lg" style={donPocket.paid ? styles.notPaidColor : null}>{formattedNumber(donPocket.balance)}원</Text>
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
  notPaidColor: {
    color: theme["grey"]
  }
});
export default DonPocket;
