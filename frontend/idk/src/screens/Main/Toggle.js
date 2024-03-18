import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import theme from "../../style";
const data = [
  { label: "전체", value: "1" },
  { label: "자동 이체", value: "2" },
  { label: "목표 저축", value: "3" },
];
const ToggleFilter = function () {
  const [value, setValue] = useState(1);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={styles.container}>
      <Text>토글아직구현안함</Text>
      {/* <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
            <Text>
                필터
            </Text>
          )}
        
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // padding: 16,
  },
  dropdown: {
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  
});

export default ToggleFilter;
