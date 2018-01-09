import {
    StyleSheet,
} from 'react-native';
export default StyleSheet.create({
    common:{
        margin:5
    },
    container: {
        flexDirection: 'row',
        padding: 5
    },
    img: {
        width: 74,
        height: 111,
        marginRight: 5
    },
    discription: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#A3946F',
        backgroundColor: 'silver'
    },
    discriptionTitle: { 
        flex: 1, 
        justifyContent: 'space-between' 
    },
    discriptionContent:{
        flexDirection: 'row', 
        margin: 5 
    },
    key: {
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
        padding: 2
    },
    val: {
        flex: 4,
        padding: 2,
        backgroundColor: '#F5FCFF'
    },
    nkey: {
        backgroundColor: '#F4E6BE',
        textAlign: 'center',
        borderWidth: 0.5,
        // height:18,
    },
    nval: {
        textAlign: 'center',
        borderWidth: 0.5,
        backgroundColor: '#F5FCFF'
    }
})