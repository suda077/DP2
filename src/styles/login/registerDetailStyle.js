import {
    StyleSheet,
    Platform,
} from 'react-native';

export default StyleSheet.create({
    img: {
        borderRadius: 50,
        width: 100,
        height: 100,
        margin: 20
    },
    imgF: {
        borderColor: '#cdcdcd',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF'
    },
    imgT: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    add: {
        width: 30,
        height: 30,
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
    },
    textArea: {
        flexDirection: 'row',
        margin: 15,
        alignItems: 'flex-start',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#cdcdcd',
        backgroundColor: '#F5FCFF',
        padding: 5,
    },
    textSign: {
        fontSize: 15,
        flex: 1,
        backgroundColor: '#F5FCFF',
        borderRadius: 10,
        padding: 5,
    },
    btnAndroid: {
        borderRadius: 20,
        margin: 30,
        padding: 15,
        textAlign: 'center',
        color: '#F5FCFF',
        fontSize: 16
    },
    btnIos: {
        borderRadius: 20,
        margin: 30,
        padding: 5,
    },
    radio: {
        // borderWidth: 1,
        borderRadius: 50,
        borderColor: '#cdcdcd',
        width: 15,
        height: 15,
        // marginLeft: 5
    },
    radioExtend:{
        borderWidth: 1, 
        backgroundColor: '#F5FCFF'
    },
    sexImg: {
        width: 15,
        height: 15,
    },
    bgColor:{
        backgroundColor: '#e9e9ef'
    },
    icSex:{
        width: 20, 
        height: 20,
        marginLeft: 10
    },
    gender:{
        marginLeft: 15, 
        paddingRight: 5
    }
})