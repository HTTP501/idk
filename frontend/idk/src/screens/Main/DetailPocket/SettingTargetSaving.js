import React, { useRef, useState, useEffect } from 'react';
import { Text, View, Dimensions, TouchableOpacity, Switch, StyleSheet, TextInput, ScrollView, Animated, Image, Alert, Modal } from 'react-native';
import theme from '../../../style';
import { MaterialIcons } from '@expo/vector-icons';
import { autoTransferAxios, transactionAxios } from '../../../API/Member'
import { ChangeAccountNameAxios } from '../../../API/Account'
import Loading from "../../../components/Loading";
import { FontAwesome } from '@expo/vector-icons';
import { deleteTargetSavingAxios, getTargetSavingAxios} from '../../../API/TargetSaving'
import { changeDonPocketNameAxios, 
  deleteDonPocketAutoTransferAxios,
  changeDonPocketActivateAxios  } from '../../../API/DonPocket'

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const SettingTargetSaving = ({ navigation, route }) => {
  const [showModal, setShowModal] = useState(false);
  const [presentPrice, setPresentPrice] = useState(0)
  const [targetPrice, setTargetPrice] = useState(1)
  const [isActivated, setIsActivated] = useState(route.params.activated);
  const [data, setData] = useState(null)
  const [name, setName] = useState(null)

  const pocketId = route.params.pocketId
  const donPocketId = route.params.donPocketId

  let [loading, setLoading] = useState(false);
  useEffect(() => {
    getTargetSavingAxios(
      donPocketId,
      res => {
        setData(res.data.data)
        setName(res.data.data.name)
        setPresentPrice(res.data.data.count * res.data.data.monthlyAmount)
        setTargetPrice(res.data.data.goalAmount)
      },
      err => {
        if (err.response.data.code === 'C401') {
          Alert.alert('해당 목표저축 사용자와 해당 요청 사용자가 일치하지 않습니다.', '', [{text:'확인', onPress: () => navigation.navigate('Main')}])
        } else if (err.response.data.code === 'TS401') {
          Alert.alert('해당 목표저축이 존재하지 않습니다.', '', [{text:'확인', onPress: () => navigation.navigate('Main')}])
        }
      }
    )
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, []);

  // 수정 Axios
  const handleSetting = () => {
    changeDonPocketNameAxios(
      pocketId,
      {name: name},
      res => {
        console.log(res);
        Alert.alert('수정이 완료되었습니다.', '', [{text:'확인', onPress: () => navigation.navigate('Main')}])
      },
      err => {
        if (err.response.data.code === 'C401') {
          Alert.alert(err.response.data.message, '', [{text:'확인', onPress: () => navigation.navigate('Main')}])
        } else if (err.response.data.code === 'P404') {
          Alert.alert(err.response.data.message, '', [{text:'확인', onPress: () => navigation.navigate('Main')}])  
        }
      }
    )  }

  // 돈포켓 해지 Axios
  const deleteDonPocket = () => {
    deleteTargetSavingAxios(
      donPocketId,
      res => {
        Alert.alert('해지가 완료되었습니다.', '', [{text:'확인', onPress: () => navigation.navigate('Main')}])
      },
      err => {
        if (err.response.data.code === 'C401') {
          Alert.alert(err.response.data.message, '', [{text:'확인', onPress: () => navigation.navigate('Main')}])
        } else if (err.response.data.code === 'P404') {
          Alert.alert(err.response.data.message, '', [{text:'확인', onPress: () => navigation.navigate('Main')}])  
        }
      }
    )
    setShowModal(false)
  }

  
  // 돈 포켓 자동 넣기 Axios
  const HandleIsActivated = () => {
    changeDonPocketActivateAxios(
      pocketId,
      res => {
        setIsActivated(previousState => !previousState)
      },
      err => {
        if (err.response.data.code === 'C401') {
          Alert.alert(err.response.data.message, '', [{text:'확인', onPress: () => navigation.navigate('Main')}])
        } else if (err.response.data.code === 'P404') {
          Alert.alert(err.response.data.message, '', [{text:'확인', onPress: () => navigation.navigate('Main')}])  
        }
      }
    )
  }

  
  const ProgressBar = ({ targetPrice, presentPrice }) => {
    const progressAnim = useRef(new Animated.Value(0)).current; // 애니메이션 값 초기화
    const iconPositionAnim = useRef(new Animated.Value(0)).current; // 아이콘 위치 애니메이션 값 초기화
  
    useEffect(() => {
      // 현재 금액 대비 목표 금액의 비율을 계산
      const percentage = (presentPrice / targetPrice) * 100;

      // 진행 상태 바 애니메이션
      Animated.timing(progressAnim, {
        toValue: percentage,
        duration: 1000,
        useNativeDriver: false,
      }).start();
  
      // 아이콘 위치 애니메이션
      Animated.timing(iconPositionAnim, {
        toValue: percentage,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }, [presentPrice, targetPrice]);
  
    const width = progressAnim.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'], // 0%에서 100%로 너비 변경
      extrapolate: 'clamp',
    });

    // 아이콘 위치 스타일 설정
    const iconTranslateX = iconPositionAnim.interpolate({
      inputRange: [0, 100],
      outputRange: [0, SCREEN_WIDTH * 0.8 ], // 아이콘이 바의 끝까지 이동하도록 설정
      extrapolate: 'clamp',
    });
  
    return (
      <View>
        <View style={{width: SCREEN_WIDTH * 0.8}}>
          <Animated.View style={[styles.iconContainer, { transform: [{ translateX: iconTranslateX }] }]}>
            <MaterialIcons name="directions-run" size={24} color={theme['sky-basic']} />
          </Animated.View>
        </View>
        <View style={styles.progressBarBackground}>
          <Animated.View style={[styles.progressBarFill, { width }]} />
        </View>
      </View>
    );
  };

  return (
    <>
    {loading ? (
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
          <View style={{paddingHorizontal: SCREEN_WIDTH * (1/10)}}>
            <View className='flex-row items-end self-start mb-8'>
              <Text className='text-2xl font-bold'>{data.term}개월</Text>
              <Text className='text-base'> 후에 목표 달성!</Text>
            </View>
            {/* 애니메이션 */}
            <ProgressBar
              targetPrice={targetPrice} 
              presentPrice={presentPrice} 
            />
          </View>
          <View style={styles.box}>
            <Text className='text-base font-bold mb-1'>이름</Text>
            <TextInput
              placeholder={data.name}
              className='text-base'
              value={name}
              onChangeText={(text) => setName(text)}
            >
            </TextInput>
          </View>
          <View style={styles.box}>
            <Text className='text-base font-bold mb-1'>이체일</Text>
            <View className='flex-row'>
              <Text className='text-base'>매월 </Text>
              <Text className='text-base'>{data.date} 일</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text className='text-base font-bold mb-1'>현재 금액</Text>
            <View className='flex-row'>
              <Text className='text-base'>{data.count * data.monthlyAmount}</Text>
              <Text className='text-base'> 원</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text className='text-base font-bold mb-1'>목표 금액</Text>
            <View className='flex-row'>
              <Text className='text-base'>{data.goalAmount} 원</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text className='text-base font-bold mb-1'>남은 기간</Text>
            <View className='flex-row'>
              <Text className='text-base'>{data.term - data.count} 개월</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text className='text-base font-bold mb-1'>시작일</Text>
            <Text className='text-base'>{data.createdAt.substring(0, 10)}</Text>
          </View>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setShowModal(true)}
          >
            <Text className="text-zinc-500 text-lg">돈포켓 해지하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.button}}
            onPress={handleSetting}
          >
            <Text className="text-white text-lg font-bold">이름 수정</Text>
          </TouchableOpacity>
        </ScrollView>

        <Modal
          visible={showModal}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text className='text-xl font-bold mb-1'>'{route.params.name}' 목표저축을</Text>
              <Text className='text-xl font-bold mb-1'>해지하시겠습니까?</Text>
              <Text className='text-sm mb-3'>모은 금액은 모두 계좌로 돌아갑니다.</Text>
              <TouchableOpacity
                style={styles.modalButton1}
                onPress={deleteDonPocket}
              >
                <Text className='text-lg font-bold'>목표저축 해지하기</Text>
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
      ) : <Loading/>}
  </>
  );
};


export default SettingTargetSaving;

const styles = StyleSheet.create({
  container : {
    flex: 1,
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
  progressBarBackground: {
    height: 20,
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme['sky-basic'],
    borderRadius: 10,
  },
  iconContainer: {
    position: 'absolute',
    top: -12, // 원하는 위치로 조정
    left: -20, // 원하는 위치로 조정
  },
});
