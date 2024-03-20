import { View, Text } from "react-native";

const DetailPocket = ({ navigation, route }) => {
  console.log(route.params.pocketId);
  const pocketId = route.params.pocketId;
  return (
    <View>
      <Text>돈포켓 상세</Text>
      <Text>pocketId: {pocketId}</Text>
    </View>
  );
};

export default DetailPocket;
