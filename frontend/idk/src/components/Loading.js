import { View, Text, Dimensions, Image, StyleSheet } from "react-native";
import theme from "../style";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const Loading = function () {
  const logo = require("../../assets/logo/color_idk_bank_logo.png");
  return (
    <View style={[styles.container, { backgroundColor:'white' }]}>
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 120,
    height: 120,
    marginVertical: "10%",
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
});
export default Loading;
