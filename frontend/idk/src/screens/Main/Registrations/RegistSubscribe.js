import React, { useRef, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import theme from "../../../style";
import formattedNumber from "../../../components/moneyFormatter";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
// 페이지
const RegistSubscribe = ({ navigation,route }) => {
  // 서비스 명과, 이체 주기, 가격 변수
  const transactionData = route.params.transactionData
  let [serviceName, setServiceName] = useState(transactionData.transactionContent);
  let [period, setPeriod] = useState(15);
  let [price, setPrice] = useState(transactionData.transactionAmount);
  console.log(transactionData)
  // 돈 입력
  const changeMoney = (text)=>{
    if (text.length === 0){
      setPrice(0)
    } else {
        const number = Number(text.replace(/[^0-9]/g, ""))
        setPrice(number)
    } 
  }
  // 최종 등록
  const registSubscribtion = () => {
    if (period < 1 || period > 28) {
      alert("이체 주기는 1일에서 28일 사이로 설정할 수 있습니다.");
      setPeriod(15);
    } else if (price == 0) {
      alert("0원은 등록할 수 없습니다.");
    } else {
      console.log(serviceName, period, price, "등록하기");
      navigation.navigate("Main");
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        backgroundColor: "white",
        width: SCREEN_WIDTH,
        paddingHorizontal: 30,
        paddingTop: 100,
      }}
    >
      {/* 배경 */}
      <View style={styles.back}></View>
      <View style={styles.box} className="mb-16">
        <Text className="text-3xl font-bold pl-3">구독 서비스</Text>
      </View>
      {/* 구독 아이콘들 */}
      <ServiceList
        changeService={(name, cost) => {
          setServiceName(name);
          // setPrice(cost);
        }}
      />

      {/* 입력창 */}
      <View style={styles.box}>
        <Text className="text-base font-bold">구독 서비스 명</Text>
        <TextInput
          style={styles.input}
          value={serviceName}
          onChangeText={(text) => setServiceName(text)}
          placeholder="넷플릭스"
        />
      </View>
      <View style={styles.box}>
        <Text className="text-base font-bold">이체 주기, 날짜</Text>
        <View style={styles.input} className="flex-row items-center gap-1">
          <Text style={{marginBottom:2}}>매월</Text>
          <TextInput
            style={[]}
            value={String(period)}
            keyboardType="numeric"
            placeholder="15"
            onChangeText={(text) => {
              setPeriod(text);
            }}
          />
          <Text style={{marginBottom:2}}>일</Text>
        </View>
      </View>
      {/* 구독 비용 */}
      <View style={styles.box}>
        <Text className="text-base font-bold">구독료</Text>
        <View style={styles.input} className="flex-row items-center gap-2">
          <TextInput
            keyboardType="numeric"
            value={formattedNumber(price)}
            placeholder="3,750"
            onChangeText={(text) => {
              changeMoney(text);
            }}
          />
          <Text>원</Text>
        </View>
      </View>
      {/* 등록 버튼 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          registSubscribtion();
        }}
      >
        <Text className="text-white text-lg font-bold">등록하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const ServiceList = function ({ changeService }) {
  // 구독 서비스 내용
  let [subscriptionName, setSubscriptionName] = useState([
    [
      {
        id: 1,
        name: "넷플릭스",
        cost: 9250,
        source: require("../../../../assets/SubscribeIcons/netflix.png"),
      },
      {
        id: 2,
        name: "티빙",
        cost: 9500,
        source: require("../../../../assets/SubscribeIcons/tving.png"),
      },
      {
        id: 3,
        name: "유튜브 프리미엄",
        cost: 14900,
        source: require("../../../../assets/SubscribeIcons/youtube.png"),
      },
    ],
    [
      {
        id: 4,
        name: "쿠팡플레이",
        cost: 3000,
        source: require("../../../../assets/SubscribeIcons/coupangplay.png"),
      },
      {
        id: 5,
        name: "디즈니 플러스",
        cost: 9900,
        source: require("../../../../assets/SubscribeIcons/disney.png"),
      },
      {
        id: 6,
        name: "시리즈온",
        cost: 9900,
        source: require("../../../../assets/SubscribeIcons/serieson.png"),
      },
    ],
    [
      {
        id: 7,
        name: "왓챠",
        cost: 13000,
        source: require("../../../../assets/SubscribeIcons/watcha.png"),
      },
      {
        id: 8,
        name: "웨이브",
        cost: 7900,
        source: require("../../../../assets/SubscribeIcons/wwave.png"),
      },
      { id: 9, name: "기타", cost: 0, source: "" },
    ],
  ]);
  // 선택된 값
  let [selectedSubscribtions, setSelectedSubscribtions] = useState("넷플릭스");

  // 9개 아이콘 리스트들

  return (
    <View style={{ flex: 1 }} className="mb-10">
      {/* 3 * 3 형식으로 만듬 */}
      {subscriptionName.map((line) => {
        return (
          <View className="flex-row">
            {/* 각 아이템 하나의 스타일 */}
            {line.map((item) => {
              // 선택된 것은 스타일을 다르게 줌
              const itemStyle =
                item.name === selectedSubscribtions
                  ? styles.selected
                  : styles.subscribesize;
              return (
                <TouchableOpacity
                  style={itemStyle}
                  onPress={() => {
                    setSelectedSubscribtions(item.name);
                    changeService(item.name, item.cost);
                  }}
                >
                  {item.name === "기타" ? (
                    <Text className="text-3xl font-bold">+</Text>
                  ) : (
                    <Image source={item.source} style={{width:50, height:50, resizeMode:'contain'}}/>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  back: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: theme["sky-bright-6"],
    height: SCREEN_HEIGHT * (4 / 7),
    width: SCREEN_WIDTH,
  },

  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme["sky-bright-6"],
    paddingTop: 120,
  },
  box: {
    width: SCREEN_WIDTH * (4 / 5),
    marginBottom: 30,
  },
  subscribelistsize: {
    alignItems: "center",
  },
  subscribesize: {
    backgroundColor: "white",
    borderRadius: 10,
    width: SCREEN_WIDTH * (1 / 6),
    height: SCREEN_WIDTH * (1 / 6),
    marginBottom: 20,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  selected: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme["sky-basic"],
    width: SCREEN_WIDTH * (1 / 6),
    height: SCREEN_WIDTH * (1 / 6),
    marginBottom: 20,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  iconsize: { width: SCREEN_WIDTH * (1 / 6), resizeMode: "contain" },
  input: {
    borderBottomWidth: 1,
    width: SCREEN_WIDTH * (4 / 5),
    borderColor: theme.grey,
    height: 40,
    alignSelf: "center",
  },
  button: {
    width: SCREEN_WIDTH * (9 / 10),
    height: 50,
    backgroundColor: theme["sky-basic"],
    alignItems: "center",
    justifyContent: "center",
    // position: 'absolute',
    bottom: 20, // 화면 하단과의 간격
    alignSelf: "center",
    borderRadius: 10,
  },
});

export default RegistSubscribe;
