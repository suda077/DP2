import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ScrollView,
  AsyncStorage,
  DeviceEventEmitter,
  Modal,
  TouchableHighlight,
  Platform,
  TouchableOpacity,
} from 'react-native'; 

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as myActions from '../../actions/action/my/myAction';

import { NavigationActions } from 'react-navigation';
import {ThemeFlags} from '../../utils/ConstUtils';
import GlobalStyles from '../../../styles/commonStyle';
import styles from '../../../styles/my/customThemeStyle';
// import BackPressComponent from '../common/BackPressComponent';


class CustomThemeComponent extends Component{
	constructor(props){
		super(props);
		// this.backPress = new BackPressComponent({ backPress: (e) => ArrayUtils.onBackPress(e) })

	}
	// componentDidMount() {
	// 	this.backPress.componentDidMount();//安装监听        
	// }
	// componentWillUnmount() {
	// 	this.backPress.componentWillUnmount();//移除监听
	// }

	//主题点击事件
	_onSelectTheme = (themeKey) => {
		this.props.themeFalse(ThemeFlags[themeKey]);
	}

	//创建主题Item
	getThemeItem(themeKey){
		return (
			<TouchableOpacity 
				style={[styles.getThemeItem,{backgroundColor:ThemeFlags[themeKey]}]} 
					activeOpacity={1}
					underlayColor={'#fff'} 
					onPress={()=>{this._onSelectTheme(themeKey)}}>
				<View>
					<Text style={styles.getThemeItemText}/>
				</View>
			</TouchableOpacity>
		)
	}

	//创建主题列表
	renderThemeItems(){
		let arr = [];
		for (let i = 0, keys = Object.keys(ThemeFlags), len = keys.length;i<len;i+=3){
			let k1=keys[i],k2=keys[i+1],k3=keys[i+2];
			arr.push(<View key={i} style={styles.themeItems}>
				{this.getThemeItem(k1)}
				{this.getThemeItem(k2)}
				{this.getThemeItem(k3)}
			</View>)
		}
		return arr;
	}

	render(){
		return (
			<Modal
				animationType={'slide'}
				transparent={true}
				visible={this.props.my.customThemeValue}
				onRequestClose={() => { }}
			>
				<View style={styles.modalContainer}>
					<ScrollView>
						{this.renderThemeItems()}
					</ScrollView>
				</View>
			</Modal>
		)
	}
}

export default connect(
	state => ({
		my: state.my,
		common: state.common,
	}),
	dispatch => bindActionCreators(myActions, dispatch)
)(CustomThemeComponent);

