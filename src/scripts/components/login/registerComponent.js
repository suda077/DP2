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
  Button,
  TouchableOpacity
} from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as registerActions from '../../actions/action/login/registerAction';

import Toast,{DURATION} from 'react-native-easy-toast';
import ViewUtils from '../../utils/ViewUtils';
import ArrayUtils from '../../utils/ArrayUtils';
import NavigationBar from '../common/NavigationBar';
import GlobalStyles from '../../../styles/commonStyle';
import styles from '../../../styles/login/registerStyle';
import RegisterDetail from './registerDetailComponent';
import BackPressComponent from '../common/BackPressComponent';



class RegisterComponent extends Component{
  static navigationOptions = ({ navigation }) => ({
		headerTitle: '注册',
		headerRight: <Text/>,
	});
  constructor(props){
    super(props);
    this.backPress=new BackPressComponent({backPress:(e)=>this.onBackPress(e)})
  }
  componentDidMount(){
    this.backPress.componentDidMount();
  }
  componentWillUnmount(){
    this.backPress.componentWillUnmount();
  }
  shouldComponentUpdate(nextProps,nextState){
    return nextProps !== this.props;
  }
  onBackPress(e){
      this.props.navigation.goBack();//关闭当前页面
      return true;//返回true告诉用户已经处理了返回事件
	}
  _onBack(){
    this.props.onGoBack(this.props.navigation);
  }
  //手机号响应
  _onChangePhone = (phone) => {
    let { register, navigation } = this.props;
    this.props.onChangePhone(
      navigation.dispatch,
      phone,
      register.vcode,
      register.pwd,
      register.isSendVcode
    )
  }
  //密码响应
  _onChangePwd = (pwd) => {
    let { register, navigation } = this.props;
    this.props.onChangePwd(
      navigation.dispatch,
      register.phone,
      register.vcode,
      pwd,
      register.isSendVcode
    )
  }
  //验证码响应
  _onChangeVcode = (vcode) => {
    let { register, navigation } = this.props;
    this.props.onChangeVcode(
      navigation.dispatch,
      register.phone,
      vcode,
      register.pwd,
      register.isSendVcode
    )
  }
  //发送验证码
  _onVcode = () => {
    if (!this.props.register.isSendVcode) {
      // this.setState({isSendVcode: true});
      this.refs.phone.blur();
      this.refs.vcode.blur();
      this.refs.pwd.blur();

      let { register, navigation } = this.props;
      this.props.sendVcode(
        navigation.dispatch,
        "86",
        register.phone,
        register.timeout,
        this.toast
      )
    }
  }
  //注册
  _onSave = () => {
    let { navigation, register } = this.props;
    this.refs.phone.blur();
    this.refs.vcode.blur();
    this.refs.pwd.blur();

    this.props.onSave(
      navigation,
      "86",
      register.phone,
      register.vcode,
      register.pwd,
      this.toast
    )

  }

  render(){
    let { register, common } = this.props;
    return (
      <View style={GlobalStyles.flex_one}>

        {/* 遮挡页面 */}
        {ViewUtils.shadow(register.shadow)}
        {/* END 遮挡页面 */}

        <ScrollView keyboardShouldPersistTaps={'handled'}>

          <NavigationBar
            title={'注册'}
            leftButton={ViewUtils.leftBackButton(()=>{this._onBack()})}
            theme={common.themeColor}
            style={GlobalStyles.shadow}
            />

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
                  value={register.phone}
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
                value={register.vcode}
                placeholder='验证码'
                placeholderTextColor='#cdcdcd'
                autoCapitalize={'none'}
              />

            <TouchableOpacity
              onPress={() => this._onVcode()}
              disabled={register.isSendVcode}
              style={[styles.vcode]}>
                <Text 
                  style={!register.isSendVcode ? GlobalStyles.vcode_true : GlobalStyles.vcode_false}
                >
                {!register.isSendVcode ?
                  "发送验证码": 
                  "重新发送("+register.timeout+")"}
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
                value={register.pwd}
                placeholder='6~15位密码'
                placeholderTextColor='#cdcdcd'
                onFocus={()=>{}}
                onBlur={()=>{}} 
                secureTextEntry={true}
                clearButtonMode={'always'}
                autoCapitalize={'none'}
              />
            </View> 
          {Platform.OS === 'android' ? 
            <TouchableOpacity disabled={register.button} activeOpacity={1} onPress={() => this._onSave()}>
              <Text style={[styles.registerBtnAndroid,
                  !register.button
                    ? { backgroundColor: common.themeColor } : GlobalStyles.btn_disabled_true]}  
                  >下一步</Text>
            </TouchableOpacity>
            : <View style={[styles.registerBtnIos, !register.button
              ? { backgroundColor: common.themeColor } : GlobalStyles.btn_disabled_true]}>
              <Button
                disabled={register.button}
                title="下一步"
                onPress={() => this._onSave()}
                color={"#fff"}
              />
            </View>}
             
          </ScrollView> 

          <RegisterDetail {...this.props}/>

          <Toast ref={toast=>this.toast=toast}/> 

      </View>
    )
  }

}

export default connect(
  state => ({
    register: state.register,
    common: state.common,
  }),
  dispatch => bindActionCreators(registerActions, dispatch)
)(RegisterComponent);