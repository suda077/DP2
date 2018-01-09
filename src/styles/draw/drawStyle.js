import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

export default StyleSheet.create({
    container: {
        padding: 10
    },
    ssContainer:{
        flexDirection: 'row', 
        alignItems: 'center'
    },
    fontWeight:{
        fontWeight: '600'
    },
    img1: {
        width: 110,
        height: 60,
        borderRadius: 10
    },
    img2: { 
        alignSelf: 'center', 
        marginTop: 10 
    },
    drawShadow:{
        backgroundColor: '#000', 
        zIndex: 100, 
        opacity: 0.2
    },
    title: {
        alignItems: 'center',
        // backgroundColor:'silver',
        borderWidth: 0.3,
        borderRadius: 8,
        padding: 5,
        margin: 10,
        //IOS阴影
        shadowColor: '#c6c6c6',//阴影色
        shadowOffset: { width: 0.5, height: 0.5 },//阴影偏移
        shadowOpacity: 0.5,//阴影不透明度 (乘以颜色的alpha分量)
        shadowRadius: 1,//阴影模糊半径
        //android阴影
        elevation: 2
    },
    showImg: {
        flexDirection: 'row',
        flexWrap: 'wrap',//超过视图自动换行
        width: 355,
        alignSelf: 'center'
    },
    showImgOne:{
        justifyContent:'center',
        marginTop:Platform.OS==='android'?20:50,
    },
    showImgEleven: {
        justifyContent: 'flex-start'
    },
    clear: {
        padding: 8,
        borderRadius: 10,
        backgroundColor: 'silver'
    },
    chance: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 5
    },
    img:{
        position: 'absolute',
        left: 0,
        top: 0,
        
    },
    imgOne: { 
        width: 100, 
        height: 150 
    },
    imgOneFrontLoading:{
        width: 75,
        height: 75,
        // marginTop:-150
    },
    imgOneBack: {
        /* 执行动画时网络图片宽高不能定义会报错 */
        opacity:0,
        width: 100,
        height: 150, 
    },
    imgEleven: {
        width: 50,
        height: 75
    },
    imgElevenFrontLoading: {
        width: 30,
        height: 30,
    },
    imgElevenBack: {
        opacity:0,
        width: 50,
        height: 75,
    },
    draw:{
        flexDirection: 'row', 
        justifyContent: 'space-around' 
    },
    showDraw:{
        opacity:1
    },
    hideDraw:{
        opacity: 0
    }
})