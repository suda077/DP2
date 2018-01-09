import {
    StyleSheet,
    Platform
} from 'react-native';

export default StyleSheet.create({
    login: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        height: 60
    },
    groupTitle: {
        padding: 10,
        fontSize: 12,
        color: 'gray'
    },
    //弹出框样式
    content: {
        padding: 0,
        // backgroundColor: 'pink',
        borderRadius: 8,
    },
    popover: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
    },
    sex: {
        width: 15,
        height: 15,
    },
    avatar: { 
        marginRight: 10, 
        width: 50, 
        height: 50, 
        borderRadius: Platform.OS == 'ios' ? 25 : 50
     },
    avatarLeft: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    avatarLeftExtand: { 
        color: '#fff',
        fontWeight: '600', 
        marginRight: 2 
    },
    signature: { 
        color: '#fff', 
        fontSize: 12 
    },
    tool:{
        height: 22, 
        width: 22, 
        tintColor: '#fff'
    },
    loginText:{
        marginLeft: 10, 
        color: '#fff', 
        fontWeight: '900' 
    },
    logOut:{
        color: '#fff',
        fontWeight: '600', 
        // alignSelf:'center',
        fontSize:16,
        marginTop:8
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    },
    msg: {
        fontSize: 15,
        textAlign: 'center',
        padding: 5,
        backgroundColor: '#F5FCFF',
        borderRadius: 8,
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 20,
        borderRightWidth: 20,
        borderBottomWidth: 8,
        borderTopWidth: 8,
        borderLeftColor: '#F5FCFF',
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
    },
})