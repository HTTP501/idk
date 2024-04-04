import { Text, View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import theme from '../../style'

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

const Agreement = ({navigation}) => {
  const [isCheckedAll, setCheckedAll] = useState(false);
  const [isCheckedPersonalInfo, setCheckedPersonalInfo] = useState(false);
  const [isCheckedServiceTerms, setCheckedServiceTerms] = useState(false);
  const [isCheckedEssentialInfo, setCheckedEssentialInfo] = useState(false);
  const [isCheckedRights, setCheckedRights] = useState(false);
  const [isCheckedElectronicDocument, setCheckedElectronicDocument] = useState(false);

  const handleCheckAll = () => {
    const newValue = !isCheckedAll;
    setCheckedAll(newValue);
    setCheckedPersonalInfo(newValue);
    setCheckedServiceTerms(newValue);
    setCheckedEssentialInfo(newValue);
    setCheckedRights(newValue);
    setCheckedElectronicDocument(newValue);
  };

  const isAllChecked = () => {
    return (
      isCheckedPersonalInfo &&
      isCheckedServiceTerms &&
      isCheckedEssentialInfo &&
      isCheckedRights &&
      isCheckedElectronicDocument
    );
  };

  return(
    <View style={styles.container}>
      <Text className='text-4xl font-bold my-16'>이용 약관 동의</Text>
      <View style={styles.box}>
        <Checkbox color={theme['sky-basic']} style={styles.checkbox} value={isCheckedAll} onValueChange={handleCheckAll} />
        <Text className='text-xl font-bold'>약관에 모두 동의</Text>
      </View>
      <View style={styles.notbox}>
        <Checkbox color={theme['sky-basic']} style={styles.checkbox} value={isCheckedPersonalInfo} onValueChange={setCheckedPersonalInfo} />
        <Text className='text-lg'>개인 정보 수집 및 이용 동의</Text>
      </View>
      <View style={styles.notbox}>
        <Checkbox color={theme['sky-basic']} style={styles.checkbox} value={isCheckedServiceTerms} onValueChange={setCheckedServiceTerms} />
        <Text className='text-lg'>서비스 이용약관 동의</Text>
      </View>
      <View style={styles.notbox}>
        <Checkbox color={theme['sky-basic']} style={styles.checkbox} value={isCheckedEssentialInfo} onValueChange={setCheckedEssentialInfo} />
        <Text className='text-lg'>서비스 제공을 위한 필수 정보 동의</Text>
      </View>
      <View style={styles.notbox}>
        <Checkbox color={theme['sky-basic']} style={styles.checkbox} value={isCheckedRights} onValueChange={setCheckedRights} />
        <Text className='text-lg'>이용자 권리 및 의무에 대한 안내 동의</Text>
      </View>
      <View style={{...styles.notbox, marginBottom: 100}}>
        <Checkbox color={theme['sky-basic']} style={styles.checkbox} value={isCheckedElectronicDocument} onValueChange={setCheckedElectronicDocument} />
        <Text className='text-lg'>전자문서 및 전자금융거래 이용 동의</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, { opacity: isAllChecked() ? 1 : 0.5 }]}
        disabled={!isAllChecked()}
        onPress={() => navigation.navigate('EnterName')}>
        <Text className="text-white text-lg font-bold">다음</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Agreement


const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    width: 350,
    height: 80,
    marginBottom: 30,
  },
  notbox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: 350,
    height: 70,
  },
  checkbox: {
    marginRight: 10,
    width: 30,
    height: 30,
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
  }

})