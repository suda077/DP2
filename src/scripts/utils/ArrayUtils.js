import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	Alert,
	NetInfo,//获知设备联网或离线的状态信息
	Platform,
	BackHandler
} from 'react-native';
import LoginDao from '../repository/loginDao';


export default class ArrayUtils{
  /**
  *若选中的数据在数组中则删除，否则添加
  *@params arr 数组
  *@params data 选中数据
  */
  static updateArray(arr,data){
    for(let i=0,j=arr.length;i<j;i++){
      if(arr[i] === data){
        arr.splice(i,1);
        return;
      }
    }
    arr.push(data);
  }
  
  /**
   * 用户注册登录数据存入缓存
   * 
   * @static
   * @param {any} data 
   * @memberof ArrayUtils
   */
  static saveLoginItem(data){
	  if(Platform.OS ==='android'){
		let dataObj = {};
			//昵称
			if(data.indexOf('nickname')!==-1){
				let nicknameLeft = data.substring(data.indexOf('nickname')+('nickname'.length+1));
				let nicknameRight = nicknameLeft.substring(0,nicknameLeft.indexOf(','));
				//把获得的数据转换成json,用dataObj["nickname"]而不用dataObj.nickname为了转换JSON格式
				dataObj["nickname"] = nicknameRight ;
			}
			//头像
			if(data.indexOf('avatar')!==-1){
				let avatarLeft = data.substring(data.indexOf('avatar')+('avatar'.length+2));
				let avatarRight = avatarLeft.substring(0,avatarLeft.indexOf(']'));
				let arr = avatarRight.split(',');
				dataObj["avatar"] = arr ;		
			}
			//签名
			if(data.indexOf('signature')!==-1){
				let signatureLeft = data.substring(data.indexOf('signature')+('signature'.length+1));
				let signatureRight = signatureLeft.substring(0,signatureLeft.indexOf(','));
				dataObj["signature"] = signatureRight ;
			}else{
				dataObj["signature"] = '这家伙很懒，什么都没写哦~' ;
			}
			//性别
			if(data.indexOf('gender')!==-1){
				let genderLeft = data.substring(data.indexOf('gender')+('gender'.length+1));
				let genderRight = genderLeft.substring(0,genderLeft.indexOf(','));
				dataObj["gender"] = Number(genderRight) ;
			}
			//手机
			if(data.indexOf('phone')!==-1){
				let phoneLeft = data.substring(data.indexOf('phone')+('phone'.length+1));
				let phoneRight = phoneLeft.substring(0,phoneLeft.indexOf(','));
				dataObj["phone"] = phoneRight ;
			}

			// let jsonstr = data
			// // .replace(/^{/,'\'{')
			// // .replace(/}$/,'}\'')
			// .replace(/=/g,"\":\"")
			// .replace(/,/g,'","')
			// .replace(/{/g,'{"')
			// .replace(/}/g,'"}')
			// .replace(/:"{/g,':{"')
			// .replace(/}"/g,'"}')
			// .replace(/:"\[/g,':["')
			// .replace(/]"/g,'"]')
			// .replace(/[http|https]":"/g,':');
			// let json = eval('('+jsonstr + ')');
			
			//用户数据存入缓存
			new LoginDao('dp').saveLoginItem(JSON.stringify(dataObj));
		  	return dataObj;
		}else{
			new LoginDao('dp').saveLoginItem(JSON.stringify(data));
			return data;
		}
	}


	/**
   * 判断是否联网状态，添加事件监听
   * 
   * @static
   * @param {any} data 
   * @memberof ArrayUtils
   */
	static addNetInfo(callback){
		NetInfo.isConnected.addEventListener('connect',callback);
	}
	static removeNetInfo(callback) {
		NetInfo.isConnected.removeEventListener('connect', callback);
	}
	static isNetInfo(callback) {
		NetInfo.isConnected.fetch().done(callback);
	}

	/**
   * 对象深拷贝
   * 
   * @static
   * @param p 对象
   * @memberof ArrayUtils
   */
	static deepCopy(p, c) {
		c = c || {};
		for (let i in p) {
			if (typeof p[i] === 'object') {
				c[i] = (p[i].constructor === Array) ? [] : {};
				this.deepCopy(p[i], c[i])
			} else {
				c[i] = p[i];
			}
		}
		return c;
	}

	/** android退出app
   	* 
   	* @static
	* @param e 对象
	* @memberof ArrayUtils
	*/
	static onBackPress(e) {
		Alert.alert(
			'提示',
			'确定退出吗',
			[
				{ text: '取消', onPress: () => {}, style: 'cancel' },
				{ text: '确定', onPress: () => BackHandler.exitApp() },
			],
			{ cancelable: false }
		)
		return true;//返回true告诉用户已经处理了返回事件
	}

}