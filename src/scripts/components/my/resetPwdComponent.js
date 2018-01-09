import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    RefreshControl,
    AsyncStorage,
    DeviceEventEmitter,
    ScrollView,
    NativeModules,//调用自定义模块
    TextInput,
    Platform,
    StatusBar,
    Modal,
    Button,
    TouchableOpacity
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import ViewUtils from '../../util/ViewUtils';
import NavigationBar from '../../common/NavigationBar';
import BackPressComponent from '../../common/BackPressComponent';
import GlobalStyles from '../../../res/styles/GlobalStyles.js';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import { NavigationActions, StackNavigator } from 'react-navigation';

import ArrayUtils from '../../util/ArrayUtils';



export default class ResetPwdPage extends Component {
   
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '重设密码',
        headerRight: <Text />,
    });

    constructor(props) {
        super(props);
        this.state = {
            timeout: 60,
            oldPwd: '',
            newPwd: '',            
            newPwdSuccess: false,
            button:true
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        this.timOut && clearTimeout(this.timOut);
        this.timer && clearTimeout(this.timer);
    }

    button() {
        if (this.state.oldPwd.length >= 6 && this.state.oldPwd.length <= 20 && this.state.newPwd.length >= 6 && this.state.newPwd.length <= 20){
            this.setState({ button: false })
        } else {
            this.setState({ button: true })
        }
    }

    onSave() {
        this.refs.newPwd.blur();
        this.refs.oldPwd.blur();
        if (!this.state.newPwdSuccess) {
            this.toast.show('密码格式不正确', DURATION.LENGTH_LONG);
        } else if (this.state.oldPwd.length >= 6 && this.state.oldPwd.length <= 20 && this.state.newPwd.length >= 6 && this.state.newPwd.length <= 20) {
            
            NativeModules.UMS.changePassword(
                this.state.newPwd, 
                this.state.oldPwd,
                (res)=>{
                    this.toast.show('修改成功', DURATION.LENGTH_LONG);
                    this.timOut = setTimeout(() => { 
                        this.props.onClose();

                        // //Reset重制路由
                        // const resetAction = NavigationActions.reset({
                        //     index: 0,
                        //     actions: [
                        //         NavigationActions.navigate({
                        //             routeName: 'Tab',
                        //             params: { theme: this.props.theme }
                        //         })
                        //     ],

                        // })
                        // this.props.navigation.dispatch(resetAction);

                    }, 1000)
                   
                },
                (error)=>{
                    //去除状态码
                    if (error.indexOf('(') != -1) {
                        error = error.split('(')[0];
                    }
                    this.toast.show(error, DURATION.LENGTH_LONG);
                }
            )
            
        }
    }

    setNewPwd(pwd) {
        this.setState({ newPwd: pwd });
        let regex = /^[A-Za-z0-9_]{6,20}$/g;
        if (pwd.match(regex) !== null) {
            this.setState({ newPwdSuccess: true })
        } else {
            this.setState({ newPwdSuccess: false })
        }
    }

    onClose(){
        return(
            ViewUtils.leftBackButton(()=>{
                this.props.onClose();

                // //Reset重制路由
                // const resetAction = NavigationActions.reset({
                //     index: 0,
                //     actions: [
                //         NavigationActions.navigate({
                //             routeName: 'Tab',
                //             params: { theme: this.props.theme }
                //         })
                //     ],

                // })
                // this.props.navigation.dispatch(resetAction);
            })
        )
    }


    renderContentView() {
        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => { this.props.onClose() }}
            >
                <View style={{flex:1,backgroundColor:'#e9e9ef'}}>

                    <NavigationBar
                        title='重置密码'
                        theme={this.props.theme}
                        rightButton={<View/>}
                        leftButton={this.onClose()}
                        style={GlobalStyles.shadow} />

                    <ScrollView keyboardShouldPersistTaps={'handled'}>

                        <View style={{ flexDirection: 'row', margin: 15, alignItems: 'center' }}>
                            <Image style={styles.ic} source={require('../../../res/images/ic_code.png')} />
                            <TextInput
                                style={styles.textInput}
                                ref={'oldPwd'}
                                minLength={6}
                                maxLength={20}
                                onChangeText={oldPwd => {
                                    this.setState({oldPwd: oldPwd})
                                    this.timer = setTimeout(() => {
                                        this.button();
                                    }, 1);
                                }}
                                underlineColorAndroid={'#303537'}
                                onSubmitEditing={() => {
                                    // if(this.state.phone.length==11 && this.state.vcode.length==4 && this.state.pwd.length>=6 && this.state.pwd.length<=15 && this.state.isSendVcode){
                                    //   this.onNext();
                                    // }
                                }}
                                value={this.state.code}
                                placeholder='旧密码'
                                placeholderTextColor='#cdcdcd'
                                onFocus={() => { }}
                                onBlur={() => { }}
                                secureTextEntry={true} />
                        </View>

                        <View style={{ flexDirection: 'row', margin: 15, alignItems: 'center' }}>
                            <Image style={styles.ic} source={require('../../../res/images/ic_code.png')} />
                            <TextInput
                                style={styles.textInput}
                                ref={'newPwd'}
                                minLength={6}
                                maxLength={20}
                                onChangeText={newPwd => {
                                    this.setNewPwd(newPwd)
                                    this.timer = setTimeout(() => {
                                        this.button();
                                    }, 1);
                                }}
                                underlineColorAndroid={'#303537'}
                                onSubmitEditing={() => {
                                    // if(this.state.phone.length==11 && this.state.vcode.length==4 && this.state.pwd.length>=6 && this.state.pwd.length<=15 && this.state.isSendVcode){
                                    //   this.onNext();
                                    // }
                                }}
                                value={this.state.code}
                                placeholder='新密码(6~20位)'
                                placeholderTextColor='#cdcdcd'
                                onFocus={() => { }}
                                onBlur={() => { }}
                                secureTextEntry={true} />
                        </View>
                        {Platform.OS === 'android' ?
                        <TouchableOpacity activeOpacity={1} disabled={this.state.button} 
                                onPress={
                                    //  ()=>this.setState({showRegisterDetail:true}) 
                                    () => this.onSave()
                                }>
                            <Text style={[styles.loginBtnAndroid,
                                !this.state.button
                                ? this.props.theme.styles.navBar : { backgroundColor: '#B0B3BC' }]}
                                
                            >保存</Text> 
                        </TouchableOpacity>
                        : 
                            <View style={[styles.loginBtnIos, 
                                !this.state.button
                                ? this.props.theme.styles.navBar : { backgroundColor: '#B0B3BC' }]}>
                            <Button
                                disabled={this.state.button}
                                title="保存"
                                onPress={() => this.onLogin('86', this.state.phone, this.state.pwd)}
                                color={"#fff"}
                            />
                        </View>}
                            
                    </ScrollView>

                    <Toast
                        positionValue={175}
                        ref={toast => this.toast = toast} /> 
                </View>
            </Modal>
        )
    }

    render() {
        return (
            this.props.visible ? <View>{this.renderContentView()}</View> : null
        )
    }

}

const styles = StyleSheet.create({
    ic: {
        position: 'absolute',
        left: 10,
        width: 20,
        height: 20
    },
    country: {
        position: 'absolute',
        left: 10,
        color: 'silver'
    },

    textInput: {
        flex: 1,
        color: '#000',
        borderWidth: 0,
        borderBottomWidth: Platform.OS == 'ios' ? 1 : 0,
        padding: Platform.OS == 'ios' ? 5 : null,
        paddingLeft: 40
    },
    loginBtnAndroid: {
        //backgroundColor:'#409EF6',
        //backgroundColor:'#B0B3BC',
        borderRadius: 20,
        margin: 30,
        padding: 15,
        textAlign: 'center',
        color: '#fff',
        fontSize: 16
    },
    loginBtnIos: {
        borderRadius: 20,
        margin: 30,
        padding: 5,
    },
    them: {
        margin: 20
    }
})