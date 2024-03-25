import { Dimensions } from "react-native";

import { View, Text, StyleSheet, Image } from "react-native";
import theme from "../style";
import formattedNumber from "./moneyFormatter";


const DepositList = function ({ deposit }) {
  // 1. 날짜별 맵 생성
  const dateMap = new Map();
  for (const item of deposit) {
    const date = item.transactionCreatedAt.split(" ")[0]; // 날짜 추출
    if (!dateMap.has(date)) {
      dateMap.set(date, []);
    }
    dateMap.get(date).push(item);
  }

  // 2. 맵을 리스트로 변환
  const dateList = Array.from(dateMap.entries());
  return (
    <View>
      {dateList.map((item, index) => {
        return <DepositOnedayList item={item} key={index}/>;
      })}
    </View>
  );
};


const DepositOnedayList = function ({ item }) {
  const date = item[0];
  const dayitimes = item[1];
  // console.log(date,dayitimes);
  return (
    <View>
      <Text className="ml-8 mb-2 text-xs">{date}</Text>
      {dayitimes.map((item, index) => {
        return <DepositItem
        key={index}
        item={item} />;
      })}
    </View>
  );
};

const DepositItem = function ({ item }) {
  const date = new Date(item.transactionCreatedAt);
  // 시간 추출
  const hours = date.getHours();
  const minutes = date.getMinutes();
  // 12시간 형식으로 변환 (오전/오후 표시 없음)
  const time = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
  return (
    <View className="flex-row gap-3 px-8 py-3">
      <Image source={require('../../assets/icons/money.png')} style={{ width: 45, height: 45 }}/>
      <View className="flex-grow">
        <Text>{item.transactionContent}</Text>
        <Text className='text-xs'>{time}</Text>
      </View>
      <View className="items-end">
        <Text
          style={
            item.type === "입금"
              ? { color: theme["sky-basic"] }
              : { color: "red" }
          }
        >
          {formattedNumber(item.transactionAmount)}원
        </Text>
        <Text>{formattedNumber(item.transactionBalance)}원</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});

export default DepositList;
