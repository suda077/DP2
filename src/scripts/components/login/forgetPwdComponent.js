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
  Button,
  TouchableOpacity
} from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as forgetPwdActions from '../../actions/action/login/forgetPwdAction';

import Toast,{DURATION} from 'react-native-easy-toast';
import ViewUtils from '../../utils/ViewUtils';
import ArrayUtils from '../../utils/ArrayUtils';
import NavigationBar from '../common/NavigationBar';
import BackPressComponent from '../common/BackPressComponent';
import GlobalStyles from '../../../styles/commonStyle';
import styles from '../../../styles/login/forgetPwdStyle';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import { NavigationActions,StackNavigator } from 'react-navigation';


class ForgetPwdComponent extends Component{
  static navigationOptions = ({ navigation }) => ({
		headerTitle: '重设密码',
		headerRight: <Text/>,
	});

  constructor(props){
    super(props);
    this.backPress=new BackPressComponent({backPress:(e)=>this.onBackPress(e)})
  }
  componentDidMount(){
    this.backPress.componentDidMount();//组件完成装载后调用backPress相应方法注册监听
  }
  componentWillUnmount(){
    this.backPress.componentWillUnmount();//移除监听
  }
  onBackPress(e){
       this.onBack();
       return true;//返回true告诉用户已经处理了返回事件
	}
  onBack(){
    this.props.navigation.goBack();//关闭当前页面
  }
  _onBack() {
    this.props.onGoBack(this.props.navigation);
  }
  //手机号响应
  _onChangePhone = (phone) =>{
    let { forgetPwd, navigation} = this.props;
    this.props.onChangePhone(
      navigation.dispatch,
      phone,
      forgetPwd.vcode,
      forgetPwd.pwd, 
      forgetPwd.isSendVcode     
    )
  }
  //密码响应
  _onChangePwd = (pwd) => {
    let { forgetPwd, navigation} = this.props;
    this.props.onChangePwd(
      navigation.dispatch,
      forgetPwd.phone,
      forgetPwd.vcode,
      pwd,
      forgetPwd.isSendVcode
    )
  }
  //验证码响应
  _onChangeVcode = (vcode) => {
    let { forgetPwd, navigation } = this.props;
    this.props.onChangeVcode(
      navigation.dispatch,
      forgetPwd.phone,
      vcode,
      forgetPwd.pwd,
      forgetPwd.isSendVcode
    )
  }
  //发送验证码
  _onVcode = () => {
    if (!this.props.forgetPwd.isSendVcode) {
      // this.setState({isSendVcode: true});
      this.refs.phone.blur();
      this.refs.vcode.blur();
      this.refs.pwd.blur();

      let { forgetPwd, navigation } = this.props;
      this.props.sendVcode(
        navigation.dispatch,
        "86",
        forgetPwd.phone,
        forgetPwd.timeout,
        this.toast
      )
    }
  }
  //重设密码
  _onSave = () => {
    let {navigation,forgetPwd} = this.props;
    this.refs.phone.blur();
    this.refs.vcode.blur();
    this.refs.pwd.blur();

    this.props.onSave(
      navigation,
      "86",
      forgetPwd.phone,
      forgetPwd.vcode,
      forgetPwd.pwd,
      this.toast
    )

  }

  render(){
    let {forgetPwd,common} = this.props;
    return (
      <View style={GlobalStyles.flex_one}>

        {/* 遮挡页面 */}
        {ViewUtils.shadow(
          forgetPwd.shadow
        )}
        {/* END 遮挡页面 */}
        
        <NavigationBar
          title={'重设密码'}
          leftButton={ViewUtils.leftBackButton(() => { this._onBack() })}
          theme={common.themeColor}
          style={GlobalStyles.shadow} />

        <ScrollView keyboardShouldPersistTaps={'handled'}>

             <View style={GlobalStyles.text_container}>
                <Text style={styles.country}>+86</Text> 
                <TextInput 
                  style={styles.textInput}
                ref={'phone'}
                maxLength = {11}
                keyboardType={'numeric'}
                onChangeText={phone => {
                  this._onChangePhone(phone);
                }}
                underlineColorAndroid={'#303537'}
                onSubmitEditing={()=>{this.refs.vcode.focus()}}
                value={forgetPwd.phone}
                placeholder='请输入手机号'
                placeholderTextColor='#cdcdcd'
                clearButtonMode={'always'}
                autoCapitalize={'none'}
              />
            </View>
            <View style={GlobalStyles.text_container}>
              <Image style={styles.ic} source={require('../../../images/ic_vcode.png')} />
              <TextInput 
                style={styles.textInput}
                ref={'vcode'} 
                maxLength = {4}
                keyboardType={'numeric'}
                onChangeText={vcode => {
                  this._onChangeVcode(vcode);
                }}
                underlineColorAndroid={'#303537'}
                onSubmitEditing={()=>{this.refs.pwd.focus()}}
                value={forgetPwd.vcode}
                placeholder='验证码'
                placeholderTextColor='#cdcdcd'
                autoCapitalize={'none'}
              />
             
            <TouchableOpacity 
              onPress={() => this._onVcode()}
              disabled={forgetPwd.isSendVcode} 
              style={[styles.vcode]}>
              <Text 
                style={!forgetPwd.isSendVcode ? GlobalStyles.vcode_true : GlobalStyles.vcode_false}
              >
                {!forgetPwd.isSendVcode ?
                  "发送验证码": 
                  "重新发送(" + forgetPwd.timeout+")"}
              </Text>
            </TouchableOpacity>

            </View> 
            <View style={GlobalStyles.text_container}>
              <Image style={styles.ic} source={require('../../../images/ic_code.png')} />
              <TextInput 
                style={styles.textInput}
                ref={'pwd'} 
                minLength = {6}
                maxLength = {15}
                onChangeText={pwd => {
                  this._onChangePwd(pwd)
                }}
                underlineColorAndroid={'#303537'}
                onSubmitEditing={()=>{
                }}
                value={forgetPwd.pwd}
                placeholder='6~15位密码'
                placeholderTextColor='#cdcdcd'
                secureTextEntry={true}
                clearButtonMode={'always'}
                autoCapitalize={'none'}
              />
            </View> 

            {Platform.OS === 'android' ? 
            <TouchableOpacity disabled={forgetPwd.button} activeOpacity={1} onPress={() => this._onSave()} >
              <Text style={[styles.loginBtnAndroid,
                  !forgetPwd.button
                  ? {backgroundColor:common.themeColor} : GlobalStyles.btn_disabled_true]}
                  >保存</Text>
            </TouchableOpacity>
            : <View style={[styles.loginBtnIos, !forgetPwd.button
              ? {backgroundColor:common.themeColor} : GlobalStyles.btn_disabled_true]}>
              <Button
                disabled={forgetPwd.button}
                title="保存"
                onPress={() => this._onSave()}
                color={"#fff"}
              />
            </View>}
              
          </ScrollView> 

          <Toast 
            positionValue={175}
            ref={toast=>this.toast=toast}/> 

      </View>
    )
  }

}

export default connect(
  state => ({
    forgetPwd: state.forgetPwd,
    common: state.common,    
  }),
  dispatch => bindActionCreators(forgetPwdActions, dispatch)
)(ForgetPwdComponent);