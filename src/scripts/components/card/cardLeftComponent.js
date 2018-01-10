import React, { Component, PureComponent } from 'react';
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
  Platform,
  VirtualizedList
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
  // shouldComponentUpdate(nextProps,nextState){
  //   return nextProps !== this.props;
  // }
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
          //在列表头部添加RefreshControl控件
          onRefresh={() => {this._onRefresh() }}
          //当等待数据进行更新时，将这个属性设置为true
          refreshing={cardLeft.refreshing}
          //数据
          data={cardLeft.ds}
          //指定一开始渲染的元素数量
          initialNumToRender={7} 
          keyExtractor={(item) => item.id}
          //每行渲染组件 
          renderItem={({ item }) => this.renderRow(item)}
          //FlatList为空时渲染组件
          ListEmptyComponent={this.listEmptyComponent()}
          //避免动态测量尺寸开销
          getItemLayout={(data, index) => (
            { length: 85, offset: 85 * index, index }
          )}
          //避免页面不渲染情况
          removeClippedSubviews={false}
          //底部组件
          ListFooterComponent={this.renderFooter()}
          //当列表被滚动到距离内容最底部不足 onEndReachedThreshold 的距离时调用
          onEndReached={this._onEndReached.bind(this)}
          //决定当距离内容最底部还有多远时触发 onEndReached 回调
          onEndReachedThreshold={Platform.OS==='android'?1:0.5}
          //设置可视区外最大能被渲染的元素的数量
          windowSize={2}
        />
        {/* <VirtualizedList
          //数据
          data={cardLeft.ds}
          extraData={this.props}
          //决定块中元素数量
          getItemCount={(data) => data.length}
          //通用的获取器，用来从任意类型的数据块中获取一个元素。
          getItem={(data,index)=>{
            let ds = {...data};
            return ds
          }}
          //知道内容的高度后避免动态测量尺寸开销
          getItemLayout={(data, index) => (
            { length: 85, offset: 85 * index, index }
          )}
          //为给定的item生成一个不重复的key
          keyExtractor={(item,index) => item[index].id}
          //在列表头部添加RefreshControl控件
          onRefresh={() => { this._onRefresh() }}
          //当等待数据进行更新时，将这个属性设置为true
          refreshing={cardLeft.refreshing}
          //指定一开始渲染的元素数量
          initialNumToRender={7} 
          //每行渲染组件 
          renderItem={({ item,index }) => this.renderRow(item[index])}
          //减轻渲染系统的工作负担
          removeClippedSubviews={true}
          //FlatList为空时渲染组件
          ListEmptyComponent={this.listEmptyComponent()}
          //底部组件
          ListFooterComponent={this.renderFooter()}
          //当列表被滚动到距离内容最底部不足 onEndReachedThreshold 的距离时调用
          onEndReached={this._onEndReached.bind(this)}
          //决定当距离内容最底部还有多远时触发 onEndReached 回调
          onEndReachedThreshold={Platform.OS === 'android' ? 1 : 0.5}
          //避免页面不渲染情况
          removeClippedSubviews={false}
          //设置可视区外最大能被渲染的元素的数量
          windowSize={2}
        /> */}
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
