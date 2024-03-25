import React, { useRef, useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, TextInput, ScrollView, Modal, Switch, Alert } from 'react-native';
import theme from '../../../style';
import { AntDesign } from '@expo/vector-icons'; // Import Ionicons from Expo
import { autoTransferAxios, transactionAxios } from '../../../API/Member'
import { ChangeAccountNameAxios } from '../../../API/Account'

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const DetailPocketSetting = ({ navigation, route }) => {
  const pocketId = route.params.pocketId
  const [showModal, setShowModal] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  // 돈 포켓 자동 넣기 Axios
  const HandleIsActivated = () => {
    setIsActivated(previousState => !previousState)
  }

  // 수정 Axios
  const handleSetting = () => {
    Alert.alert('수정이 완료되었습니다.', '', [{text:'확인', onPress: () => navigation.navigate('DetailPocket', { pocketId})}])
  }

  // 돈포켓 해지 Axios
  const deleteDonPocket = () => {
    setShowModal(false)
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 50, flexGrow:1, alignItems:'center'}}
        showsVerticalScrollIndicator={false}  
      >
        <View style={styles.upbox}>
          <Text className='text-base font-bold'>돈 포켓 자동 넣기</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isActivated ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={HandleIsActivated}
            value={isActivated}
          />
        </View>
        <View style={styles.box}>
          <Text className='text-base font-bold mb-3'>이름</Text>
          <TextInput
            placeholder='돈포켓 이름'
            className='text-base'
          >
          </TextInput>
        </View>
        <View style={styles.box}>
          <Text className='text-base font-bold mb-3'>이체 주기</Text>
          <Text className='text-base text-zinc-500'>매월 15일</Text>
        </View>
        <View style={{...styles.box, marginBottom:50}}>
          <Text className='text-base font-bold mb-3'>시작일</Text>
          <Text className='text-base text-zinc-500'>2023년 12월 12일</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setShowModal(true)}
        >
          <Text className="text-zinc-500 text-lg">돈포켓 해지하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSetting}
        >
          <Text className="text-white text-lg">수정</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text className='text-2xl font-bold mb-3'>돈포켓 이름을</Text>
            <Text className='text-2xl font-bold mb-3'>해지하시겠습니까?</Text>
            <TouchableOpacity
              style={styles.modalButton1}
              onPress={deleteDonPocket}
            >
              <Text className='text-lg font-bold'>해지하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton2}
              onPress={() => {setShowModal(false)}}
            >
              <Text className='text-lg font-bold'>유지하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DetailPocketSetting;

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 100
  },
  box : {
    width: SCREEN_WIDTH * (8/10),
    marginBottom: 30,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    alignItems: 'start',
  },
  upbox : {
    width: SCREEN_WIDTH * (8/10),
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 30,
    paddingBottom: 10,
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    width: 320,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 30,
    textAlign: 'center',
  },
  deleteButton: {
    width: SCREEN_WIDTH*(9/10),
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginVertical: 20,
  },
  button: {
    width: SCREEN_WIDTH*(9/10),
    height:50,
    backgroundColor: theme['sky-basic'],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
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
