import {
	AsyncStorage
} from 'react-native';

const SEARCH_KEY_PREFIX  = 'search_';

export default class SearchDpDao{
	constructor(flag){
		this.flag = SEARCH_KEY_PREFIX + flag;
	}

	/**
	* 保存搜索项目
	* @params value 搜索的项目
	* @params callback 回调函数
	*/
	saveSearchItem(value,callback){
		AsyncStorage.setItem(this.flag,value,(error)=>{
			callback;
		})
	}

	/**
	* 删除搜索项目
	*/
	removeSearchItem(){
		AsyncStorage.removeItem(this.flag,error=>{
			
		})
	}

	//获取搜索数据对应的ID
	getSearchKeys(){
		return new Promise((resolve,reject)=>{
			AsyncStorage.getItem(this.flag,(error,result)=>{
				if(!error){
					try{
						resolve(JSON.parse(result))
					}
					catch(e){
						reject(e)
					}
				}
				else{
					reject(error);
					return;
				}
			})
		})
	}



}
