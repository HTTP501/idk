import { View, Text, StyleSheet, Dimensions,Image } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import theme from "../style";
import AntDesign from "@expo/vector-icons/AntDesign";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");



const bankData = [
 {label:'IDK은행', value:0,source: require("../../assets/logo/app_icon.png")},
 {label:'KB국민은행', value:1,source: require("../../assets/banks/KBBank.png")},
 {label:'카카오뱅크', value:2,source: require("../../assets/banks/KakaoBank.png")},
 {label:'신한은행', value:3,source: require("../../assets/banks/ShinhanBank.png")},
 {label:'NH농협은행', value:4,source: require("../../assets/banks/NHBank.png")},
 {label:'하나은행', value:5,source: require("../../assets/banks/HanaBank.png")},
 {label:'우리은행', value:6,source: require("../../assets/banks/WooriBank.png")},
 {label:'IBK기업은행', value:7,source: require("../../assets/banks/IBKBank.png")},
 {label:'케이뱅크', value:8,source: require("../../assets/banks/KBank.png")},
//  {label:'KB국민카드', value:9,source: require("../../assets/banks/KBCard.png")},
]

// 필터 토글
const BankToggle= ({changeBank})=>{
  const [value, setValue] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const [focusedType, setFocusedType] = useState("IDK은행");
  const renderItem = item => {
    return (
      <View style={styles.item} className="flex-row gap-3 p-3 items-center">
        <Image source={item.source} style={{width:30,height:30,resizeMode:"contain"}}/>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* {renderLabel()} */}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        selectedTextStyle={styles.selectedTextStyle}
        mode={"default"}
        placeholder={""}
        data={bankData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        activeColor={theme["sky-bright-5"]}
        onChange={(item) => {
          // 은행 바꿔주기
          changeBank(item.label);
          setValue(item.value);
          setFocusedType(item.label);
          setIsFocus(false);
        }}
        renderItem={renderItem}
        renderLeftIcon={() => (
          <View className="flex-row gap-3 items-center ml-1">
            <Image source={bankData[value].source} style={{width:30,height:30,resizeMode:"contain"}}/>
            <Text className="text-lg font-bold">{bankData[value].label}</Text>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: SCREEN_WIDTH*(1/2),
  },
  dropdown: {
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 4,
    // paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:10,
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

export default BankToggle;
