import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import DonPocketDepositList from "../../../components/DonPocketDepositList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
// 컴포넌트들
import theme from "../../../style";
import DepositList from "../../../components/DepositList";
import formattedNumber from "../../../components/moneyFormatter";
// 화면 크기
import { Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
import { useIsFocused } from "@react-navigation/native";
import Loading from "../../../components/Loading";
import { getPocketAxios, depositDonPocketAxios, withdrawalDonPocketAxios } from '../../../API/DonPocket'


const DetailPocket = ({ navigation, route }) => {
  const pocketId = route.params.pocketData.pocketId
  const pocketType = route.params.pocketData.pocketType
  const pocketBalance = route.params.pocketData.balance
  const pocketTarget = route.params.pocketData.target
  const [donPocketId, setDonPocketId] = useState(null)
  const [name, setName] = useState(null)
  const [deposited, setDeposited] = useState(false)
  const [paid, setPaid] = useState(false)
  const [activated, setActivated] = useState(false)
  // 이체 데이터
  const [arrayTransaction, setArrayTransaction] = useState([
    {"amount": 1000, "balance": 2000, "content": "입금", "createdAt": "2024-03-28T10:29:11.773054", "piggyBankTransactionId": 18}, {"amount": 1000, "balance": 3000, "content": "입금", "createdAt": "2024-03-28T10:29:21.199936", "piggyBankTransactionId": 19},
  ]);
  const [date, setDate] = useState('')

  let [loading, setLoading] = useState(false);

  // 돈포켓 상세조회 Axios
  const getPocket = () => {
    getPocketAxios(
      pocketId,
      res => {
        setArrayTransaction(res.data.data.arrayPocketTransaction)
        setDate(res.data.data.expectedDate)
        setName(res.data.data.name)
        setPaid(res.data.data.paid)
        setDeposited(res.data.data.deposited)
        setActivated(res.data.data.activated)
      },
      err => {
        if (err.response.data.code === 'C401') {
          Alert.alert(err.response.data.message, '', [{text:'확인', onPress:() => navigation.navigate('Main')}])
        } else if (err.response.data.code === 'P404') {
          Alert.alert(err.response.data.message, '', [{text:'확인', onPress:() => navigation.navigate('Main')}])  
        } 
      }
    )
  }

  useEffect(() => {
    if (pocketType === '목표저축') {
      setDonPocketId(route.params.pocketData.targetSavingId)
    } else if (pocketType === '자동이체') {
      setDonPocketId(route.params.pocketData.autoTransferId)
    } else {
      setDonPocketId(route.params.pocketData.AutoDebitId)
    }
    getPocket()

    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, []);

  // 돈포켓 입금 Axios
  const handleDepositDonPocket = () => {
    Alert.alert('돈포켓에 입금하시겠습니까?', '소비 금액을 보관할 수 있어요!', [{text:'확인', 
      onPress:() => {
        depositDonPocketAxios(
          pocketId,
          res => {
            getPocket()
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
    }, {text: '취소'}])
  }

  // 돈포켓 출금 Axios
  const handleWithdrawalDonPocket = () => {
    Alert.alert('돈포켓에서 출금하시겠습니까?', '나중에 다시 입금해야해요!', [{text:'확인', 
      onPress:() => {
        withdrawalDonPocketAxios(
          pocketId,
          res => {
            getPocket()
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
    }, {text: '취소'}])
  }


  return (
    <View className="flex-1">
      {loading ? (
        <ScrollView className="bg-white" style={styles.scrollViewContent}>
          {/* 배경 */}
          <View style={styles.back}></View>
          {/* 로고 알람 */}
          <View className="px-10 mt-10 mb-2">
            <Header navigation={navigation} name={name}/>
          </View>

          {/* 정보 */}
          <View className="justify-center items-center mb-5">
            <View style={[styles.info, styles.shadow]}>
              <Text className='mt-2 ml-2'>{date.substring(8, 10)}일에</Text>
              {paid ? 
                <Image style={styles.lock} source={require('../../../../assets/icons/check.png')}/>
                : deposited ?
                <TouchableOpacity
                onPress={handleWithdrawalDonPocket}
                style={styles.lock}>
                  <Image 
                  style={{
                    height:50,
                    width:40,}} 
                  source={require('../../../../assets/icons/close.png')}/>
                </TouchableOpacity>
                : 
                <TouchableOpacity
                onPress={handleDepositDonPocket}
                style={styles.lock}>
                  <Image 
                  style={{
                    height:50,
                    width:40,}} 
                  source={require('../../../../assets/icons/open.png')}/>
                </TouchableOpacity>
              }
              <View className='flex-row mt-5 items-end'>
                <Text className='text-2xl font-bold'>{formattedNumber(pocketTarget)}원</Text>
                {paid ? 
                  <Text>{pocketType === '목표저축' ? '이 저축완료 됐어요!' : '이 이체완료 됐어요!'}</Text>
                  :
                  <Text>{pocketType === '목표저축' ? '이 저축될 예정이에요.' : '이 이체될 예정이에요.'}</Text>
                }
              </View>
              {paid ? 
                null
                : deposited ?<Text style={{color: theme["sky-basic"], marginTop: 20,}}>잘 보관 중이에요.</Text>
                : <Text style={{color: theme.red, marginTop: 20,}}>보관이 필요해요.</Text>
              }
              
              <TouchableOpacity
                style={styles.setting}
                onPress={() => {
                  if (pocketType === '목표저축') {
                    navigation.navigate('SettingTargetSaving', { pocketId, donPocketId, name, activated })
                  } else if (pocketType === '자동결제') {
                    navigation.navigate("SettingAutoDebit", { pocketId, donPocketId, name, activated });
                  } else if (pocketType === '자동이체') {
                    navigation.navigate('SettingAutoTransfer', { pocketId, donPocketId, name, activated })
                  }
                }}
              >
                <AntDesign name="setting" size={36} color={theme["sky-basic"]} />
              </TouchableOpacity>
            </View>
          </View>


          {/* 이체내역 */}
          <DonPocketDepositList arrayTransaction={arrayTransaction} />
          <StatusBar style="auto" />
        </ScrollView>
      ) : <Loading/>}
    </View>
  );
};
// 헤더
const Header = ({navigation, name}) => {
  const logo = require("../../../../assets/logo/white_idk_bank_logo.png");
  return (
    <View className="flex-row justify-between items-center">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Main");
        }}
      >
        <Image source={logo} style={{ width: 90, resizeMode: "contain" }} />
      </TouchableOpacity>
      <Text className='text-white text-lg font-bold'>{name}</Text>
    </View>
  );
};


// 스타일
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  back: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * (1 / 4), // 화면 높이의 1/3
    backgroundColor: theme["sky-basic"],
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  info: {
    height: 160,
    width: SCREEN_WIDTH * (9 / 10),
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
  },
  text: {
    fontSize: 28,
    color: "red",
  },
  lock: {
    position: 'absolute',
    end: 20,
    top: 20,
    height:50,
    width:40,
  },
  setting: {
    position: 'absolute',
    end: 20,
    bottom: 10
  }
});
export default DetailPocket;