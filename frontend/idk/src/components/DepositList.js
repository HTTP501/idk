import { Dimensions } from "react-native";

import { View, Text, StyleSheet,TouchableOpacity ,Image} from "react-native";
import theme from "../style";
import formattedNumber from "./moneyFormatter";



const DepositList = function ({ deposit,navigation }) {
  // 1. 날짜별 맵 생성
  const dateMap = new Map();
  for (const item of deposit) {
    const stringDate = new Date(item.transactionCreatedAt);
    const FullYear = stringDate.getFullYear()
    const Month = stringDate.getMonth()+1
    const day = stringDate.getDate()
    let date = ""
    //  올해라면 년 생략
    if (FullYear === new Date().getFullYear()){
      date = `${Month}월 ${day}일`
    } else{
      date = `${FullYear}년 ${Month}월 ${day}일`
    }
    
    if (!dateMap.has(date)) {
      dateMap.set(date, []);
    }
    dateMap.get(date).push(item);
  }

  // 2. 맵을 리스트로 변환
  const dateList = Array.from(dateMap.entries());
  return (
    <View>
      {dateList.map((item,index) => {
        return <DepositOnedayList item={item} key={index} navigation={navigation}/>;
      })}
    </View>
  );
};


const DepositOnedayList = function ({ item,navigation }) {
  const date = item[0];
  const dayitimes = item[1];
  // console.log(date,dayitimes);
  return (
    <View>
      <Text className="ml-8 mb-2 text-xs">{date}</Text>
      {dayitimes.map((item,index) => {
        return <DepositItem
        item={item} 
        key={index}
        navigation={navigation}
        />
      })}
    </View>
  );
};

const DepositItem = function ({ item,navigation }) {
  console.log(item)
  const date = new Date(item.transactionCreatedAt);
  // 시간 추출
  const hours = date.getHours();
  
  const minutes = date.getMinutes();
  // 12시간 형식으로 변환 (오전/오후 표시 없음)
  const time = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
  return (
    <TouchableOpacity className="flex-row gap-3 px-8 py-3 items-center"
    onPress={()=>{
      console.log('이체 상세 들어가기')
      navigation.navigate("DetailTransaction",{transactionId:item.transactionId})
    }}>
      <View>
      <Image source={require('../../assets/icons/money.png')} style={{ width: 35, height:35,resizeMode:"contain"}}/>
      </View>
      <View className="flex-grow">
        <Text
          style={
            item.isDeposit
              ? { color: theme["sky-basic"] }
              : { color: "red" }
          }>{item.transactionContent}</Text>
        <Text className='text-xs'>{time}</Text>
      </View>
      <View className="items-end">
        <Text
          style={
            item.isDeposit
              ? { color: theme["sky-basic"] }
              : { color: "red" }
          }
        >
          {formattedNumber(item.transactionAmount)}원
        </Text>
        <Text>{formattedNumber(item.transactionBalance)}원</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({});

export default DepositList;