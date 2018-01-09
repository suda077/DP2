import {
    StyleSheet,
    Platform
} from 'react-native';

export default StyleSheet.create({
    modalContainer: {
        backgroundColor: '#f3f3f4',
        marginTop: Platform.OS === 'ios' ? 20 : 10,
    },
    themeItems: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    getThemeItem: {
        margin: 10,
        paddingTop: 45,
        paddingBottom: 45,
        paddingLeft: 16,
        paddingRight: 16,
        flex: 1,
        backgroundColor: '#000',
        //IOS阴影
        shadowColor: '#c6c6c6',//阴影色
        shadowOffset: { width: 2, height: 2 },//阴影偏移
        shadowOpacity: 0.5,//阴影不透明度 (乘以颜色的alpha分量)
        shadowRadius: 1,//阴影模糊半径
        //android阴影
        elevation: 2
    },
    getThemeItemText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#fff',
        fontWeight: '500',
        alignContent: 'center'
    }
})