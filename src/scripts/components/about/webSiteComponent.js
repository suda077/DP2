import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView,
  TouchableOpacity,
  Image,
  StatusBar,//状态栏，最上面覆盖
  Platform,
} from 'react-native';
import  ViewUtils from '../../utils/ViewUtils';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as aboutActions from '../../actions/action/about/aboutAction';
import BackPressComponent from '../common/BackPressComponent';


class WebSiteComponent extends Component{
  static navigationOptions = ({navigation}) => ({
    headerTitle:'项目地址',
    headerRight:<Text/>
  })
  constructor(props){
    super(props)
    this.backPress=new BackPressComponent({backPress:(e)=>this.onBackPress(e)})      
  }
  componentDidMount(){
    this.backPress.componentDidMount();
  }
  componentWillUnmount(){
    this.backPress.componentWillUnmount();
  }
  onBackPress(e){
    if (this.props.about.canGoBack) {
      this.webView.goBack();//调用WebView后退方法
    }
    else {
      this.props.navigation.goBack();//关闭当前页面
    }
    return true;//返回true告诉用户已经处理了返回事件
  }
	render(){
		return <View style={{flex:1}}>
        <WebView 
          ref={webView=>this.webView=webView}
          source={{uri:this.props.navigation.state.params.url}}
          onNavigationStateChange={(e)=>{
            this.props.canGoBack(e)
          }}
          startInLoadingState={true}/>
    </View>;
	}
}

export default connect(
  state => ({
    about: state.about,
  }),
  dispatch => bindActionCreators(aboutActions, dispatch)
)(WebSiteComponent);
