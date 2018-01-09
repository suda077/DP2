import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  StatusBar,//状态栏，最上面覆盖
  Platform,
  TextInput,
  ListView,
  RefreshControl,
  ActivityIndicator,//loading符号
  ScrollView,
  TouchableOpacity,
  DeviceEventEmitter,
  NativeModules,//调用自定义模块
  Picker,
  Button,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginActions from '../../actions/action/login/loginAction';

import ViewUtils from '../../utils/ViewUtils';
import ArrayUtils from '../../utils/ArrayUtils';
import BackPressComponent from '../common/BackPressComponent';
import Toast,{DURATION} from 'react-native-easy-toast';
import GlobalStyles from '../../../styles/commonStyle.js';
import styles from '../../../styles/login/loginStyle';

import { NavigationActions } from 'react-navigation';


class LoginComponent extends Component {
	constructor(props){
		super(props);
		this.backPress=new BackPressComponent({backPress:(e)=>this.onBackPress(e)});
	}

	componentDidMount(){
		this.backPress.componentDidMount();//组件完成装载后调用backPress相应方法注册监听
	}
	componentWillUnmount(){
		this.backPress.componentWillUnmount();//移除监听
	}
	shouldComponentUpdate(nextProps,nextState){
		return nextProps !== this.props;
	}
	onBackPress(e){
		this.props.navigation.goBack();//关闭当前页面
		return true;//返回true告诉用户已经处理了返回事件
	}
	//后退
	_onBack = () => {
		this.props.onGoBack(this.props.navigation)
	}
	//电话输入响应
	_onChangePhone = (phone)=>{
		this.props.onChangePhone(
			this.props.navigation.dispatch,
			phone,
			this.props.login.pwd
		);		
	}
	//密码输入响应
	_onChangePwd = (pwd)=>{
		this.props.onChangePwd(
			this.props.navigation.dispatch,
			this.props.login.phone,
			pwd,
		);
	}
	//登录
	_onLogin = (country,phone,pwd) => {
		this.refs.phone.blur();
		this.refs.pwd.blur();

		const {navigation} = this.props;
		this.props.onLogin(
			navigation,
			this.toast,
			country,
			phone,
			pwd
		)
	}
	//忘记密码页面
	_forgetPwd = () => {
		const {dispatch,navigate} = this.props.navigation;
		this.refs.phone.blur();
		this.refs.pwd.blur();

		this.props.forgetPwd(
			dispatch,
			navigate
		)
		// this.disabled();
		// this.props.navigation.navigate('ForgetPwd')
	}
	//注册页面
	_onRegister(){
		const { dispatch, navigate } = this.props.navigation;		
		this.refs.phone.blur();
		this.refs.pwd.blur();
			
		this.props.register(
			dispatch,
			navigate
		)
	}
	//第三方登录
	_loginWithXX = (num) => {
		const { navigation } = this.props;
		this.props.onLoginWithXX(
			navigation,
			this.toast,
			num
		)
	}

	// resizeMode={'cover'}
	render(){			
		let {login,common} = this.props;
		return (
			<View style={GlobalStyles.flex_one}>
				
				{/* 登陆成功遮挡页面 */}
				{ViewUtils.shadow(login.shadow)}
				{/* END 登陆成功遮挡页面 */}
				
				<View style={styles.statusBar}>	
					<StatusBar backgroundColor={'#000'} networkActivityIndicatorVisible={true}/> 
				</View>

				<View style={[styles.loginPic]}>
					{ViewUtils.leftBackButton(()=>{this._onBack()},styles.pad)}
					<Image  style={styles.loginPicHei} source={require('../../../images/my/login.png')} />
					{ViewUtils.rightButton(common.disabled, '立即注册', () => this._onRegister(), styles.pad)}
				</View>
				
				<ScrollView keyboardShouldPersistTaps={'handled'}>
					<View style={GlobalStyles.text_container}>
						<Image style={styles.ic} source={require('../../../images/ic_phone.png')} />
						<TextInput 
							style={styles.textInput}
							ref={'phone'}
							maxLength = {11}
							keyboardType={'numeric'}
							onChangeText={phone => {
								this._onChangePhone(phone);
							}}
							underlineColorAndroid={'#303537'}
							onSubmitEditing={()=>{this.refs.pwd.focus()}}
							value={login.phone}
							placeholder='请输入手机号'
							placeholderTextColor='#cdcdcd'
							clearButtonMode={'always'}
							autoCapitalize={'none'}
						/>
					</View>
					<View style={GlobalStyles.text_container}>
						<Image style={styles.ic} source={require('../../../images/ic_code.png')} />
						<TextInput 
							style={styles.textInput}
							ref={'pwd'} 
							maxLength = {15}
							onChangeText={pwd => {
								this._onChangePwd(pwd)
							}}
							underlineColorAndroid={'#303537'}
							onSubmitEditing={()=>{}}
							value={login.pwd}
							placeholder='密码'
							placeholderTextColor='#cdcdcd' 
							secureTextEntry={true}
							autoCapitalize={'none'}
						/>
						<TouchableOpacity
							style={styles.forgetPwd}
							disabled={common.disabled}
							onPress={() => {
								this._forgetPwd();
							}}>
							<Text style={styles.forgetPwdColor}>忘记密码?</Text>	
						</TouchableOpacity>
					</View>	

					{Platform.OS==='android'?
					<TouchableOpacity 
						disabled={login.button} 
						activeOpacity={1} 
						onPress={() => this._onLogin('86', login.phone, login.pwd)}>
						<Text style={[
							styles.loginBtnAndroid,
							login.button ? GlobalStyles.btn_disabled_true : GlobalStyles.btn_disabled_false 
						]}>登录</Text>
					</TouchableOpacity>
					:
					<View style={[
						styles.loginBtnIos,
						login.button ? GlobalStyles.btn_disabled_true : GlobalStyles.btn_disabled_false 						
					]}>
						<Button 
							disabled={login.button}
							title="登录"
							onPress={() => this._onLogin('86', login.phone, login.pwd)}
							color={"#fff"}
						/>
					</View>}
					{/* 第三方登录 */}
					{Platform.OS === 'android' ? 
						<View>
							<Text style={styles.otherLoginLine}>——————————其他方式登录——————————</Text>
							<View style={styles.otherLogin}>
								<TouchableOpacity onPress={() =>
									this._loginWithXX(24)
								}
									activeOpacity={1}><Image style={[styles.them, styles.qq]} source={require('../../../images/ic_qq.png')} /></TouchableOpacity>
								<TouchableOpacity onPress={() => {
									// this._loginWithXX(22)
									this.toast.show("功能还在开发中，请稍后。。。", DURATION.LENGTH_SHORT);
								}}
									activeOpacity={1}><Image style={[styles.them, styles.wechat]} source={require('../../../images/ic_wechat.png')} /></TouchableOpacity>
								<TouchableOpacity onPress={() => {
									this._loginWithXX(1)
									// this.toast.show("功能还在开发中，请稍后。。。", DURATION.LENGTH_SHORT);							
								}}
									activeOpacity={1}><Image style={[styles.them, styles.sina]} source={require('../../../images/ic_sina.png')} /></TouchableOpacity>
							</View>
						</View> :
						null
					}
												
								
					
				</ScrollView>

				
				<Toast ref={toast=>this.toast=toast}/>

			</View>
		)
	}
}

export default connect(
	state => ({
		login: state.login,
		common: state.common,
	}),
	dispatch => bindActionCreators(loginActions, dispatch)
)(LoginComponent);