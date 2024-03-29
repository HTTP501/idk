import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions, Modal } from 'react-native';
import Checkbox from 'expo-checkbox'; // Importing Checkbox from Expo
import { AntDesign } from '@expo/vector-icons';
import theme from '../../../style'
import RoundCheckbox from 'rn-round-checkbox';
import { getMyDataAxios } from '../../../API/MyData'
import { useFocusEffect } from '@react-navigation/native';
import Loading from '../../../components/Loading';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

const imgMatch = {
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
}


// 마이데이터 리스트
const FinancialCompany = ({ item, checkItem, changeCheckItem }) => {
  const [showData, setShowData] = useState(false);

  return (
    <View>
      <TouchableOpacity 
        onPress={() => setShowData(!showData)}
        style={styles.financialCompany}
      >
        <View className='flex-row items-center'>
          <Image source={imgMatch[item.financialCompany]} style={{ width: 50, height: 50}}/>
          <Text className='text-2xl font-bold ml-3'>{item.financialCompany}</Text>
        </View>
        <View className='flex-row items-center'>
          <Text className='text-lg mr-1'>{item.data.length}</Text>
          <Text className='text-lg font-bold mr-2'>건</Text>
          {!showData && (<AntDesign name="right" size={24} color="black" />)}
          {showData && (<AntDesign name="down" size={24} color="black" />)}
        </View>
      </TouchableOpacity>
      {showData && (
        <View>
          {item.data.map((dataItem, dataIndex) => (
            <View key={dataIndex} style={styles.dataItem}>
              <View className='flex-row'>
                <Image source={require('../../../../assets/icons/money.png')} style={{ width: 50, height: 50}}/>
                <View className='ml-3'>
                  <Text className='font-bold'>{dataItem.name}</Text>
                  {!dataItem.isLink && (<Text className=''>{dataItem.account}</Text>)}
                  {dataItem.isLink && (<Text className='text-green-500 font-bold'>{dataItem.account}</Text>)}
                </View>
              </View>
              <RoundCheckbox
                icon=''
                size={30}
                backgroundColor={theme['sky-basic']}
                checked={checkItem.name===dataItem.name && checkItem.account===dataItem.account}
                onValueChange={() => {changeCheckItem(dataItem)}}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const CheckMyData = ({ navigation }) => {
  const [checkItem, setCheckItem] = useState({})
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [MyData, setMyData] = useState([
    {
      "financialCompany": "KB국민은행",
      "data": [
        {"name": "하나카드 트래블로그 신용카드", "account": "IDK은행 123-123123-123", "isLink": true},
      ]
    },
    {
      "financialCompany": "NH농협은행",
      "data": [
        {"name": "휴대폰비", "account": "농협은행 123-11123-123", "isLink": false},
        {"name": "수도세", "account": "농협은행 123-11123-123", "isLink": true},
      ]
    }
  ])

  const getMyData = () => {
    // getMyDataAxios(
    //   res => {
    //     console.log(res);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // )
  }

  useEffect(() => {
    getMyData()
    setTimeout(() => {
      setLoading(true);
    }, 700);
  }, [])

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
    if (checkItem.name===payload.name && checkItem.account===payload.account) {
      setCheckItem({})
    } else {
      setCheckItem(payload)
    }
  }

  const handleConnectAutomaticTransfer = () => {
    if (Object.keys(checkItem).length!==0) {
      setShowModal(true);
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
        {MyData.map((item, index) => (
          <FinancialCompany 
            key={index} 
            item={item} 
            changeCheckItem={changeCheckItem}
            checkItem={checkItem}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, {opacity: Object.keys(checkItem).length===0 ? 0.5 : 1}]}
        onPress={handleConnectAutomaticTransfer}
        disabled={Object.keys(checkItem).length===0}
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
            <Text className='text-2xl font-bold mb-3'>{checkItem.name}</Text>
            <Text className='text-zinc-500 mb-8 font-bold'>{checkItem.account}</Text>
            <TouchableOpacity
              style={styles.modalButton1}
              onPress={() => {setShowModal(false)
                              navigation.navigate({name: 'RegistAutoSendAgree', params: checkItem})
                              }}
            >
              <Text className='text-lg font-bold'>이 계좌로 자동이체 하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton2}
              onPress={() => {setShowModal(false)
                              navigation.navigate({name: 'OutSidePage', params: checkItem})}}
            >
              <Text className='text-lg font-bold'>자동이체 내 계좌로 변경하기</Text>
            </TouchableOpacity>
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
