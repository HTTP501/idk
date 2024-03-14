import { Dimensions } from 'react-native';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

const theme = {
  "sky-basic": "#3FB7FF",
  "sky-bright-1": "#7ECEFF",
  "sky-bright-2": "#75CBFF",
  "sky-bright-3": "#91D5FF",
  "sky-bright-4": "#ACE0FF",
  "sky-bright-5": "#C8EAFF",
  "sky-bright-6": "#E3F4FF",
  "sky-darkness-1": "#369CDA",
  "sky-darkness-2": "#2D82B6",
  "light-grey": "#F6F6F6",
  "light-grey-darkness": "#EDEDED",
  'grey': "#C0C0C0",
  "black-bright-2": "#6B6B6B",
  "black-bright-1": "#363636",
  'black': "#1B1B1B",
  'red': "#FF0000",
  'success': "#22BB33",

  'bottomButton': {
    width: SCREEN_WIDTH*(9/10),
    height:50,
    backgroundColor: '#3FB7FF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // 위치를 절대로 설정
    bottom: 20, // 화면 하단과의 간격
    borderRadius: 10
  },
};
export default theme;
