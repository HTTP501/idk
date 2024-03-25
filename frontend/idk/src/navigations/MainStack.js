import * as React from 'react';
import Main from '../screens/Main/Main'
import { CheckSendMoneyInfo, EnterAccount, FinishSendMoney,EnterMoney } from '../screens/Main/SendMoney';
import { AgreeMyData, CheckMyData, LinkMyData, OutSidePage } from '../screens/Main/MyData/index'
import { RegistAutoSendContent,RegistAutoSendFinish,RegistGoalSaving, RegistAutoSendAgree, RegistSubscribe,RegistSavingBox } from '../screens/Main/Registrations';
import TransactionList from '../screens/Main/DetailMyaccount/TransactionList';
import { DetailPocket, DetailPocketSetting, DetailSavingBox, MinusSavingBox, DetailGoalSaving } from '../screens/Main/DetailPocket'
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo

const Stack = createNativeStackNavigator();

function MainStack({ navigation }) {
  const renderBackButton = (color) => {
    return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back" size={24} color={color} />
    </TouchableOpacity>
    ) 
  }

  const appendMydata = () => {
    return (
    <TouchableOpacity onPress={() => navigation.navigate('AgreeMyData')}>
      <Text className='text-base'>추가</Text>
    </TouchableOpacity>
    )
  }

  return (
      <Stack.Navigator screenOptions={{headerTransparent: true,}}>
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="EnterAccount" component={EnterAccount} options={{ headerShown: true, title:"" }} />
        <Stack.Screen name="EnterMoney" component={EnterMoney} options={{ headerShown: true, title:"" }} />
        <Stack.Screen name="CheckSendMoneyInfo" component={CheckSendMoneyInfo} options={{ headerShown: true, title:"" }} />
        <Stack.Screen name="FinishSendMoney" component={FinishSendMoney} options={{ headerShown: false }} />
        <Stack.Screen name="TransactionList" component={TransactionList} options={{ headerShown: false }} />
        <Stack.Screen name="RegistGoalSaving" component={RegistGoalSaving} options={{  headerShown: true, title:"" }} />
        <Stack.Screen name="RegistSubscribe" component={RegistSubscribe} options={{  headerShown: true, title:"" }} />
        <Stack.Screen name="RegistSavingBox" component={RegistSavingBox} options={{  headerShown: true, title:"" }} />
        <Stack.Screen name="AgreeMyData" component={AgreeMyData} options={{ headerShown: false }} />
        <Stack.Screen name="CheckMyData" component={CheckMyData} options={{ headerLeft: () => renderBackButton('black'), title: '마이데이터 조회', headerRight: () => appendMydata() }} />
        <Stack.Screen name="LinkMyData" component={LinkMyData } options={{ headerShown: false }} />
        <Stack.Screen name="OutSidePage" component={OutSidePage } options={{ headerShown: false }} />
        <Stack.Screen name="RegistAutoSendAgree" component={RegistAutoSendAgree} options={{ headerShown: true, title:"" }} />
        <Stack.Screen name="RegistAutoSendContent" component={RegistAutoSendContent} options={{ headerShown: true, title:"" }} />
        <Stack.Screen name="RegistAutoSendFinish" component={RegistAutoSendFinish} options={{ headerShown: true, title:"" }} />
        <Stack.Screen name="DetailPocket" component={DetailPocket} options={{ headerShown: false }} />
        <Stack.Screen name="DetailPocketSetting" component={DetailPocketSetting} options={{ headerLeft: () => renderBackButton('black'), title: '설정'}} />
        <Stack.Screen name="DetailSavingBox" component={DetailSavingBox} options={{ headerShown: false }} />
        <Stack.Screen name="DetailGoalSaving" component={DetailGoalSaving} options={{ headerShown: false }} />
        <Stack.Screen name="MinusSavingBox" component={MinusSavingBox} options={{ headerShown: false}} />
      </Stack.Navigator>
  );
}

export default MainStack;