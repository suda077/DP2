import React, { Component } from 'react';
import {
  Image,
  View,
  Clipboard,//剪切板
  Platform,
} from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as aboutActions from '../../actions/action/about/aboutAction';


import ViewUtils from '../../utils/ViewUtils';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import AboutCommon,{FLAG_ABOUT} from './AboutCommon'
import GlobalStyles from '../../../styles/commonStyle';
import { FLAG } from "../../utils/ConstUtils";
import BackPressComponent from '../common/BackPressComponent';
import Toast, { DURATION } from 'react-native-easy-toast';


class AboutAuthorComponent extends Component {
  constructor(props) {
    super(props);
    this.aboutCommon = new AboutCommon(props,(dic)=>this.updateState(dic),FLAG_ABOUT.flag_about_author);
    this.backPress=new BackPressComponent({backPress:(e)=>this.onBackPress(e)})   
  }

  componentDidMount(){
    this.backPress.componentDidMount();//组件完成装载后调用backPress相应方法注册监听
  }
  componentWillUnmount(){
    this.backPress.componentWillUnmount();//移除监听
  }
  onBackPress(e){
    this.onBack();
    return true;//返回true告诉用户已经处理了返回事件
  }
  onBack(){
    this.props.navigation.goBack();//关闭当前页面
  }

  updateState(dic){
    this.setState(dic)
  }

  onClick(tag){
    switch(tag){
      case FLAG.BLOG:
        this.setState({
          showBlog: !this.state.showBlog
        })
      break;
      case FLAG.BLOG.items.GITHUB:
       this.disabled();
       this.props.navigation.navigate('WebSite',{
        url: tag.url,
        theme:this.props.navigation.state.params.theme
       })
      break;
      case FLAG.CONTACT:
        this.setState({
          showContent: !this.state.showContent
        })
      break;
      case FLAG.CONTACT.items.QQ:
        Clipboard.setString(tag.account);
        // this.toast.show('QQ:' + tag.account + '已保存到剪切板', DURATION.LENGTH_SHORT);
      break;
    }
  }

  //右侧图标
  getClickIcon(isShow){
    return isShow ? require('../../../images/ic_tiaozhuan_up.png') : require('../../../images/ic_tiaozhuan_down.png')
  }

  /**
  * 显示下拉数据
  * @params dis
  * @params isShowAccount
  */
  renderItems(dic,isShowAccount){
    if(!dic)return null;
    let arr = [];
    for(let i in dic){
      let title = isShowAccount ? dic[i].title+':'+dic[i].account : dic[i].title;
      arr.push(
        <View key={i}>
          {ViewUtils.getSettingItem(
            this.props.common.disabled,
            ()=>this.props.onClick(
              this.props.navigation.dispatch,
              this.props.navigation.navigate,
              dic[i]),
            '',
            title,
            {tintColor:'#000'})}
          <View style={GlobalStyles.line} />
        </View>
      )
    }
    return arr;
  }

  render(){
    let {about,common} = this.props;
    let { dispatch, navigate } = this.props.navigation;
    
    //下方显示内容
    let content = <View style={GlobalStyles.flex_one}>

      {Platform.OS === 'android' ? <View style={{height:10}} />:null} 

        {ViewUtils.getSettingItem(
          common.disabled,
          ()=>this.props.onClick(
            dispatch,
            navigate,
            FLAG.BLOG),
          require('../../../images/ic_computer.png'),
          FLAG.BLOG.name,
          {tintColor:'#000'},
          this.getClickIcon(about.showBlog))}
        <View style={GlobalStyles.line} />
        {about.showBlog ? this.renderItems(FLAG.BLOG.items) : null}
        {ViewUtils.getSettingItem(
          common.disabled,
          () => this.props.onClick(
            dispatch,
            navigate,
            FLAG.CONTACT),
          require('../../../images/ic_contacts.png'),
          FLAG.CONTACT.name,
          {tintColor:'#000'},
          this.getClickIcon(about.showContent))}
        <View style={GlobalStyles.line} />
        {about.showContent ? this.renderItems(FLAG.CONTACT.items,true) : null}

    </View>
    return this.aboutCommon.renderView({
        name:'Ravan Zhang',
        description: 'N多计划构思中~~~~',
        avatar: '../../../images/my/my.jpg',
        backgroundImg: '../../../images/my/bg.png'
      },content)
    
  }

}

export default connect(
  state => ({
    about: state.about,
    common: state.common,
  }),
  dispatch => bindActionCreators(aboutActions, dispatch)
)(AboutAuthorComponent);


