import { Text, View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import theme from '../../style'
import { useNavigation } from '@react-navigation/native';


const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

const Agreement = ({navigation}) => {
  const [isProductDescriptionChecked, setProductDescriptionChecked] = useState(false);
  const [isAgreementAllChecked, setAgreementAllChecked] = useState(false);
  const [isDepositInsuranceInfoChecked, setDepositInsuranceInfoChecked] = useState(false);
  const [isProductDescriptionConfirmationChecked, setProductDescriptionConfirmationChecked] = useState(false);

  // 모든 체크박스가 선택되었는지 확인하는 함수
  const allCheckboxesChecked = () => {
    return (
      isProductDescriptionChecked &&
      isAgreementAllChecked &&
      isDepositInsuranceInfoChecked &&
      isProductDescriptionConfirmationChecked
    );
  };

  return(
    <View style={styles.container}>
      <Text className='text-4xl font-bold my-10'>계좌 개설 약관 동의</Text>
      <View style={styles.box}>
        <View className='flex-row items-center'>
          <Checkbox style={styles.checkbox} value={isProductDescriptionChecked} onValueChange={setProductDescriptionChecked} />
          <Text className='text-xl font-bold'>[필수] 상품설명서</Text>
        </View>
        <TouchableOpacity style={styles.detailButton}>
          <Text className='text-sm font-bold'>상세보기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <View className='flex-row items-center'>
          <Checkbox style={styles.checkbox} value={isAgreementAllChecked} onValueChange={setAgreementAllChecked} />
          <Text className='text-xl font-bold'>[필수] 약관 전체 동의</Text>
        </View>
        <TouchableOpacity style={styles.detailButton}>
          <Text className='text-sm font-bold'>상세보기</Text>
        </TouchableOpacity>
      </View>
      <View style={{...styles.box, marginLeft: 60, height: 50}}>
        <Text className='text-base font-bold'>-  예금거래기본약관</Text>
      </View>
      <View style={{...styles.box, marginLeft: 60, height: 50, marginBottom: 30}}>
        <Text className='text-base font-bold'>-  IDK우리나라국민우대통장 약관</Text>
      </View>
      <View style={styles.notbox}>
        <Checkbox style={styles.checkbox} value={isDepositInsuranceInfoChecked} onValueChange={setDepositInsuranceInfoChecked} />
        <Text className='text-sm w-72'>본인은 IDK은행으로부터 예금자보호제도에 대한 보험관계 및 보험금 한도에 대하여 안내 내용을 제공받고 이해하였음을 확인합니다.</Text>
      </View>
      <View style={styles.notbox}>
        <Checkbox style={styles.checkbox} value={isProductDescriptionConfirmationChecked} onValueChange={setProductDescriptionConfirmationChecked} />
        <Text className='text-sm w-72'>본인은 약관 및 상품 설명서를 제공받고 그 내용을 충분히 이해햐여 본 상품에 가입합을 확인합니다.</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          { opacity: allCheckboxesChecked() ? 1 : 0.5 }, // 모든 체크박스가 선택되었을 때만 활성화
        ]}
        onPress={() => navigation.navigate('CreateAccount')}
        disabled={!allCheckboxesChecked()} // 모든 체크박스가 선택되지 않은 경우 버튼 비활성화
      >
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
    width: 350,
    height: 80,
    justifyContent: 'space-between',
  },
  notbox: {
    flexDirection: 'row',
    padding: 10,
    width: 350,
    height: 90,
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
  },
  detailButton: {
    width: 70,
    height: 40,
    backgroundColor: theme.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },

})