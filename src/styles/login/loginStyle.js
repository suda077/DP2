import {
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native';
import { STATUS_BAR_HEIGHT } from "../../scripts/utils/ConstUtils";

export default StyleSheet.create({
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
        backgroundColor: '#000'
    },
    loginPic: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems:'center',
        backgroundColor: '#000',
    },
    loginPicHei:{
        width: 150, 
        height: 150
    },
    ic: {
        position: 'absolute',
        left: 10,
        width: 20,
        height: 20
    },
    
    textInput: {
        flex: 1,
        color: '#000',
        borderWidth: 0,
        borderBottomWidth: Platform.OS == 'ios' ? 1 : 0,
        padding: Platform.OS == 'ios' ? 5 : null,
        paddingLeft: 40,
        // margin:5
    },
    loginBtnAndroid: {
        // borderWidth:1,
        borderRadius: 20,
        margin: 30,
        padding: 15,
        textAlign: 'center',
        color: '#fff',
        fontSize: 16
    },
    loginBtnIos: {
        borderRadius: 20,
        margin: 30,
        padding: 5,
    },
    them: {
        margin: 20
    },
    shadow: {
        backgroundColor: '#000',
        position: 'absolute',
        zIndex: 10000,
        opacity: 0.5,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pad:{
        padding:15
    },
    forgetPwd:{
        position: 'absolute',
        right: 10
    },
    forgetPwdColor:{
        color:'#2196F3'
    },
    otherLoginLine: { 
        color: '#D5D5D5', 
        fontSize: 12, 
        textAlign: 'center' 
    },
    otherLogin: { 
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    qq:{
        width: 25,
        height: 25
    },
    wechat:{
        width: 32,
        height: 25
    },
    sina:{
        width: 27,
        height: 27
    }
})


