import React, { useRef, useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, TextInput, ScrollView, Modal, Switch } from 'react-native';
import theme from '../../style';
import { AntDesign } from '@expo/vector-icons'; // Import Ionicons from Expo

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const Settings = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [isDepositNotificationEnabled, setIsDepositNotificationEnabled] = useState(false);
  const [isAutoTransferNotificationEnabled, setIsAutoTransferNotificationEnabled] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  
  const handleNicknameChange = () => {
    setIsModalVisible(false);
    // Perform logic to change nickname
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 50, flexGrow:1, alignItems:'center', justifyContent:'center'}}
        showsVerticalScrollIndicator={false}  
      >
        <View className='mb-10 self-start'>
          <Text className='text-3xl font-bold'>계좌 관리</Text>
        </View>
        <TouchableOpacity 
          style={styles.box}
          onPress={toggleModal} // Open modal when the button is pressed
        >
          <Text className='text-base text-zinc-500'>계좌 별명 변경</Text>
          <AntDesign name="right" size={20} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.box}
          onPress={() => navigation.navigate('ChangeAccountPW')}
        >
          <Text className='text-base text-zinc-500'>계좌 비밀번호 변경</Text>
          <AntDesign name="right" size={20} color="grey" />
        </TouchableOpacity>
        <View className='my-10 self-start'>
          <Text className='text-3xl font-bold'>알림 관리</Text>
        </View>
        <View style={styles.box}>
          <Text className='text-base text-zinc-500'>입출금 알림(Push)</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDepositNotificationEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsDepositNotificationEnabled(previousState => !previousState)}
            value={isDepositNotificationEnabled}
          />
        </View>
        <View style={styles.box}>
          <Text className='text-base text-zinc-500'>자동이체 알림</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isAutoTransferNotificationEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsAutoTransferNotificationEnabled(previousState => !previousState)}
            value={isAutoTransferNotificationEnabled}
          />
        </View>
        <View className='my-10 self-start'>
          <Text className='text-3xl font-bold'>돈포켓 관리</Text>
        </View>
        <TouchableOpacity 
          style={styles.box}
          onPress={() => navigation.navigate('ChangeLeastHoldMoney')}
        >
          <Text className='text-base text-zinc-500'>최소보유금액 설정</Text>
          <AntDesign name="right" size={20} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.box}
          onPress={() => navigation.navigate('ChangeSalaryDay')}
        >
          <Text className='text-base text-zinc-500'>월급일 설정</Text>
          <AntDesign name="right" size={20} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.box}
          onPress={() => navigation.navigate('RegistSavingBox')}
        >
          <Text className='text-base text-zinc-500'>저금통 등록</Text>
          <AntDesign name="right" size={20} color="grey" />
        </TouchableOpacity>
      </ScrollView>

      
      <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>계좌 별명 변경</Text>
              <TextInput
                style={styles.input}
                placeholder="새로운 별명을 입력하세요"
                value={accountName}
                onChangeText={setAccountName}
              />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleNicknameChange} // Call function to change nickname
              >
                <Text style={styles.buttonText}>변경</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 100
  },
  box : {
    width: SCREEN_WIDTH * (9/10),
    marginBottom: 30,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  modalContent: {
    backgroundColor: 'white',
    width: 350,
    borderWidth: 1,
    borderColor: theme['sky-basic'],
    padding: 20,
    borderRadius: 10,
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
  modalButton: {
    width: 80,
    height: 40,
    borderColor: theme['sky-basic'],
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
});
