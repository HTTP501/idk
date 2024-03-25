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

const Chart = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [nowData, setNowData] = useState([]);
  const [average, setAverage] = useState(0);
  const [nowAmount, setAmount] = useState(0);

  useEffect(() => {
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth() + 1;
    setSelectedMonth(nowMonth);
    setSelectedYear(nowYear);

    const data = [
      { date: new Date("2023-04-01"), amount: 30 },
      { date: new Date("2023-05-01"), amount: 80 },
      { date: new Date("2023-06-01"), amount: 100 },
      { date: new Date("2023-07-01"), amount: 180 },
      { date: new Date("2023-08-01"), amount: 90 },
      { date: new Date("2023-09-01"), amount: 120 },
      { date: new Date("2023-10-01"), amount: 150 },
      { date: new Date("2023-11-01"), amount: 110 },
      { date: new Date("2023-12-01"), amount: 120 },
      { date: new Date("2024-01-01"), amount: 110 },
      { date: new Date("2024-02-01"), amount: 130 },
      { date: new Date("2024-03-01"), amount: 200 },
    ];

    setNowData(data);

    const calculAverage = (data) => {
      let tmpSum = 0;
      data.forEach((each) => {
        // 평균을 내기 위해서 다 더함
        tmpSum += each.amount;

        // 접속한 달의 사용요금을 먼저 상태로 지정
        if (
          each.date.getFullYear() == selectedYear &&
          each.date.getMonth() + 1 == selectedMonth
        ) {
          setAmount(each.amount);
        }
      });
      // 1년 동안의 소비를 더해 평균값을 냄
      setAverage(Math.floor(tmpSum / 12));
    };

    calculAverage(data);
  }, []);

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
    .range([10, width]);

  // y축 (수직선) 축척 선언
  const y = d3
    .scaleLinear()
    .domain([0, 250])
    .range([height - marginBottom, marginTop]);

  const clickMonth = async (dateData) => {
    const foundData = await nowData.find((data) => {
      return (
        data.date.getFullYear() === dateData.getFullYear() &&
        data.date.getMonth() + 1 === dateData.getMonth() + 1
      );
    });

    if (foundData) {
      setAmount(foundData.amount);
    }

    setSelectedYear(dateData.getFullYear());
    setSelectedMonth(dateData.getMonth() + 1);
    console.log(average); // (있는 경우) 찾은 데이터를 기록합니다.
  };
  //   await nowData.forEach((data) => {
  //     if (
  //       data.date.getFullYear() == selectedYear &&
  //       data.date.getMonth() + 1 == selectedMonth
  //     ) {
  //       setAmount(data.amount);
  //     }
  //   });
  //   console.log(nowAmount);
  // };

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
        <View></View>
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
            <Svg height={height + 20} width={width}>
              <Line
                x1="10"
                y1={height + 20 - marginBottom - y(average)}
                x2={width - 25}
                y2={height + 20 - marginBottom - y(average)}
                stroke={skyBright1}
                strokeWidth="2"
                strokeDasharray="5, 5"
              />
              <SvgText
                x={width - 10}
                y={height + 20 - marginBottom - y(average) + 4}
                fontSize="13"
                textAnchor="middle"
                fill={skyBright1}
              >
                평균
              </SvgText>
              <G>
                <Rect
                  x={0}
                  y={height - marginBottom - 1}
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
                      y={height - marginBottom + 7}
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
                      y={height - marginBottom + 25}
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
                  const barHeight = height - marginBottom - y(d.amount); // 막대의 높이를 계산합니다.
                  const barX = x(d.date) - barWidth / 2; // 막대의 x 위치를 계산합니다.
                  const barY = y(d.amount); // 막대의 y 위치를 계산합니다.

                  return (
                    <G key={index}>
                      {d.date.getFullYear() == selectedYear &&
                      d.date.getMonth() + 1 == selectedMonth ? (
                        <SvgText
                          x={barX + 12}
                          y={barY - 30}
                          fill={skyBright1}
                          textAnchor="middle"
                        >
                          {d.amount}
                        </SvgText>
                      ) : null}
                      <Rect
                        x={barX}
                        y={barY - 20}
                        width={barWidth}
                        height={barHeight}
                        fill={
                          d.date.getFullYear() == selectedYear &&
                          d.date.getMonth() + 1 == selectedMonth
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

  return (
    <ScrollView
      style={{ ...ChartStyle.mainContainer, backgroundColor: "white" }}
    >
      {topBar()}
      <View style={{ ...ChartStyle.topChartArea }}>{totalAverageChart()}</View>
    </ScrollView>
  );
};

export default Chart;
