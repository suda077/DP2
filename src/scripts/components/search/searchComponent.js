import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    StatusBar,//状态栏，最上面覆盖
    Platform,
    TextInput,
    ListView,
    RefreshControl,
    ActivityIndicator,//loading符号
    ScrollView,
    TouchableOpacity,
    DeviceEventEmitter,
    Animated,
    Alert
} from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActions from '../../actions/action/search/searchAction';
import ArrayUtils from '../../utils/ArrayUtils';
import BackPressComponent from '../common/BackPressComponent';

import DPCeil from '../common/DPCeil';
import DP from '../../../data/dp.json';
import GlobalStyles from '../../../styles/commonStyle';
import styles from '../../../styles/search/searchStyle';


class SearchComponent extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
    	// headerStyle: {
    	// 	backgroundColor: screenProps ?
    	// 		screenProps.themeColor :
    	// 		'#4ECBFC'
        // },

        // tabBarVisible: navigation.state.params.showKeyboard ? 
        //                 navigation.state.params.showKeyboard :
        //                 true


    });
    constructor(props) {
        super(props);

        this.backPress = new BackPressComponent({ backPress: (e) => ArrayUtils.onBackPress(e) })

    }
    componentDidMount() {
        this.backPress.componentDidMount();
        this._pageInit();
        // this.props.navigation.setParams({ showKeyboard: false })  

    }
    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }
    shouldComponentUpdate(nextProps,nextState){
        return nextProps !== this.props;
    }
    //页面初始化
    _pageInit = ()=>{
        this.props.pageInit(this.props.navigation.dispatch);
    }

    //搜索卡片列表
    renderRow(res) {
        return <DPCeil
            data={res}
            {...this.props}
            showPage={(bool) => this.setState({ showPage: bool })} />
    }

    //键盘搜索响应
    _searchChangeText = (text) => {
        this.props.searchChangeText(this.props.navigation.dispatch,text)
    }
    //取消框
    _searchCancel = ()=>{
        this.refs.search.blur();
        if(this.props.search.text.length>0){
            this.props.searchCancel()
        }
    }
    //搜索框提交
    _onSubmitEditing = () => {
        this.refs.search.blur();
        if (this.props.search.text.replace(/(^\s*)/g, "") !== ''){
            this.props.onSubmitEditing(
                this.props.navigation.dispatch,
                this.props.search.text
            );
        }
    }
    //点击搜索内容存入缓存
    _pressSearch = (name) => {
        this.refs.search.blur();
        this.props.pressSearch(
            this.props.navigation.dispatch,
            name
        )
    }  
    //点击历史记录
    _historyChoice = (item) =>{
        this.refs.search.blur();
        this.props.pressSearch(
            this.props.navigation.dispatch,
            item
        )
    }
    //删除历史
    _deleteSearchItem = (name) => {
        this.props.deleteSearchItem(
            this.props.navigation.dispatch,
            name
        )
    }
    //清空历史
    _removeSearchItem = () => {
        this.props.removeSearchItem()
    }

    //搜索显示内容
    showSearchContent() {
        let arr = [];
        let { search } = this.props;

        for (let i = 0, len = search.data.length; i < len; i++) {
            let str = '';
            let dsName = search.data[i].name;
            let text = search.text;
            let num = 0;

            //为搜索内容添加逗号
            for (let j = 0, dsLength = dsName.length; j < dsLength; j++) {
                if (j < dsName.length - 1) str += dsName[j] + ',';
                else str += dsName[j]
            }
            //转换为数组
            let arr2 = str.split(',').map((item, index) => {
                return <Text style={GlobalStyles.font_size} key={num++}>{item}</Text>
            })
            //搜索关键字变色
            let index = dsName.toUpperCase().indexOf(text.toUpperCase());
            if (index !== -1) {
                for (let i = 0, len = text.length; i < len; i++) {
                    arr2[index + i] = <Text key={num++} style={[GlobalStyles.font_size, styles.markColor]}>{dsName[index + i]}</Text>
                }
            }
            arr.push(<View key={i}>
                <TouchableOpacity
                    style={[styles.searchContent, styles.searchContentExtend]}
                    onPress={() => { this._pressSearch(search.data[i].name) }}>
                    {arr2}
                </TouchableOpacity>
                <View style={GlobalStyles.line} />
            </View>);
        }
        return arr;
    }
    //搜索历史
    showHistory() {
        let arr = this.props.search.searchArr.map((item, index) => {
            return (
                <View key={index} >
                    <TouchableOpacity style={[styles.searchHistory]} onPress={() => {
                        this._historyChoice(item)
                    }}>
                        <Text style={[GlobalStyles.font_size,styles.hisLeft]}>{item}</Text>

                        <TouchableOpacity activeOpacity={1} style={[styles.forkContainer]} onPress={() => { this._deleteSearchItem(item) }}>
                            <Image style={styles.fork} source={require('../../../images/ic_fork.png')} />
                        </TouchableOpacity>

                    </TouchableOpacity>
                    <View style={GlobalStyles.line} />
                </View>
            )
        })
        return (
            this.props.search.searchHistory ?
                <View>
                    <View style={[styles.searchContentExtendd]}>
                        <Text style={GlobalStyles.font_size}>搜索历史</Text>
                    </View>
                    <View style={GlobalStyles.line} />
                    {arr}
                    <Text style={styles.clearHistory} onPress={() => { this._removeSearchItem() }}>清空历史</Text>
                </View> : null
        )
    }

    render() {
        let {search,common} =this.props;

        let statusBar = <View style={styles.statusBar} />

        //输入框
        let textInput = <TextInput
            style={styles.textInput}
            ref={'search'}
            onChangeText={text => this._searchChangeText(text)}
            underlineColorAndroid={'#fff'}
            onSubmitEditing={() => { this._onSubmitEditing() }}
            value={search.text}
            placeholder='输入卡片名称'
            placeholderTextColor='#fff'
            returnKeyType={'go'}
            clearButtonMode={'always'}
            autoCapitalize={'none'}
        />;

        //取消框
        let rightButton = <TouchableOpacity onPress={() => {
            this._searchCancel();
        }}><Text style={styles.search}>取消</Text></TouchableOpacity>;

        // 上方搜索栏
        let navBar = <View style={styles.navBar}>
            {textInput}
            {rightButton}
        </View>;

        //搜索结果为空时显示的内容
        let searchNull = <View style={styles.searchNull}><Text style={styles.searchNullExtend}>搜索结果为空~~</Text></View>;

        //搜索结果不为空时显示的内容
        let searchShow = <ListView
            dataSource={search.ds}
            renderRow={data => this.renderRow(data)} />;
        

        //loading符号
        // let indicator = <ActivityIndicator
        //     style={[GlobalStyles.justify_content_center,GlobalStyles.flex_one]}
        //     animating={this.state.isLoading} />;

        // 下方搜索结果		
        let listView = <View style={GlobalStyles.flex_one}>
            {/* {this.state.searchContent ? this.showSearchContent() : (this.state.searchReset ? (!this.state.isSearched ? searchNull : searchShow) : this.searchHis())} */}

            {/* 搜索 ? 显示 : (搜索提交 ? (无搜索内容 ? null : 搜索显示) : 搜索历史)  */}
            {search.searchContent ? 
                this.showSearchContent() : 
                (search.searchReset ? 
                    (!search.isSearched ? searchNull : searchShow) : 
                    this.showHistory())}   
        
        </View>

        return (
            <View style={[GlobalStyles.flex_one]}>

                <View style={[{ backgroundColor: common.themeColor }, GlobalStyles.shadow]}>
                    {statusBar}
                    {navBar}
                </View>

                <ScrollView keyboardShouldPersistTaps={'handled'} style={GlobalStyles.flex_one}>
                    <TouchableOpacity activeOpacity={1} onPress={() => { this.refs.search.blur() }}>
                        {listView}
                    </TouchableOpacity>
                </ScrollView> 

                {/* <Image source={require('../../../images/show/draw.gif')}/> */}

            </View>
        )
    }
}

export default connect(
    state => ({
        search: state.search,
        common: state.common,        
    }),
    dispatch => bindActionCreators(searchActions, dispatch)
)(SearchComponent);
