import { View, Text } from "react-native";
const DetailSavingBox = ({ navigation, route }) => {
  const pocketId = route.params.pocketId;
  return (
    <View>
      <Text>저금통 상세</Text>
      <Text>pocketId: {pocketId}</Text>
    </View>
  );
};

export default DetailSavingBox;
