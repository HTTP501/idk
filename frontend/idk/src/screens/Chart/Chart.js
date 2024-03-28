import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Modal,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import theme from "../../style";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import * as d3 from "d3";
import Svg, { Ellipse, G, Rect, Line, Text as SvgText } from "react-native-svg";
import { Timeline, Tween, Back } from "gsap-rn";
import { callAnalystDataAxios } from "../../API/ChartData.js";
import Loading from "../../components/Loading.js";
import { useFocusEffect } from "@react-navigation/native";

const Chart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [nowData, setNowData] = useState(null);
  const [nowDonutData, setNowDonutData] = useState([]);
  const [average, setAverage] = useState(null);
  const [nowAmount, setAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [nowCategory, setNowCategory] = useState("total");
  const [callOver, setCallOver] = useState(false);
  // 화면 사이즈 인식
  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

  // 모든 상태가 세팅이 되면 로딩 해제
  useEffect(() => {
    if (callOver === true) {
      setIsLoading(false);
    }
  }, [callOver]);

  // 맨 처음 들어왔을때, 데이터 호출
  useEffect(() => {
    const getResponse = (response) => {
      setNowData(response.data.data.amountList);
    };
    const fail = (error) => {
      console.log(error);
    };
    callAnalystDataAxios("total", getResponse, fail);
  }, []);

  // Axios 요청으로 Data가 들어왔다면 상태를 변경할 changeData를 호출
  useEffect(() => {
    if (nowData !== null) {
      changeData();
    }
  }, [nowData]);

  // changeData에서 모든 계산이 끝나고 상태를 설정했다면 로딩을 끝내기위해 callOver를 true로
  useEffect(() => {
    if (average !== null && maxAmount !== null && nowAmount !== null) {
      setCallOver(true);
    }
  }, [average, maxAmount, nowAmount]);

  // Axios 요청으로 받은 데이터를 계산하여 상태로 바꾸어주는 함수
  const changeData = async () => {
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth() + 1;

    const calculAverage = async (data) => {
      let tmpSum = 0,
        tmpAmount = 0,
        tmpMaxAmount = 0;

      await data.forEach((each) => {
        // 평균을 내기 위해서 다 더함
        if (
          new Date(`${each.year}-${each.month}-01`) <= nowDate &&
          oneYearAgo <= new Date(`${each.year}-${each.month}-01`)
        ) {
          tmpSum += Math.floor(each.amount / 10000);

          // 접속한 달의 사용요금을 먼저 상태로 지정
          if (each.year === nowYear && each.month === nowMonth) {
            tmpAmount = Math.floor(each.amount / 10000);
          }
          // 차트의 Y값을 조절하기 위해서 현재 데이터에서 최고값을 찾는다.
          if (Math.floor(each.amount / 10000) > tmpMaxAmount) {
            tmpMaxAmount = Math.floor(each.amount / 10000);
          }
        }
      });
      // 1년 동안의 소비를 더해 평균값을 냄

      const tmpAverage = Math.floor(tmpSum / 12);

      setAverage(tmpAverage);
      setAmount(tmpAmount);
      setMaxAmount(tmpMaxAmount);
      setSelectedMonth(nowMonth);
      setSelectedYear(nowYear);
    };
    calculAverage(nowData);
  };

  const ChartStyle = StyleSheet.create({
    mainContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    topBarStyle: {
      flex: 1,
      marginTop: 60,
    },
    titlefont: {
      fontWeight: "bold",
      fontSize: 30,
      marginTop: 20,
      marginLeft: 20,
    },
    topChartArea: {
      flex: 2,
      marginTop: 30,
    },
    categoryMainBox: {
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: theme["light-grey-darkness"],
      borderColor: theme["light-grey-darkness"],
      width: "100%",
      flexDirection: "row",
      height: 30,
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: 20,
    },
    categoryBox: {
      borderWidth: 1,
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      height: 30,
      width: 80,
    },
    categoryTxt: {
      fontSize: 15,
    },
  });

  const topBar = () => {
    return (
      <View style={{ ...ChartStyle.topBarStyle }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons name="arrow-back-ios-new" size={36} color="black" />
        </TouchableOpacity>
        <Text style={{ ...ChartStyle.titlefont }}>통계</Text>
      </View>
    );
  };

  const width = 730;
  const height = 400;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;
  const skyBright1 = "#7ECEFF";
  const lightGreyDarkness = "#C0C0C0";
  const lightGrey = "#ededed";
  const now = new Date();
  const oneYearAgo = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate()
  );

  // x축 (수평선) 축척 선언
  const x = d3
    .scaleUtc()
    // 현재로부터 1년까지 범위로 정함
    .domain([oneYearAgo, now])
    .range([20, width]);

  // y축 (수직선) 축척 선언
  const y = d3
    .scaleLinear()
    .domain([0, maxAmount + maxAmount / 3])
    .range([height, 0]);

  const clickMonth = async (dateData) => {
    const foundData = await nowData.find((data) => {
      return (
        new Date(`${data.year}-${data.month}-01`).getFullYear() ===
          dateData.getFullYear() &&
        new Date(`${data.year}-${data.month}-01`).getMonth() + 1 ===
          dateData.getMonth() + 1
      );
    });

    if (foundData) {
      setAmount(Math.floor(foundData.amount / 10000));
    }

    setSelectedYear(dateData.getFullYear());
    setSelectedMonth(dateData.getMonth() + 1);
  };

  const categoryBtn = (text, category) => {
    const changeCategory = () => {
      setNowCategory(category);
    };

    return (
      <TouchableOpacity onPress={changeCategory}>
        <View
          style={{
            ...ChartStyle.categoryBox,
            backgroundColor:
              nowCategory === category
                ? theme["sky-bright-4"]
                : theme["light-grey-darkness"],
            borderColor:
              nowCategory === category
                ? theme["sky-bright-4"]
                : theme["light-grey-darkness"],
          }}
        >
          <Text style>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // 카테고리가 바뀌었을때 콜백할 함수
  useEffect(() => {
    const getResponse = (response) => {
      setNowData(response.data.data.amountList);
    };
    const fail = (error) => {
      console.log(error);
    };
    callAnalystDataAxios(nowCategory, getResponse, fail);
  }, [nowCategory]);

  // 바 차트 상단에서 항목을 바꾸어줄 버튼 바 컴포넌트
  const categoryBar = () => {
    return (
      <View style={{ ...ChartStyle.categoryMainBox }}>
        {/* 총 지출버튼 */}
        {categoryBtn("총 지출", "total")}
        {/* 카드 지출 버튼 */}
        {categoryBtn("카드 지출", "card")}
        {/* 공과금 버튼 */}
        {categoryBtn("공과금", "utility")}
        {/* 일반 지출 버튼 */}
        {categoryBtn("일반 지출", "common")}
      </View>
    );
  };

  // 바 차트 컴포넌트
  const totalAverageChart = () => {
    return (
      // 평균보다 높으면 더 사용했고, 낮으면 적게 사용했다고 얘기해줘야함
      <View>
        {average > nowAmount ? (
          <Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              평균보다
              <Text style={{ fontSize: 25 }}> {average - nowAmount}만원 </Text>
              아꼈어요.
            </Text>
          </Text>
        ) : (
          <Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              평균보다
              <Text style={{ fontSize: 25 }}> {nowAmount - average}만원 </Text>
              더 사용했어요.
            </Text>
          </Text>
        )}
        {/* 카테고리 선택 바 만들기 */}
        {categoryBar()}

        {/* 바 차트 부분 */}
        <View
          style={{
            width: "auto",
            borderWidth: 1,
            borderRadius: 20,
            borderColor: "grey",
            paddingHorizontal: 20,
            marginTop: 20,
          }}
        >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Svg height={height + 50} width={width} id="barChart">
              <Line
                x1="10"
                y1={y(average)}
                x2={width - 25}
                y2={y(average)}
                stroke={skyBright1}
                strokeWidth="2"
                strokeDasharray="5, 5"
              />
              <SvgText
                x={width - 10}
                y={y(average) + 4}
                fontSize="13"
                textAnchor="middle"
                fill={skyBright1}
              >
                평균
              </SvgText>
              <G>
                <Rect
                  x={0}
                  y={height}
                  width={width - 20}
                  height="40"
                  rx={3}
                  ry={3}
                  fill={lightGrey}
                />
                {x.ticks(d3.timeMonth).map((tick, index) => (
                  <G key={index} onPress={() => clickMonth(tick)}>
                    <Rect
                      x={x(tick) - 22}
                      y={height + 8}
                      width="45"
                      height="24"
                      rx={3}
                      ry={3}
                      fill={
                        d3.timeFormat("%Y")(tick) == selectedYear &&
                        d3.timeFormat("%m")(tick) == selectedMonth
                          ? skyBright1
                          : lightGrey
                      }
                      onPress={() => clickMonth(tick)}
                    />
                    <SvgText
                      x={x(tick)}
                      y={height + 25}
                      fontSize="13"
                      textAnchor="middle"
                      fill={"black"}
                    >
                      {d3.timeFormat("%y.%m")(tick)}
                    </SvgText>
                  </G>
                ))}
                {/* {y.ticks().map((tick, index) => (
                  <SvgText
                    key={index}
                    x={marginLeft - 10}
                    y={y(tick)}
                    fontSize="10"
                    textAnchor="end"
                  >
                    {tick}
                  </SvgText>
                ))} */}
                {nowData.map((d, index) => {
                  const barWidth = 25; // 막대의 너비를 설정합니다. 실제 애플리케이션에서는 동적으로 계산할 수 있습니다.
                  const barHeight =
                    height - marginBottom - y(Math.floor(d.amount / 10000)); // 막대의 높이를 계산합니다.
                  const barX =
                    x(new Date(`${d.year}-${d.month}-01`)) - barWidth / 2; // 막대의 x 위치를 계산합니다.
                  const barY = y(Math.floor(d.amount / 10000)); // 막대의 y 위치를 계산합니다.

                  return (
                    <G key={index}>
                      {new Date(`${d.year}-${d.month}-01`).getFullYear() ==
                        selectedYear &&
                      new Date(`${d.year}-${d.month}-01`).getMonth() + 1 ==
                        selectedMonth ? (
                        <SvgText
                          x={barX + 12}
                          y={barY - 5}
                          fill={skyBright1}
                          textAnchor="middle"
                        >
                          {Math.floor(d.amount / 10000)}
                        </SvgText>
                      ) : null}
                      <Rect
                        id={d.id}
                        x={barX}
                        y={barY}
                        width={barWidth}
                        height={barHeight}
                        fill={
                          new Date(`${d.year}-${d.month}-01`).getFullYear() ==
                            selectedYear &&
                          new Date(`${d.year}-${d.month}-01`).getMonth() + 1 ==
                            selectedMonth
                            ? skyBright1
                            : lightGreyDarkness
                        } // 막대의 색상을 정합니다.
                        rx={6}
                      />
                    </G>
                  );
                })}
              </G>
            </Svg>
          </ScrollView>
        </View>
      </View>
    );
  };

  const donutData = [];

  // 도넛 차트 컴포넌트
  const donutChart = () => {
    // const dountChartWidth = windowWidth * 0.8
    return (
      <View
        style={{
          width: "auto",
          borderWidth: 1,
          borderRadius: 20,
          borderColor: "grey",
          paddingHorizontal: 20,
          marginTop: 20,
        }}
      >
        <Text></Text>
        <Svg width={windowWidth * 0.5} height={windowHeight * 0.3}>
          <G></G>
        </Svg>
      </View>
    );
  };

  return (
    <View style={{ ...ChartStyle.mainContainer, backgroundColor: "white" }}>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView style={{ backgroundColor: "white" }}>
          {topBar()}
          <View style={{ ...ChartStyle.topChartArea }}>
            {totalAverageChart()}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Chart;
