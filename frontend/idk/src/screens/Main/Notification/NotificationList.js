import { View, FlatList, Text } from "react-native";
import theme from "../../../style";

const Notification = () => {
  const notification = [
    {
      id: 1,
      type: "돈포켓",
      message: "내일 지출 예정인 돈포켓이 채워지지 않았어요.",
      date: new Date(),
      isRead: false,
    },
    {
      id: 2,
      type: "입출금 알림",
      message: "삼성 소프트...님이 보낸 1,000,000원이 전재산 통장에 입금되었어요.",
      date: new Date(),
      isRead: true,
    },
    {
      id: 3,
      type: "입출금 알림",
      message: "조용훈님에게 50,000원 송금했어요.",
      date: new Date(),
      isRead: true,
    },
    {
      id: 4,
      type: "돈포켓",
      message: "목표 저축 삼성 갤럭시링... 에서 250,000원을 결제했어요.",
      date: new Date(),
      isRead: true,
    },
  ];
  const renderItem = ({ item }) => {
    let color = theme["sky-bright-6"];
    if (item.isRead) {
      color = theme["light-grey"];
    }
    return (
      <View className="p-5" style={{ backgroundColor: color }}>
        <Text>{item.type}</Text>
        <Text>{item.message}</Text>
        <View className="flex-row gap-1">
        <Text>
            {item.date.getMonth()+1}월
        </Text>
        <Text>
            {item.date.getDate()}일
        </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{ paddingTop: 120, backgroundColor: "white", height: "100%" }}>
      <FlatList
        data={notification}
        renderItem={renderItem}
        contentContainerStyle={{
          display: "flex",
        }}
        keyExtractor={data.id}
      />
    </View>
  );
};
export default Notification;
