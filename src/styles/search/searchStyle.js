import {
    StyleSheet,
    Platform
} from 'react-native'
import {
    STATUS_BAR_HEIGHT,
    APPBAR_HEIGHT,
} from '../../scripts/utils/ConstUtils'

export default StyleSheet.create({
    container: {
        backgroundColor: 'skyblue',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        /* 状态栏 */
        height:  APPBAR_HEIGHT,
        /* END 状态栏 */
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        color: '#fff',
        borderWidth: 0,
        borderBottomWidth: Platform.OS == 'ios' ? 1 : 0,
        padding: Platform.OS == 'ios' ? 5 : null,
        borderColor: '#f3f4f4',
        fontSize: 15
    },
    search: {
        marginRight: 10,
        color: '#fff'
    },
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0
    },
    Extend: {
        paddingLeft: 20,
        flexDirection: 'row',
    },
    fork: {
        width: 40,
        height: 30,
        // backgroundColor:'green',
        paddingLeft: 12,
        paddingTop: 6
    },
    clearHistory: {
        color: '#2196F3',
        textAlign: 'center',
        paddingTop:10
    },
    markColor:{
        color:'red'
    },
    searchHistory: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
    },
    searchContent: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
    },
    searchContentExtend:{
        paddingTop: 10, 
        paddingBottom: 10,
        flexDirection:'row'
    },
    searchContentExtendd: {
        padding:15
    },
    searchNull: { 
        alignSelf: 'center', 
        flex: 1 
    },
    searchNullExtend:{
        paddingTop: 200
    },
    fork: { 
        height: 15, 
        width: 15 
    }
})