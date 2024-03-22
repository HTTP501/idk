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
import CheckBox from "expo-checkbox";
import * as d3 from "d3";
import Svg, { Ellipse, G, Rect, Text as SvgText } from "react-native-svg";
import { GestureDetector } from "react-native-gesture-handler";

const Chart = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  useEffect(() => {
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth() + 1;
    setSelectedMonth(nowMonth);
    setSelectedYear(nowYear);
    console.log(selectedMonth);
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

  const width = 640;
  const height = 400;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;
  const skyBright1 = "#7ECEFF";
  const lightGreyDarkness = "#EDEDED";
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
    .range([marginLeft + 20, width - marginRight]);

  // y축 (수직선) 축척 선언
  const y = d3
    .scaleLinear()
    .domain([0, 250])
    .range([height - marginBottom, marginTop]);

  const data = [
    { date: new Date("2023-04-01"), value: 30 },
    { date: new Date("2023-05-01"), value: 80 },
    { date: new Date("2023-06-01"), value: 100 },
    { date: new Date("2023-07-01"), value: 180 },
    { date: new Date("2023-08-01"), value: 90 },
    { date: new Date("2023-09-01"), value: 120 },
    { date: new Date("2023-10-01"), value: 150 },
    { date: new Date("2023-11-01"), value: 110 },
    { date: new Date("2023-12-01"), value: 120 },
    { date: new Date("2024-01-01"), value: 110 },
    { date: new Date("2024-02-01"), value: 130 },
    { date: new Date("2024-03-01"), value: 200 },
  ];

  const clickMonth = (dateData) => {
    console.log("hi");
  };

  const totalAverageChart = () => {
    return (
      // 평균보다 높으면 더 사용했고, 낮으면 적게 사용했다고 얘기해줘야함
      <View>
        <Text>평균보다 더 사용했어요.</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Svg height={height} width={width}>
            <G>
              {x.ticks().map((tick, index) => (
                <G key={index}>
                  <Ellipse
                    x={x(tick)}
                    y={height - marginBottom + 17}
                    rx={20}
                    ry={10}
                    fill={skyBright1}
                    onPress={() => clickMonth(d3.timeFormat("%y.%m")(tick))}
                  />
                  <SvgText
                    x={x(tick)}
                    y={height - marginBottom + 20}
                    fontSize="10"
                    textAnchor="middle"
                  >
                    {d3.timeFormat("%y.%m")(tick)}
                  </SvgText>
                </G>
              ))}
              {y.ticks().map((tick, index) => (
                <SvgText
                  key={index}
                  x={marginLeft - 10}
                  y={y(tick)}
                  fontSize="10"
                  textAnchor="end"
                >
                  {tick}
                </SvgText>
              ))}
              {data.map((d, index) => {
                const barWidth = 20; // 막대의 너비를 설정합니다. 실제 애플리케이션에서는 동적으로 계산할 수 있습니다.
                const barHeight = height - marginBottom - y(d.value); // 막대의 높이를 계산합니다.
                const barX = x(d.date) - barWidth / 2; // 막대의 x 위치를 계산합니다.
                const barY = y(d.value); // 막대의 y 위치를 계산합니다.

                return (
                  <G>
                    {d.date.getFullYear() == selectedYear &&
                    d.date.getMonth() + 1 == selectedMonth ? (
                      <SvgText x={barX} y={barY - 10} fill={skyBright1}>
                        {d.value}
                      </SvgText>
                    ) : null}
                    <Rect
                      key={index}
                      x={barX}
                      y={barY}
                      width={barWidth}
                      height={barHeight}
                      fill={
                        d.date.getFullYear() == selectedYear &&
                        d.date.getMonth() + 1 == selectedMonth
                          ? skyBright1
                          : "grey"
                      } // 막대의 색상을 정합니다.
                      rx={10}
                    />
                  </G>
                );
              })}
            </G>
          </Svg>
        </ScrollView>
      </View>
    );
  };

  return (
    <ScrollView style={{ ...ChartStyle.mainContainer }}>
      {topBar()}
      <View style={{ ...ChartStyle.topChartArea }}>{totalAverageChart()}</View>
    </ScrollView>
  );
};

export default Chart;
