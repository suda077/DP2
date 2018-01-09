import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
export default StyleSheet.create({
    loading: {
        // backgroundColor: 'red',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
    },
    container: {
        backgroundColor: '#e9e9ef',
        // backgroundColor: 'red',
        flex: 1,
        height: Dimensions.get('window').height - 120,
        // height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    showChoice: {
        padding: 10,
        backgroundColor: 'red',
        display: null
    },
    cancel: {
         color: '#fff', 
         textAlign: 'center' 
    },
    imgEmpty: { 
        width: 30, 
        height: 30 
    },
    searchEmpty: { 
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: 1 ,
        backgroundColor: '#e9e9ef'
    },
    icChoice: { 
        width: 25, 
        height: 25 
    },
    isLoadingTrue:{
        opacity:0,
        zIndex:0
    },
    isLoadingFalse:{
        opacity: 1,
        zIndex: 10,
        margin:0,
        paddingBottom:Platform.OS==='android'?60:65//flatlist被View包裹之后下方偏移量
    },
    footer: {
        flexDirection: 'row',
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    footerOne:{
        height: 30, 
        alignItems: 'center', 
        justifyContent: 'flex-start',
    },
    footNone: { 
        color: '#999999', 
        fontSize: 14, 
        marginTop: 5, 
        marginBottom: 5, 
    }
})