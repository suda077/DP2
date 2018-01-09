import { 
    StyleSheet,
    Dimensions,
    Platform
} from "react-native";

const window = Dimensions.get('window');
const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 300;
const STICKY_HEADER_HEIGHT = 50;//顶部条高度
const STATUS_BAR_HEIGHT = 20;

export default StyleSheet.create({
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0
    },
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    stickySectionText: {
        color: 'white',
        fontSize: 18,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        left: 15,
        top: 15
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 15
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 70
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2,
        width: AVATAR_SIZE,
        height: AVATAR_SIZE
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 20,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 15,
        paddingVertical: 5
    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
    },
    renderBackground:{
        position: 'absolute',
        top: 0,
        width: window.width,
        backgroundColor: 'rgba(0,0,0,.4)',
        height: PARALLAX_HEADER_HEIGHT
    }
});

