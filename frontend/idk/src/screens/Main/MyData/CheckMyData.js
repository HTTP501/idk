import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions, Modal, Alert } from 'react-native';
import Checkbox from 'expo-checkbox'; // Importing Checkbox from Expo
import { AntDesign } from '@expo/vector-icons';
import theme from '../../../style'
import RoundCheckbox from 'rn-round-checkbox';
import { getMyDataAxios } from '../../../API/MyData'
import { useFocusEffect } from '@react-navigation/native';
import Loading from '../../../components/Loading';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

const imgMatch = {
  'IDK은행': require("../../../../assets/logo/app_icon.png"),
  'KB국민은행': require("../../../../assets/banks/KBBank.png"),
  '카카오뱅크': require("../../../../assets/banks/KakaoBank.png"),
  '신한은행': require("../../../../assets/banks/ShinhanBank.png"),
  'NH농협은행': require("../../../../assets/banks/NHBank.png"),
  '하나은행': require("../../../../assets/banks/HanaBank.png"),
  '우리은행': require("../../../../assets/banks/WooriBank.png"),
  'IBK기업은행': require("../../../../assets/banks/IBKBank.png"),
  '케이뱅크': require("../../../../assets/banks/KBank.png"),
  'KB국민카드': require("../../../../assets/banks/KBCard.png"),
  '신한카드': require("../../../../assets/banks/ShinhanCard.png"),
  '현대카드': require("../../../../assets/banks/HyundaiCard.png"),
  '카카오뱅크카드': require("../../../../assets/banks/KakaoCard.png"),
  'NH농협카드': require("../../../../assets/banks/NHCard.png"),
  '삼성카드': require("../../../../assets/banks/SamsungCard.png"),
  '하나카드': require("../../../../assets/banks/HanaCard.png"),
  '우리카드': require("../../../../assets/banks/WooriCard.png"),
  'KB국민 Easy all카드': require("../../../../assets/banks/KB국민 Easy all카드.png"),
  'the Green Edition2': require("../../../../assets/banks/the Green Edition2.png"),
  '신한카드 Deep Dream': require("../../../../assets/banks/신한카드 Deep Dream.png"),
  '카드의정석 EVERY 1': require("../../../../assets/banks/카드의정석 EVERY 1.png"),
  '내맘대로 쁨 카드_그림비 한정판(Yellow)': require("../../../../assets/banks/내맘대로 쁨 카드_그림비 한정판(Yellow).png"),
  '삼성카드 & MILEAGE PLATINUM (스카이패스)': require("../../../../assets/banks/삼성카드 & MILEAGE PLATINUM (스카이패스).png"),
  '올바른 FLEX 카드': require("../../../../assets/banks/올바른 FLEX 카드.png"),
}


// 마이데이터 리스트
const FinancialCompany = ({ item, index, checkItem, changeCheckItem }) => {
  const [showData, setShowData] = useState(false);

  return (
    <View>
      <TouchableOpacity 
        onPress={() => setShowData(!showData)}
        style={styles.financialCompany}
      >
        <View className='flex-row items-center'>
          <Image source={imgMatch[item.orgName]} style={{ width: 45, height: 45}}/>
          <Text className='text-2xl font-bold ml-3'>{item.orgName}</Text>
        </View>
        <View className='flex-row items-center'>
          <Text className='text-lg mr-1'>{item?.assetInfo?.length}</Text>
          <Text className='text-lg font-bold mr-2'>건</Text>
          {!showData && (<AntDesign name="right" size={24} color="black" />)}
          {showData && (<AntDesign name="down" size={24} color="black" />)}
        </View>
      </TouchableOpacity>
        {showData &&  item.orgName.includes('카드') ?
        <View>
          {item.assetInfo.map((dataItem, dataIndex) => (
            <View key={dataIndex} style={styles.dataItem}>
              <View className='flex-row items-center'>
                <Image source={imgMatch[dataItem.asset]} style={{ width: 35, height: 35}}/>
                <View className='ml-3'>
                  <Text className='font-bold'>{dataItem.asset}</Text>
                  {!dataItem.isLinked && (<Text className=''>{dataItem.designatedOrgName} {dataItem.designatedAssetNumber}</Text>)}
                  {dataItem.isLinked && (<Text className='text-green-500 font-bold'>{dataItem.designatedOrgName} {dataItem.designatedAssetNumber}</Text>)}
                </View>
              </View>
              <RoundCheckbox
                icon=''
                size={30}
                backgroundColor={theme['sky-basic']}
                checked={checkItem.index===index && checkItem.dataIndex===dataIndex}
                onValueChange={() => {changeCheckItem({...dataItem, index, dataIndex, orgName:item.orgName})}}
              />
            </View>
          ))}
        </View>
        : showData ?
        <View>
          {item.assetInfo.map((dataItem, dataIndex) => (
            <View key={dataIndex} style={styles.dataItem}>
              <View className='flex-row items-center'>
                <Image source={imgMatch[dataItem.designatedOrgName]} style={{ width: 35, height: 35}}/>
                <View className='ml-3'>
                  <Text className='font-bold'>{dataItem.designatedOrgName} {dataItem.designatedAssetNumber}</Text>
                  {!dataItem.isLinked && (<Text className=''>{item.orgName} {dataItem.asset}</Text>)}
                  {dataItem.isLinked && (<Text className='text-green-500 font-bold'>{item.orgName} {dataItem.asset}</Text>)}
                </View>
              </View>
              <RoundCheckbox
                icon=''
                size={30}
                backgroundColor={theme['sky-basic']}
                checked={checkItem.index===index && checkItem.dataIndex===dataIndex}
                onValueChange={() => {changeCheckItem({...dataItem, index, dataIndex, orgName:item.orgName})}}
              />
            </View>
          ))}
        </View>
        : null
      }
    </View>
  );
};

const CheckMyData = ({ navigation }) => {
  const [checkItem, setCheckItem] = useState({})
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [myData, setMyData] = useState([
  //   {
  //     "orgName": "KB국민카드",
  //     "assetInfo": [
  //       {"asset": "KB국민 Easy all카드", 
  //       "claimAmount": 50000,
  //       "claimDate": 15,
  //       "designatedOrgName": 'KB국민은행',
  //       "designatedAssetNumber": "123-123123-123", 
  //       "isLinked": false},
  //     ]
  //   },
  //   {
  //     "orgName": "NH농협은행",
  //     "assetInfo": [
  //       {"asset": "123-123-132", 
  //       "claimAmount": 50000,
  //       "claimDate": 15,
  //       "designatedOrgName": 'IDK은행',
  //       "designatedAssetNumber": "123-123123-123", 
  //       "isLinked": false},
  //       {"asset": "123-123-132", 
  //       "claimAmount": 40000,
  //       "claimDate": 12,
  //       "designatedOrgName": '우리은행',
  //       "designatedAssetNumber": "123-123123-123", 
  //       "isLinked": true},
  //     ],
  //   },
  // ])
  const [myData, setMyData] = useState([])

  // 마이데이터 조회 Axios
  const getMyData = () => {
    getMyDataAxios(
      res => {
        console.log(res);
        setMyData(res.data.data.assetInfoList)
      },
      err => {
        console.log(err);
        console.log(err.response);
      }
    )
  }

  useFocusEffect(
    React.useCallback(() => {
      getMyData();
      setTimeout(() => {
        setLoading(true);
      }, 700);
    }, [])
  );
  

  const changeCheckItem = (payload) => {
    // 똑같은거 누르면 꺼라
    if (checkItem.index===payload.index && checkItem.dataIndex===payload.dataIndex) {
      setCheckItem({})
    } else {
      setCheckItem(payload)
    }
  }

  const handleConnectAutomaticTransfer = () => {
    if (Object.keys(checkItem)?.length!==0) {
      // 이미 연결된거면 안해도 되므로
      if (checkItem.isLinked) {
        Alert.alert('이미 연결된 자산입니다.', '', [{text:'확인'}])
      } else {
        setShowModal(true);
      }
    }
  };
  
  return (
    <>
      {loading ? 
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 50, flexGrow:1, alignItems:'center',}}
        showsVerticalScrollIndicator={false}  
      >
        {myData.map((item, index) => (
          <FinancialCompany 
            key={index}
            index={index}
            item={item} 
            changeCheckItem={changeCheckItem}
            checkItem={checkItem}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, {opacity: Object.keys(checkItem)?.length===0 ? 0.5 : 1}]}
        onPress={handleConnectAutomaticTransfer}
        disabled={Object.keys(checkItem)?.length===0}
      >
        <Text className="text-white text-lg">자동 이체 연결</Text>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              className='self-end'
              onPress={() => setShowModal(false)}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            {checkItem?.orgName?.includes('카드') ?
            <View className='items-center'>
              <Text className='text-2xl font-bold mb-3'>{checkItem.asset}</Text>
              <Text className='text-zinc-500 mb-8 font-bold'>{checkItem.designatedOrgName} {checkItem.designatedAssetNumber}</Text>
              <TouchableOpacity
                style={styles.modalButton2}
                onPress={() => {setShowModal(false)
                                navigation.navigate({name: 'OutSidePage', params: checkItem})}}
              >
                <Text className='text-lg font-bold'>자동이체 내 계좌로 변경하기</Text>
              </TouchableOpacity>
            </View>
            :
            <View className='items-center'>
              <Text className='text-2xl font-bold mb-3'>{checkItem.orgName}</Text>
              <Text className='text-2xl font-bold mb-3'>{checkItem.asset}</Text>
              <Text className='text-zinc-500 mb-8 font-bold'>{checkItem.designatedOrgName} {checkItem.designatedAssetNumber}</Text>
              <TouchableOpacity
                style={styles.modalButton2}
                onPress={() => {setShowModal(false)
                                navigation.navigate({name: 'RegistAutoSendAgree', params: checkItem})
                                }}
              >
                <Text className='text-lg font-bold'>이 계좌로 자동이체 하기</Text>
              </TouchableOpacity>
            </View>
            }
          </View>
        </View>
      </Modal>
    </View>
    : <Loading/>}
    </>
  );
};



const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 100
  },
  financialCompany: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 350,
    alignItems: 'center',
    marginTop: 30,
  },
  dataItem: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  button: {
    width: SCREEN_WIDTH*(9/10),
    height:50,
    backgroundColor: theme['sky-basic'],
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // 위치를 절대로 설정
    bottom: 20, // 화면 하단과의 간격
    borderRadius: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: theme['sky-basic'],
    width: 350,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 350,
    marginTop: 20,
  },
  modalButton1: {
    width: 290,
    height: 60,
    backgroundColor: theme['sky-bright-6'],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10
  },
  modalButton2: {
    width: 290,
    height: 60,
    backgroundColor: theme['sky-bright-2'],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },

});

export default CheckMyData;
