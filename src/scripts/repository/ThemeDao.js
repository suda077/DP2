import React, { Component } from 'react';
import {
  AsyncStorage
} from 'react-native';
import {ThemeFlags} from '../utils/ConstUtils';

const THEME_KEY_PREFIX = 'theme_';

export default class ThemeDao{
	constructor(flag) {
		this.flag = THEME_KEY_PREFIX + flag;
	}

	saveTheme(themeFlag){
		AsyncStorage.setItem(this.flag,themeFlag,(error)=>{})
	}

	getTheme(){
		return new Promise((resolve,reject)=>{
			AsyncStorage.getItem(this.flag,(error,result)=>{
				if(error){
					reject(error);
					return;
				}
				else{
					if(!result){
						this.saveTheme(ThemeFlags.Default);
						result = ThemeFlags.Default;
					}
					resolve(result);
				}
			})
		})
	}
}