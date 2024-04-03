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
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import theme from "../../style";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import * as d3 from "d3";
import Svg, {
  Ellipse,
  Circle,
  G,
  Rect,
  Line,
  Path,
  Text as SvgText,
} from "react-native-svg";
import { Timeline, Tween, Back } from "gsap-rn";
import {
  callAnalystDataAxios,
  callAnalystMonthDataAxios,
} from "../../API/ChartData.js";
import ChartLoading from "../../components/ChartLoading.js";
import { useFocusEffect } from "@react-navigation/native";

const Chart = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDonutLoading, setIsDonutLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [nowData, setNowData] = useState(null);
  const [nowDonutData, setNowDonutData] = useState(null);
  const [average, setAverage] = useState(null);
  const [nowAmount, setAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [nowCategory, setNowCategory] = useState("total");
  const [callOver, setCallOver] = useState(false);
  const [chartOver, setChartOver] = useState(false);
  // 화면 사이즈 인식
  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

  // 시작하자마자 이번달 정보를 보여주기 위해 스크롤 참조
  const myScrollViewRef = useRef();

  useEffect(() => {
    if (myScrollViewRef.current !== undefined) {
      myScrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [myScrollViewRef.current]);

  // 모든 상태가 세팅이 되면 로딩 해제 및 스크롤이동
  useEffect(() => {
    if (callOver === true) {
      setIsLoading(false);
    }
  }, [callOver]);

  // 맨 처음 들어왔을때, 데이터 호출
  useEffect(() => {
    // 바 차트 데이터호출
    const getResponse = (response) => {
      setNowData(response.data.data.amountList);
    };
    const fail = (error) => {
      console.log(error);
    };
    callAnalystDataAxios("total", getResponse, fail);

    // 도넛 차트 데이터 호출
    const getMonthDataResponse = (response) => {
      setNowDonutData(response.data.data);
    };

    const requestYear = new Date().getFullYear();
    const requestMonth = new Date().getMonth() + 1;

    callAnalystMonthDataAxios(
      requestYear,
      requestMonth,
      getMonthDataResponse,
      fail
    );
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

  // 현재 달 or 월이 바뀌었을때 콜백할 함수
  useEffect(() => {
    if (selectedMonth != null && selectedYear != null) {
      const getMonthDataResponse = (response) => {
        setNowDonutData(response.data.data);
      };
      const fail = (error) => {
        console.log(error);
      };

      callAnalystMonthDataAxios(
        selectedYear,
        selectedMonth,
        getMonthDataResponse,
        fail
      );
    }
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    if (nowDonutData !== null) {
      setIsDonutLoading(false);
    }
  }, [nowDonutData]);

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
          if (
            each.year === new Date().getFullYear() &&
            each.month === new Date().getMonth() + 1
          ) {
          } else {
            tmpSum += Math.floor(each.amount / 10000);
          }

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
      width: windowWidth * 0.8,
      alignSelf: "center",
    },
    topBarStyle: {
      flex: 1,
      alignItems: "center",
      marginTop: windowWidth * 0.08,
    },
    titlefont: {
      fontWeight: "bold",
      fontSize: 30,
      marginTop: 20,
      marginLeft: 20,
      textAlign: "center",
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
        <Text style={{ ...ChartStyle.titlefont }}>통계</Text>
      </View>
    );
  };

  const width = 700;
  const height = 400;
  const marginBottom = 30;
  const skyBright1 = "#7ECEFF";
  const lightGreyDarkness = "#C0C0C0";
  const lightGrey = "#ededed";
  const now = new Date();
  const oneYearAgo = new Date(
    now.getFullYear() - 1,
    now.getMonth() - 1,
    now.getDate()
  );

  // x축 (수평선) 축척 선언
  const x = d3
    .scaleUtc()
    // 현재로부터 1년까지 범위로 정함
    .domain([oneYearAgo, now])
    .range([0, width]);

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
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ref={myScrollViewRef}
          >
            <Svg height={height + 50} width={width * 1.1} id="barChart">
              <Line
                x1="10"
                y1={y(average)}
                x2={width * 1.05}
                y2={y(average)}
                stroke={skyBright1}
                strokeWidth="2"
                strokeDasharray="5, 5"
              />
              <SvgText
                x={width * 1.08}
                y={y(average) + 4}
                fontSize="13"
                textAnchor="middle"
                fill={skyBright1}
              >
                평균
              </SvgText>
              <G>
                <Rect
                  x={20}
                  y={height}
                  width={width * 1.01}
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
                      {d3.timeFormat("%Y")(tick) === String(now.getFullYear())
                        ? `${parseInt(d3.timeFormat("%m")(tick), 10)}월`
                        : d3.timeFormat("%y.%m")(tick)}
                    </SvgText>
                  </G>
                ))}
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

  // 도넛 차트 컴포넌트
  const donutChart = (target, targetData, targetTotal) => {
    const formattedNumber = function (number) {
      return number.toLocaleString("ko-KR", { maximumFractionDigits: 0 });
    };

    const titleMatch = {
      fixedAmount: "고정 지출",
      saveAmount: "목표 저축",
      commonAmount: "일반 지출",
      piggyAmount: "저금통",
      foodAmount: "식품",
      electronicAmount: "전자제품",
      clothesAmount: "의류",
      etcAmount: "기타",
      beautyAmount: "뷰티",
    };

    const entries = Object.entries(targetData);

    entries.sort((a, b) => a[1] - b[1]);

    const sortedKeys = entries.map((entry) => entry[0]).reverse();
    const sortedValues = entries.map((entry) => entry[1]).reverse();
    const totalPrice = formattedNumber(targetTotal);

    const radius = 100;
    const donutColor = ["#3FB7FF", "#369CDA", "#2D82B6", "#C0C0C0", "#EDEDED"];

    const pieChart = d3.pie().value((d) => d)(sortedValues);

    const usedAverage = sortedValues.map((amount, index) => {
      return Math.round((amount / targetTotal) * 100);
    });

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
        <Text
          style={{
            marginTop: 15,
            fontSize: 15,
            marginBottom: 15,
            fontWeight: "bold",
          }}
        >
          {target}
          {"    "}
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            {totalPrice}원
          </Text>
        </Text>
        <Svg width={"100%"} height={windowHeight * 0.6}>
          <G translate={`${windowWidth * 0.3}, ${windowHeight * 0.15}`}>
            {pieChart.map((piece, index) => {
              const arcGenerator = d3
                .arc()
                .innerRadius(radius - 60)
                .outerRadius(radius - index * 6)
                .padAngle(0.05)
                .cornerRadius(5);

              const path = arcGenerator(piece);

              return <Path key={index} d={path} fill={donutColor[index]} />;
            })}
            {/* {pieChart.map((piece, index) => {
              const labelPosition = arcGenerator.centroid(piece);
              return (
                <SvgText
                  key={`text-${index}`}
                  x={labelPosition[0]}
                  y={labelPosition[1]}
                  fill="white"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fontSize={15}
                >
                  {piece.value}
                </SvgText>
              );
            })} */}
            <Circle
              cx={windowWidth * 0.25}
              cy={windowHeight * 0.05}
              r="40"
              fill={donutColor[0]}
            />

            <Circle
              cx={windowWidth * 0.25}
              cy={windowHeight * 0.05}
              r="35"
              fill="white"
            />

            <SvgText
              x={windowWidth * 0.25}
              y={windowHeight * 0.05}
              textAnchor="middle"
              fontSize="15"
              fontWeight="bold"
            >
              {titleMatch[sortedKeys[0]]}
            </SvgText>
            <SvgText
              x={windowWidth * 0.24}
              y={windowHeight * 0.07}
              textAnchor="middle"
              fontSize="15"
              fontWeight="bold"
            >
              {usedAverage[0]}%
            </SvgText>
          </G>
          {/* {sortedKeys.forEach((each, index) => {
              <Rect
                x={windowWidth * 0.05}
                y={windowHeight * (0.35 + index * 0.03)}
              />
              <SvgText x="0" y="0">
                {"Hi"}
              </SvgText>
          })} */}
          {sortedKeys.map((each, index) => (
            <React.Fragment key={each}>
              <Rect
                x={windowWidth * 0.01}
                y={windowHeight * (0.34 + index * 0.05)}
                width="15"
                height="15"
                rx="2"
                ry="2"
                fill={donutColor[index]}
              />
              <SvgText
                x={windowWidth * 0.2}
                y={windowHeight * (0.35 + index * 0.05)}
                fill="black"
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize="15"
              >
                {titleMatch[each]}
              </SvgText>
              <SvgText
                x={windowWidth * 0.38}
                y={windowHeight * (0.35 + index * 0.05)}
                fill="black"
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize="15"
              >
                {usedAverage[index]}%
              </SvgText>
              <SvgText
                x={windowWidth * 0.5}
                y={windowHeight * (0.35 + index * 0.05)}
                fill="black"
                alignmentBaseline="middle"
                fontSize="17"
                fontWeight="bold"
              >
                {formattedNumber(sortedValues[index]).trim()}원
              </SvgText>
            </React.Fragment>
          ))}
        </Svg>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ ...ChartStyle.mainContainer, backgroundColor: "white" }}>
        {isLoading ? (
          <ChartLoading />
        ) : (
          <ScrollView
            style={{ backgroundColor: "white" }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {topBar()}
            <View style={{ ...ChartStyle.topChartArea }}>
              {totalAverageChart()}
            </View>
            <View>
              <Text style={{ fontSize: 25, fontWeight: "bold", marginTop: 20 }}>
                {selectedYear}년 {selectedMonth}월 지출
              </Text>
            </View>
            <View>
              {/* 현재 진행 중인 지출은 출력하지 않는다고 안내 */}
              {new Date().getFullYear() == selectedYear &&
              new Date().getMonth() + 1 == selectedMonth ? (
                <View
                  style={{
                    width: "auto",
                    height: windowHeight * 0.3,
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: "grey",
                    paddingHorizontal: 20,
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                      marginBottom: 20,
                    }}
                  >
                    {" "}
                    이번 달 지출을 집계중이에요!{" "}
                  </Text>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    {" "}
                    이번 달 지출 통계는 다음달에 보실 수 있어요!{" "}
                  </Text>
                </View>
              ) : isDonutLoading ? (
                <ActivityIndicator
                  size={"large"}
                  color={theme["sky-basic"]}
                  style={{ marginVertical: 25 }}
                />
              ) : (
                <View>
                  {donutChart(
                    "총 지출",
                    nowDonutData.totalAmountBreakdown,
                    nowDonutData.totalAmount
                  )}
                </View>
              )}
            </View>
            <View style={{ marginBottom: 40 }}>
              {new Date().getFullYear() == selectedYear &&
              new Date().getMonth() + 1 ==
                selectedMonth ? null : isDonutLoading ? (
                <ActivityIndicator
                  size={"large"}
                  color={theme["sky-basic"]}
                  style={{ marginVertical: 25 }}
                />
              ) : (
                <View>
                  {donutChart(
                    "일반 지출",
                    nowDonutData.totalCommonAmountBreakdown,
                    nowDonutData.totalCommonAmount
                  )}
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Chart;
