import { Text, View, Dimensions, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import theme from '../../../style'
import { useNavigation } from '@react-navigation/native';


const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

const AgreeMyData = ({navigation}) => {
  const [isCheckedAll, setCheckedAll] = useState(false);
  const [isCheckedPersonalInfo, setCheckedPersonalInfo] = useState(false);
  const [isCheckedServiceTerms, setCheckedServiceTerms] = useState(false);
  const [isCheckedEssentialInfo, setCheckedEssentialInfo] = useState(false);
  const [isCheckedRights, setCheckedRights] = useState(false);

  const handleCheckAll = () => {
    const newValue = !isCheckedAll;
    setCheckedAll(newValue);
    setCheckedPersonalInfo(newValue);
    setCheckedServiceTerms(newValue);
    setCheckedEssentialInfo(newValue);
    setCheckedRights(newValue);
  };

  const isAllChecked = () => {
    return (
      isCheckedPersonalInfo &&
      isCheckedServiceTerms &&
      isCheckedEssentialInfo &&
      isCheckedRights
    );
  };


  return(
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text className='text-3xl font-bold my-16'>IDK 마이데이터 약관 동의</Text>
        <View style={styles.box}>
          <Checkbox color={theme['sky-basic']} style={styles.checkbox} value={isCheckedAll} onValueChange={handleCheckAll} />
          <Text className='text-xl font-bold'>전체 동의</Text>
        </View>
        <View style={styles.notbox}>
          <Checkbox color={theme['sky-basic']} style={styles.checkbox} value={isCheckedPersonalInfo} onValueChange={setCheckedPersonalInfo} />
          <Text className='text-lg'>IDK 마이데이터 서비스 이용 약관</Text>
        </View>
        <View style={styles.notbox}>
          <Checkbox color={theme['sky-basic']} style={styles.checkbox} value={isCheckedServiceTerms} onValueChange={setCheckedServiceTerms} />
          <Text className='text-lg'>IDK 마이데이터 서비스 설명서</Text>
        </View>
        <View style={styles.notbox}>
          <Checkbox color={theme['sky-basic']} style={styles.checkbox} value={isCheckedEssentialInfo} onValueChange={setCheckedEssentialInfo} />
          <Text className='text-lg'>개인(신용)정보 수집이용 동의서 (마이데이터 서비스)</Text>
        </View>
        <View style={{...styles.notbox, borderBottomWidth: 1, paddingBottom: 20}}>
          <Checkbox color={theme['sky-basic']} style={styles.checkbox} value={isCheckedRights} onValueChange={setCheckedRights} />
          <Text className='text-lg'>IDK 마이데이터 서비스 이용 약관</Text>
        </View>
        <Text className='text-sm' style={{width: 350, marginTop: 30}}>무분별한 마이데이터 서비스 가입은 소중한 내 정보의 과도한 전송 및 집적을 초래합니다.</Text>
        <Text className='text-sm' style={{width: 350, }}>소중한 내 정보를 지키면서 편리한 마이데이터 서비스를 이용하려면 다음 사항들을 꼭 기억해주세요.</Text>
        <Text className='text-sm' style={{width: 350, marginTop: 30}}>하나, 마이데이터 서비스 가입 전 한 번 더 고민해보기</Text>
        <Text className='text-sm' style={{width: 350,}}>둘, 반드시 필요한 마이데이터 서비스만 가입하기</Text>
        <Text className='text-sm' style={{width: 350,}}>셋, 잘 이용하지 않는 마이데이터 앱은 서비스 탈퇴 후 삭제하기</Text>
        <TouchableOpacity
          style={[styles.button, { opacity: isAllChecked() ? 1 : 0.5 }]}
          disabled={!isAllChecked()}
          onPress={() => navigation.navigate('LinkMyData')}>
          <Text className="text-white text-lg">다음</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default AgreeMyData


const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 30,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: 350,
    height: 80,
    borderBottomWidth: 1,
  },
  notbox: {
    flexDirection: 'row',
    padding: 10,
    width: 350,
    marginTop: 10,
  },
  checkbox: {
    marginRight: 10,
    width: 25,
    height: 25,
  },
  button: {
    width: SCREEN_WIDTH*(9/10),
    height:50,
    backgroundColor: theme['sky-basic'],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 20,
  },
  detailButton: {
    width: 70,
    height: 40,
    backgroundColor: theme.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },

})