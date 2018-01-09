import {
	AsyncStorage
} from 'react-native';

const LOGIN_KEY_PREFIX  = 'login_';

export default class LoginDpDao{
	constructor(flag){
		this.flag = LOGIN_KEY_PREFIX + flag;
	}

	/**
	* 保存登录项目
	* @params value 登录的项目
	* @params callback 回调函数
	*/
	saveLoginItem(value,callback){
		AsyncStorage.setItem(this.flag,value,(error)=>{

		})
	}

	/**
	* 删除登录项目
	*/
	removeLoginItem(){
		AsyncStorage.removeItem(this.flag,error=>{
            
		})
	}

	//获取登录数据对应的ID
	getLoginKeys(){
		return new Promise((resolve,reject)=>{
			AsyncStorage.getItem(this.flag,(error,result)=>{
				if(!error){
					if(result){
						resolve(JSON.parse(result))	
					}else{
						reject('未获取到数据')							
					}
				}
				else{
					reject(error)
				}
			})
		})
	}



}
