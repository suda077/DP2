import {
    StyleSheet,
} from 'react-native';
export default StyleSheet.create({
    cardCeil:{
        height: 85,
        zIndex:10,
        overflow:'hidden',//未显示的列表页隐藏
    },
    container: {
        backgroundColor: '#e9e9ef',
        flexDirection: 'row',
        /* 动画效果 */
        // paddingTop:5,
        // paddingBottom: 5,
        /* 非动画效果 */
        padding: 5
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8,
    },
    dev: {
        backgroundColor: '#F5FCFF',
        borderWidth: 0.3,
        borderRadius: 5,
        padding: 2,
        flex: 1,
        margin: 2,
        textAlign: 'center'
        // color:'#fff'
    },
    mar: {
        marginLeft: 10
    },
    img:{
        width: 50,
        height: 75
    },
    tiaozhuan: { 
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    num: { 
        flexDirection: 'row', 
        justifyContent: 'space-between' 
    }
})