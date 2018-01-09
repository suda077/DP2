import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableHighlight,
    Linking,
    Alert,
    DeviceEventEmitter,
    TouchableOpacity,
    Picker,
    Button,
    NativeModules,
    Platform,
} from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as myActions from '../../actions/action/my/myAction';

// import BaseComponent from '../BaseComponent';
import NavigationBar from '../common/NavigationBar';
import GlobalStyles from '../../../styles/commonStyle';
import styles from '../../../styles/my/myStyle';
import { MORE_MENU } from '../../utils/ConstUtils';
import ViewUtils from '../../utils/ViewUtils';
import ArrayUtils from '../../utils/ArrayUtils';
import CustomThemeComponent from './customThemeComponent';
// import ResetPwdComponent from './resetPwdComponent';
import BackPressComponent from '../common/BackPressComponent';



class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({ backPress: (e) => ArrayUtils.onBackPress(e) })

    }
    componentWillMount() {
        // codePush.disallowRestart();//不允许立即重启用于以完成更新。
    }
    componentDidMount() {
        this.backPress.componentDidMount();//安装监听        
        this._pageInit();
    }
    componentWillUnmount() {
        this.backPress.componentWillUnmount();//移除监听
    }
    shouldComponentUpdate(nextProps,nextState){
        return nextProps !== this.props;
    }
    //页面初始化
    _pageInit = () =>{
        this.props.pageInit(
            this.props.navigation.dispatch
        );
    }
    //注销
    _logout = () => {
        this.props.logOut(this.props.navigation.dispatch)
    }
    
    //显示主题
    renderCustomTheme() {
        return (
            <CustomThemeComponent
            {...this.props} />
        )
    }

    //显示修改密码
    renderResetPwd() {
        // return (
           // <ResetPwdComponent
        //         // visible={true}
        //         visible={this.state.resetPwd}
        //         onClose={() => { this.setState({ resetPwd: false }) }}
        //         {...this.props} />
        // )
    } 

    //内容item
    getItem(tag, icon, text, tintStyles) {
        return ViewUtils.getSettingItem(
            this.props.common.disabled, 
            () => this.props.onClick(
                this.props.navigation.dispatch,
                this.props.navigation.navigate,
                tag
            ), 
            icon, 
            text, 
            [{tintColor:this.props.common.themeColor}, tintStyles], 
            null
        )
    }

    render() {
        let {common,my} = this.props;
        const {dispatch,navigate} = this.props.navigation;
        return (
            <View style={GlobalStyles.flex_one}>

                {/* 遮挡页面 */}
                {ViewUtils.shadow(my.shadow)}
                {/* END 遮挡页面 */}

                <NavigationBar
                    title='我的'
                    theme={common.themeColor} />

                {my.loginState ?
                    <TouchableOpacity activeOpacity={1} style={{backgroundColor:common.themeColor}}>
                        <View style={[styles.login]}>
                            <View style={GlobalStyles.flex_row}>
                                <Image style={styles.avatar} source={{ uri: my.data.avatar[0] }} />
                                <View style={GlobalStyles.justify_content_flexEnd}>
                                    <View style={styles.avatarLeft}>
                                        <Text style={styles.avatarLeftExtand}>{my.data.nickname}</Text>
                                        {my.data.gender == 1 ? <Image style={styles.sex} source={require('../../../images/ic_sex_male.png')} />
                                            : (my.data.gender == 2 ? <Image style={styles.sex} source={require('../../../images/ic_sex_female.png')} />
                                                : null)
                                        }
                                    </View>
                                    <Text style={styles.signature}>{my.data.signature}</Text>
                                </View>
                            </View>
                            
                            <TouchableOpacity  onPress={() => this._logout()}>
                                <Text style={[GlobalStyles.text_algin_center, styles.logOut]}>注销</Text>
                            </TouchableOpacity>

                            {/* <View style={styles.container}>
                                <Text style={styles.msg}>Hello MSG</Text>
                                <View style={styles.triangle}/>
                                <TouchableOpacity onPress={() => { }}>
                                    <Image style={styles.tool} source={require('../../../images/ic_tool.png')} />
                                </TouchableOpacity>
                            </View> */}

                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        disabled={common.disabled}
                        activeOpacity={1}
                        onPress={() => { this.props.onClick(
                                            dispatch,
                                            navigate,
                                            MORE_MENU.Login
                                        ) }}
                        style={[{backgroundColor:common.themeColor}]}>
                        <View style={[styles.login]}>
                            <View style={[GlobalStyles.flex_row,GlobalStyles.align_items_center]}>
                                <Image source={require('../../../images/my/ic_my.png')} resizeMode={'stretch'} />
                                <Text style={styles.loginText}>立即登录</Text>
                            </View>
                            <Image style={styles.tool} source={require('../../../images/ic_tiaozhuan.png')} />
                        </View>
                    </TouchableOpacity>}


                <ScrollView >
                    <View style={GlobalStyles.line} />

                    {/*设置*/}
                    <Text style={[styles.groupTitle, GlobalStyles.root_container]}>设置</Text>
                    <View style={GlobalStyles.line} />
                    {this.getItem(MORE_MENU.Custom_Theme, require('../../../images/my/ic_custom_theme.png'), '自定义主题')}
                    <View style={GlobalStyles.line} />
                    {this.getItem(MORE_MENU.About_Author, require('../../../images/my/ic_insert_emoticon.png'), '关于作者')}
                    <View style={GlobalStyles.line} />
                    {this.getItem(MORE_MENU.FeedBack, require('../../../images/ic_feedback.png'), '反馈')}
                    <View style={GlobalStyles.line} />
                    {this.getItem(MORE_MENU.Update, require('../../../images/ic_contacts.png'), '检查更新')}
                    <View style={GlobalStyles.line} />


                </ScrollView>

                {this.renderResetPwd()}

                {this.renderCustomTheme()}

            </View>
        )
    }
}

export default connect(
    state => ({
        my: state.my,
        common: state.common,
    }),
    dispatch => bindActionCreators(myActions, dispatch)
)(MyComponent);

