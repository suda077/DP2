import {
    StyleSheet,
    Platform,
} from 'react-native';

export default StyleSheet.create({
    ic: {
        position: 'absolute',
        left: 10,
        width: 20,
        height: 20
    },
    country: {
        position: 'absolute',
        left: 10,
        color: 'silver'
    },
    vcode: {
        position: 'absolute',
        right: 10
    },
    textInput: {
        flex: 1,
        color: '#000',
        borderWidth: 0,
        borderBottomWidth: Platform.OS == 'ios' ? 1 : 0,
        padding: Platform.OS == 'ios' ? 5 : null,
        paddingLeft: 40
    },
    loginBtnAndroid: {
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
    }
})