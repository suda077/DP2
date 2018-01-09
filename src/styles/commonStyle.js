/**
 * 全局样式
 * @flow
 */
import {
    Dimensions,
    StyleSheet
} from 'react-native'
const { height, width } = Dimensions.get('window');//获取手机端宽高
module.exports = {
    line: {
        height: 0.8,
        opacity: 0.5,
        backgroundColor: 'darkgray',
    },
    font_size:{
        fontSize: 15
    },
    font_size_bg: {
        fontSize: 20
    },
    flex_one:{
        flex:1
    },
    flex_row:{
        flexDirection: 'row'
    },
    align_items_center:{
        alignItems:'center'
    },
    justify_content_center:{
        justifyContent: 'center'
    },
    justify_content_flexEnd: {
        justifyContent: 'flex-end'
    },
    text_algin_center:{
        textAlign:'center'
    },
    absolute: { 
        position: 'absolute', 
        left: 0, 
        top: 0 
    },
    root_container: {
        flex: 1,
        backgroundColor: '#f3f3f4',
    },
    font_color:{
        color:'#fff'
    },
    backgroundColor: '#f3f3f4',
    btn_disabled_true:{
        backgroundColor:'#B0B3BC',
    },
    btn_disabled_false: {
        backgroundColor: '#409EF6',
    },
    vcode_true:{
        color:'#2196F3'
    },
    vcode_false:{
        color:'#B0B3BC'
    },
    nav_bar_height_ios: 44,
    nav_bar_height_android: 50,
    window_height: height,
    shadow: {
        shadowColor: 'silver',
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {
            height: 5,
        },
        elevation: 4,
    },
    text_container: {
        flexDirection: 'row',
        margin: 15,
        alignItems: 'center'
    },
};