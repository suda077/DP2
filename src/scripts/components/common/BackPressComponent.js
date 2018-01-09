//监听设备后退键
import React, { Component,PropTypes } from 'react';
import {
  BackHandler //0.44版本以上用BackHandler
} from 'react-native';

export default class BackPressComponent{
	constructor(props){
		this._hardwareBackPress=this.onHardwareBackPress.bind(this);//组建创建时方法绑定
		this.props=props;//非继承Component(extends Component)不必super(props)
	}
	componentDidMount(){
		if(this.props.backPress){//若上个页面传来回调函数那么添加监听
			BackHandler.addEventListener('hardwareBackPress',this._hardwareBackPress);
		}
	}
	componentWillUnmount(){
		if(this.props.backPress){
			BackHandler.removeEventListener('hardwareBackPress',this._hardwareBackPress);
		}
	}
	onHardwareBackPress(e){
		return this.props.backPress(e);//返回事件的处理交给调用者
	}
}