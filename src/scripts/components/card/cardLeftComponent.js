import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableOpacity,
  InteractionManager,//将一些耗时较长的工作安排到所有互动或动画完成之后再进行
  FlatList,
  Dimensions,
  Animated,
  ActivityIndicator,//显示一个圆形的loading提示符号。
  Platform
} from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cardLeftActions from '../../actions/action/card/cardLeftAction';

import GlobalStyles from '../../../styles/commonStyle';
import styles from '../../../styles/card/cardLeftStyle';
import NavigationBar from '../common/NavigationBar';
import DPCeil from '../common/DPCeil';
import BackPressComponent from '../common/BackPressComponent';
import ArrayUtils from "../../utils/ArrayUtils";


class CardLeftComponent extends Component{

  constructor(props){
    super(props);
    this.backPress = new BackPressComponent({ backPress: (e) => ArrayUtils.onBackPress(e) })
  }
  componentDidMount(){
    this.backPress.componentDidMount();
    this._pageInit();
  }
  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }
  shouldComponentUpdate(nextProps,nextState){
    return nextProps !== this.props;
  }
  _pageInit =()=>{
    this.props.pageInit(
      this.props.navigation.dispatch
    )
  }
  _onDrawer = () => {
    this.props.onDrawer(this.props.navigation.navigate)
  }
  _onRefresh = ()=>{
    this.props.onRefresh(this.props.navigation.dispatch)
  }
  _onEndReached = ()=>{
    //如果是正在加载中或没有更多数据了，则返回
    if (this.props.cardLeft.showFoot !== 0) {
      return;
    }
    this.props.onEndReached(this.props.navigation.dispatch)
  }

  //底部组建
  renderFooter() {
    if (this.props.cardLeft.showFoot === 1) {
      return (
        <View style={styles.footerOne}>
          <Text style={styles.footerNone}>
            没有更多数据了
          </Text>
        </View>
      );
    } else if (this.props.cardLeft.showFoot === 2) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator />
          <Text>正在加载数据...</Text>
        </View>
      );
    } else if (this.props.cardLeft.showFoot === 0) {
      return null;
    }
  }
  //卡片列表
  renderRow(data){
    return (<View>
      <DPCeil
        data={data}
        {...this.props}
      />
    </View>)
      // showPage={(bool)=>this.setState({showPage: bool})}/>
  }
  //筛选图标
  cardChoice(){
    return (<TouchableOpacity  onPress={() => {
      this._onDrawer()
    }}>
      <Image style={styles.icChoice} source={require('../../../images/ic_choice.png')} />
    </TouchableOpacity>);
  }
  //FlatList为空时渲染组件
  listEmptyComponent(){
      return(
        <View style={styles.container}> 
          <Image style={styles.imgEmpty} source={require('../../../images/my/cardLoading.gif')} />  
        </View>
      )
  }

  render(){
    let {cardLeft,common} = this.props;

    // let flatList = this.state.ds.length!==0 ? <ListView
    //       dataSource={this.state.ds}
    //       renderRow={data => this.renderRow(data)}/> : <View style={{justifyContent:'center',alignItems:'center',flex:1}}><Text >搜索结果为空</Text></View>
    
  
    let flatList = cardLeft.ds.length !== 0 ?
      <View style={cardLeft.loading ? styles.isLoadingTrue : styles.isLoadingFalse}>
        <FlatList
          onRefresh={() => {this._onRefresh() }}
          refreshing={cardLeft.refreshing}
          data={cardLeft.ds}
          initialNumToRender={7}  //指定一开始渲染的元素数量
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => this.renderRow(item)}
          ListEmptyComponent={this.listEmptyComponent()}
          getItemLayout={(data, index) => (
            //避免动态测量尺寸开销
            { length: 85, offset: 85 * index, index }
          )}
          //避免页面不渲染情况
          removeClippedSubviews={false}
          ListFooterComponent={this.renderFooter()}
          onEndReached={this._onEndReached.bind(this)}
          onEndReachedThreshold={Platform.OS==='android'?1:0}
        />
    </View> 
    : <View style={styles.searchEmpty}><Text >搜索结果为空 ┑(￣Д ￣)┍</Text></View>
    

      return(    
          //判断下拉读取条是否显示
        <View style={GlobalStyles.flex_one}>

          {cardLeft.loading  ? 
          <View style={[styles.loading]}>
            <Image style={styles.imgEmpty} source={require('../../../images/my/cardLoading.gif')} />
          </View>
          : null} 

          <NavigationBar 
            title='卡片图鉴'
            theme={common.themeColor}
            rightButton={this.cardChoice()}
            style={[GlobalStyles.shadow,{marginBottom:1}]}/>
          
          {flatList}
      </View> 
    )
  }
}

export default connect(
  state => ({
    cardLeft: state.cardLeft,
    common: state.common
  }),
  dispatch => bindActionCreators(cardLeftActions, dispatch)
)(CardLeftComponent);
