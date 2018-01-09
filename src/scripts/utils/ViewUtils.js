import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
  Dimensions,
  Platform
} from 'react-native';

export default class ViewUtils{

  /**
  *tab图标
  *@params callBack 点击回调函数
  */
  static tabBarItem(img,tintColor){
    return <Image source={img}
      style={{ tintColor: tintColor, width: 25, height: 25 }}
    />  
  }
 
  /**
  *后退按钮
  *@params callBack 点击回调函数
  */
	static leftBackButton(callBack,style=null){
		return <TouchableOpacity style={style}  onPress={callBack}>
					<Image style={{width:25,height:25}}  source={require('../../images/ic_back.png')}  />
    </TouchableOpacity>
	}

  /**
  *右按钮
  *@params callBack 点击回调函数
  */
  static rightButton(disabled,content,callBack,style=null){
    return <TouchableOpacity disabled={disabled} style={style} onPress={callBack}>
      <Text style={{ color: '#fff', textAlign: 'center' }}>{content}</Text>
    </TouchableOpacity>
  }


  /**
   *我的页面item
   *@params disabled 是否可点击
   *@params callBack 点击回调函数
   *@params icon 左图标
   *@params text 右文字
   *@params tintStyles 图标样式
   *@params expandableIco 右图标
  */
  static getSettingItem(disabled,callBack,icon,text,tintStyles,expandableIco){
    return (
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={1}
        onPress={callBack}>
          <View style={styles.item}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image style={[{width:28,height:28,marginRight:10},tintStyles]} source={icon ? icon : null} resizeMode={'stretch'}/>
                <Text>{text}</Text>
              </View>
              <Image style={[{height:22,width:22},tintStyles]} source={expandableIco ? expandableIco : require('../../images/ic_tiaozhuan.png')}/>
          </View>
      </TouchableOpacity>
    )
  }

  /**
   *更新等待页面
  */
  static waitingCodePush(){
    return (
      <View >
        <Image style={{width:120,height:120}} source={require('../../images/my/loading.gif')} />
      </View>
    )
  }

 /**
   *遮挡item
   *@params shadow 判断是否遮挡
   *@params item 显示item
   *@params callback 回调
  */
  static shadow(shadow,callBack=null){
    return (
      Platform.OS==='android'
      //android不修改zIndex属性原因是效果无效
      ? <TouchableOpacity onPress={callBack} activeOpacity={0.5} style={[styles.shadow, { opacity: 0.5, zIndex: 10000,display:!shadow?'none':'flex' }]} >
          <Image style={styles.shadowImg} source={require('../../images/my/cardLoading.gif')} />
      </TouchableOpacity>
      //ios不修改disply属性原因是会崩溃
      :<View style={[styles.shadow, { opacity: !shadow ? 0 : 0.5, zIndex: !shadow ? -100 : 10000 }]}>
          <TouchableOpacity style={{
            height: Dimensions.get('window').height, 
            width: Dimensions.get('window').width,
            alignItems:'center',
            justifyContent:'center'
          }} activeOpacity={0.5} onPress={callBack} >
            <Image style={styles.shadowImg} source={require('../../images/my/cardLoading.gif')} />
          </TouchableOpacity>
      </View> 
    )
  }

}

const styles = StyleSheet.create({
  item:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:10,
    height:60
  },
  shadow: {
    flex:1,
    backgroundColor: '#000',
    position: 'absolute', 
    height: Dimensions.get('window').height, 
    width: Dimensions.get('window').width,
    alignItems:'center',
    justifyContent:'center'
  },
  shadowImg:{
    height:35,
    width:35
  }
})