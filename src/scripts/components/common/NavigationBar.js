import React, { Component,PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  StatusBar,//状态栏，把最上面那块覆盖
  Platform
} from 'react-native';


const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 40;


// const NAV_BAR_HEIGHT_ANDROID = 50;
// const NAV_BAR_HEIGHT_IOS = 44;
const STATUS_BAR_HEIGHT = 20;
const SHAPE_STATUS_BAR = {
	backgroundColor: PropTypes.string,
	barStlye: PropTypes.oneOf(['default','light-content','dark-content']),//限制三个值其中一个
	hidden: PropTypes.bool
}

export default class NavagationBar extends Component{
	constructor(props){
		super(props);
	}
	static defaultProps = {
		statusBar: {
			barStlye: 'default',
			hidden: false,
			height:50
		},
	}
	static propTypes = {
		style: View.propTypes.style,
		title: PropTypes.string,
		titleView: PropTypes.element,
		hide: PropTypes.bool,
		leftButton: PropTypes.element,
		rightButton: PropTypes.element,
		statusBar:PropTypes.shape(SHAPE_STATUS_BAR),//复数个条件时
	}
	render(){
		let statusBar =
			<StatusBar {...this.props.statusBar} backgroundColor={this.props.theme}/>
		;
		let titleView = this.props.titleView ? this.props.titleView : <Text style={styles.title}>{this.props.title}</Text>;
		let navBar = <View style={styles.navBar}>
			<View style={styles.button}>
				{this.props.leftButton}
			</View>
			<View style={styles.titleViewContainer}>
				{titleView}
			</View>	
			<View style={styles.button}>
				{this.props.rightButton}
			</View>
		</View>
		return (
			<View style={[{backgroundColor:this.props.theme,position:'relative'},this.props.style]}>
				{statusBar}
				{navBar}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	// navBar: {
	// 	flexDirection: 'row',
	// 	justifyContent: 'space-between',
	// 	alignItems: 'center',
	// 	height: Platform.OS==='ios'?NAV_BAR_HEIGHT_IOS:NAV_BAR_HEIGHT_ANDROID,
	// 	// height: NAV_BAR_HEIGHT_ANDROID,
	// },
	button: { 
		width: 50, 
		alignItems: 'center', 
		justifyContent: 'center' 
	},
	navBar:{
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: STATUSBAR_HEIGHT,
		// backgroundColor: Platform.OS === 'ios' ? '#EFEFF2' : '#FFF',
		height: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
		
	},

	titleViewContainer: {//内容永续居中样式
		justifyContent:'center',
		alignItems: 'center',
		// position: 'absolute',
		// left: 40,
		// right: 40,
		// top: 0,
		// bottom: 0
	},
	title: {
		color:'#fff',
		fontSize:18,
		fontWeight:'500'
	},
	statusBar: {
		// height: Platform.OS==='android'?STATUS_BAR_HEIGHT:0
		height: 0
	}
})