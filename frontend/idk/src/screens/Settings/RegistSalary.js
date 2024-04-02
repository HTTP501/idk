import React, { useEffect, useRef, useState } from "react";
import {
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ScrollView,
    Modal,
} from "react-native";
import theme from "../../style";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
import formattedNumber from "../../components/moneyFormatter";
import { Alert } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAccountAxios, settingSalaryAxios, getSalaryAxios, changeSalaryAxios, deleteSalaryAxios } from "../../API/Account";

const RegistSalary = ({ navigation, route }) => {
    let [companyName, setCompanyName] = useState("");
    let [salaryDay, setSalaryDay] = useState(15);
    let [amount, setAmount] = useState("");
    let [showModal, setShowModal] = useState(0);
    let [accountId, setAccountId] = useState("");
    let [salaryId, setSalaryId] = useState(null);
    let [type,setType] = useState("post")
    const ACCOUNT_KEY = "@account";
    useEffect(() => {
        getAccountId()
    }, [])

    //   계좌 조회 (asyncstorage 없으면 계좌 조회)
    const getAccountId = async () => {
        // console.log(AsyncStorage.getItem(ACCOUNT_KEY))
        setAccountId(await AsyncStorage.getItem(ACCOUNT_KEY)?.accountId)
        if (accountId === undefined || accountId === "") {
            getAccountAxios(res => {
                setAccountId(res.data.data.accountId)
                getSalaryData(res.data.data.accountId)
            }, err => console.log(err))
        }

    }
    // 월급 데이터 조회
    const getSalaryData = async (data) => {
        getSalaryAxios(data, res => {
            if (res.data.code === "SLR002") {
                setType("put")
                setSalaryId(res.data.data.salaryId)
            }
            console.log(res.data.data)
        }, err => {
            console.log(err)
        
        })
    }
    // 이체 날짜 정하기
    const changesalaryDay = function (text) {
        if (text.length === 0) {
            setSalaryDay("");
        } else {
            const number = Number(text.replace(/[^0-9]/g, ""));
            if (number < 1 || number > 25) {
                Alert.alert("이체 날짜는 1일부터 25일 사이로 설정해주세요", "", [
                    { text: "확인" },
                ]);
                setSalaryDay("");
            } else {
                setSalaryDay(String(number));
            }
        }
    };
    // 월급 정하기
    const changeamount = (text) => {
        if (text.length === 0) {
            setAmount("");
        } else {
            const number = Number(text.replace(/[^0-9]/g, ""));
            if (number > 10000) {
                Alert.alert("1억 이상의 월급을 받을 수 없어요.", "", [
                    { text: "확인" },
                ]);
                setAmount(10000);
            } else {
                setAmount(number);
            }
        }
    };
    // 등록/수정 완료 보내기
    const registFinish = async () => {
        setShowModal(true);
        const data = {
            accountId,
            companyName,
            salaryDay,
            amount: amount * 10000,
        };
        if (type === "post") {
            settingSalaryAxios(data, res => {
                console.log(res.data.message)
            }, err => {
                console.log(err)
            })
            
        }
        else {
            
            changeSalaryAxios(salaryId,data
                , res => {
                console.log(res.data.message)
            }, err => {
                console.log(err)
            })
            
        }
    }
    // 월급 삭제
    const deletSalary = async () => {
        Alert.alert("월급을 삭제하시겠습니까?", "", [{
            "text": "확인", onPress: () => {
                // 월급 삭제
                deleteSalaryAxios(salaryId, res => {
                    console.log(res.data.message)
                    Alert.alert("월급을 삭제하였습니다", "", [{
                        "text": "설정으로 가기", onPress: () => {
                            navigation.navigate("Settings")
                        }
                    },
                    ])
                }, err => {
                    console.log(err)
                })
            }
        },
        ])
    }


return (
    <View style={styles.container}>
        <View style={styles.box} className="mb-16">
            <Text className="text-3xl font-bold">월급 등록</Text>
        </View>
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            {/* 목표 저축 이름 */}
            <View style={styles.box}>
                <Text className="text-lg font-bold">회사를 적어주세요</Text>
                <TextInput
                    style={styles.input}
                    className="text-lg"
                    value={companyName}
                    onChangeText={(text) => setCompanyName(text)}
                    placeholder="ex) 삼성"
                />
            </View>
            {/* 이체 날짜 */}
            <View style={styles.box}>
                <Text className="text-lg font-bold">월급일</Text>
                <TextInput
                    style={styles.input}
                    className="text-lg"
                    value={String(salaryDay)}
                    keyboardType="numeric"
                    onChangeText={(text) => changesalaryDay(text)}
                    placeholder="ex) 15일"
                />
            </View>
            <View style={styles.box}>
                <Text className="text-lg font-bold">월급</Text>
                <View className="flex-row justify-end" style={styles.input}>

                    <TextInput
                        className="text-lg mr-3"
                        value={formattedNumber(amount)}
                        keyboardType="numeric"
                        onChangeText={(text) => changeamount(text)}
                        placeholder="ex) 350"
                    />
                    <Text className="text-lg font-bold">만원</Text>
                </View>
            </View>

            {/* 모달 */}
            <Modal visible={showModal} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            className="self-end"
                            onPress={() => {
                                setShowModal(false);
                            }}
                        >
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                        <Text className="text-2xl font-bold mb-8">
                            월급을 등록했어요!
                        </Text>
                        <Text className="text-zinc-500 text-lg font-bold mb-4">
                            회사명 : {companyName}
                        </Text>
                        <Text className="text-zinc-500 text-lg font-bold mb-12">
                            월급 : {formattedNumber(amount)}만원
                        </Text>
                        <TouchableOpacity
                            style={styles.modalButton2}
                            onPress={() => {
                                setShowModal(false);
                                navigation.navigate("Settings");
                            }}
                        >
                            <Text className="text-lg font-bold">설정으로 돌아 가기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
        {/* 월급이 존재할때만 보이기 */}
        {salaryId!==null ?
        <TouchableOpacity onPress={deletSalary} style={{width:SCREEN_WIDTH*(4/5)}} className="pb-10 items-end" 
        >
            <Text className="text-gray-300 text-lg font-bold">월급 삭제하기</Text>
        </TouchableOpacity>
        :null}
        <TouchableOpacity style={[styles.button, { opacity: (companyName.length > 0 && amount > 0) ? 1 : 0.5 }]} onPress={registFinish}
            disabled={!(companyName.length > 0 && amount > 0)}
        >
            <Text className="text-white text-lg font-bold">등록하기</Text>
        </TouchableOpacity>
    </View>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        paddingTop: 120,
    },
    box: {
        width: SCREEN_WIDTH * (8 / 10),
        marginBottom: 30,
    },
    input: {
        borderBottomWidth: 1,
        width: "100%",
        // height: 40,
        paddingBottom: 5,
        alignSelf: "center",
        marginTop: 10,
        borderColor: theme.grey,
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
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: theme["sky-basic"],
        width: 350,
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 350,
        marginTop: 20,
    },
    modalButton1: {
        width: 290,
        height: 60,
        backgroundColor: theme["sky-bright-6"],
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 10,
    },
    modalButton2: {
        width: 290,
        height: 60,
        backgroundColor: theme["sky-bright-2"],
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
});

export default RegistSalary;
