import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import theme from "../../style";
import AntDesign from "@expo/vector-icons/AntDesign";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const data = [
  { label: "전체", value: "1" ,type:"total"},
  { label: "자동 이체", value: "2",type:"autoTransfer" },
  { label: "자동 결제", value: "3",type:"autoDebit" },
  { label: "목표 저축", value: "4",type:"saving" },
];

// 필터 토글
const ToggleFilter = function ({changePocketType}) {
  const [value, setValue] = useState(1);
  const [isFocus, setIsFocus] = useState(false);
  const [focusedType, setFocusedType] = useState("전체");
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          {focusedType}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        selectedTextStyle={styles.selectedTextStyle}
        mode={"auto"}
        placeholder={""}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        activeColor={theme["sky-bright-5"]}
        onChange={(item) => {
          // 필터 바꿔주기
          changePocketType(item.type)
          setValue(item.value);
          setFocusedType(item.label);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <View style={{ width: 0, margin: 0, padding: 0 }}>
            {/* <Text>{focusedType}</Text> */}
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: SCREEN_WIDTH * (1 / 4),
  },
  dropdown: {
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 4,
  },

  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 10,
    top: 8,
    zIndex: 999,
    fontSize: 14,
  },

  selectedTextStyle: {
    fontSize: 0,
  },
});

export default ToggleFilter;
