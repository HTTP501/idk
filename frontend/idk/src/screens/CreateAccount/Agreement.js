import { Text, View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import theme from '../../style'
import { useNavigation } from '@react-navigation/native';


const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

const Agreement = ({navigation}) => {
  const [isChecked, setChecked] = useState(false);

  return(
    <View style={styles.container}>
      <Text className='text-4xl font-bold my-16'>계좌 개설 약관 동의</Text>
      <View style={styles.box}>
        <View className='flex-row items-center'>
          <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
          <Text className='text-xl font-bold'>[필수] 상품설명서</Text>
        </View>
        <TouchableOpacity style={styles.detailButton}>
          <Text className='text-sm font-bold'>상세보기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <View className='flex-row items-center'>
          <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
          <Text className='text-xl font-bold'>[필수] 약관 전체 동의</Text>
        </View>
        <TouchableOpacity style={styles.detailButton}>
          <Text className='text-sm font-bold'>상세보기</Text>
        </TouchableOpacity>
      </View>
      <View style={{...styles.box, marginLeft: 60, height: 40}}>
        <Text className='text-base font-bold'>-  예금거래기본약관</Text>
      </View>
      <View style={{...styles.box, marginLeft: 60, height: 40, marginBottom: 50}}>
        <Text className='text-base font-bold'>-  IDK우리나라국민우대통장 약관</Text>
      </View>
      <View style={styles.notbox}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
        <Text className='text-sm w-72'>본인은 IDK은행으로부터 예금자보호제도에 대한 보험관계 및 보험금 한도에 대하여 안내 내용을 제공받고 이해하였음을 확인합니다.</Text>
      </View>
      <View style={styles.notbox}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
        <Text className='text-sm w-72'>본인은 약관 및 상품 설명서를 제공받고 그 내용을 충분히 이해햐여 본 상품에 가입합을 확인합니다.</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateAccount')}>
        <Text className='text-white text-lg'>다음</Text>
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
    padding: 10,
    width: SCREEN_WIDTH*(9/10),
    height: 80,
    justifyContent: 'space-between',
  },
  notbox: {
    flexDirection: 'row',
    padding: 10,
    width: SCREEN_WIDTH*(9/10),
    height: 90,
  },
  checkbox: {
    marginRight: 10,
  },
  button: {
    width: SCREEN_WIDTH*(9/10),
    height:50,
    backgroundColor: theme['sky-basic'],
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // 위치를 절대로 설정
    bottom: 20, // 화면 하단과의 간격
  },
  detailButton: {
    width: 70,
    height: 40,
    backgroundColor: theme.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },

})