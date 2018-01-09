import { StyleSheet,Platform } from "react-native";
export default StyleSheet.create({
    // statusBar: {
    //     height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0
    // },
    container: {
        shadowColor: 'silver',
        shadowOpacity: 0.8,
        shadowRadius: 4,
        shadowOffset: {
            height: 10,
        },
        elevation: 10,
        backgroundColor: "#2196F3",

        marginLeft: 20,
        marginRight: 20,
        padding: Platform.OS === 'android' ? 0 : 3,
        borderRadius: 5

    },
    // title: {
    //     paddingTop: STATUSBAR_HEIGHT,
    //     height: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
    //     backgroundColor: '#000',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    con: {
        margin: 10
        // backgroundColor: 'red'
    },
    choiceItems: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 10
    },
    item: {
        marginLeft: 10,
        marginTop: 6,
        borderRadius: 10,
        padding: 6,
        // borderWidth: 0.2,
        shadowColor: 'silver',
        shadowOpacity: 0.8,
        shadowRadius: 4,
        shadowOffset: {
            height: 4,
        },
        elevation: 5,
    },
    choiceColor: {
        backgroundColor: '#008000',
    },
    choiceNoColor: {
        backgroundColor: '#F5FCFF',

    },
    choiceFontColor:{
        color: '#fff'
    },
    choiceNoFontColor: {
        color: '#85898b'
    },
    choiceImg:{
        width: 25, 
        height: 25, 
        marginRight: 10
    }
})