import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    ListView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    StatusBar,
    Animated,
    Alert,
    Platform
} from 'react-native';
// import BaseComponent from '../BaseComponent';
// import NavigationBar from '../../common/NavigationBar';
// import CardDetail from '../card/CardDetail';
// import BackPressComponent from '../../common/BackPressComponent';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as drawActions from '../../actions/action/draw/drawAction';

import Picker from 'react-native-picker';
// import TextInputState from 'TextInputState';//点击空白处键盘消失
import ArrayUtils from "../../utils/ArrayUtils";
import styles from '../../../styles/draw/drawStyle';
import GlobalStyles from '../../../styles/commonStyle';
import DP from '../../../data/dp.json';
import { CARD_URL } from '../../utils/ConstUtils';
import * as Animatable from 'react-native-animatable';
import NavigationBar from '../common/NavigationBar';
import BackPressComponent from '../common/BackPressComponent';



class DrawComponent extends Component {

    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({ backPress: (e) => ArrayUtils.onBackPress(e) })
    }
    componentDidMount() {
        this.backPress.componentDidMount();
        this._pageInit();
    }
    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }
    shouldComponentUpdate(nextProps,nextState){
        return nextProps !== this.props;
    }
    //页面初始化
    _pageInit=()=>{
        let data = [];
        for (let i = 0; i <= 100; i++) {
            data.push(i);
        }
        Picker.init({
            pickerData: data,
            selectedValue: [Number(this.props.draw.num)],
            pickerTitleText: '卡片概率',
            pickerCancelBtnText: '重置',
            pickerConfirmBtnText: '确定',
            pickerCancelBtnColor: [205, 205, 205, 1],

            onPickerConfirm: data => {
                this.props.onPickerConfirm(data)
            },
            onPickerCancel: data => {
                this.props.onPickerCancel()
            },
            onPickerSelect: data => {
                this.props.onPickerConfirm(data)
            }
        });
    };
    //筛选框显示
    _pickerShow = ()=> {
        this.props.pickerShow();
    }
    //抽卡
    _onDraw = (attribute = null) => {
        let { result, num } = this.props.draw;
        const {dispatch} = this.props.navigation; 
        //11连
        if (attribute == null) {
            this.props.onDrawEleven(dispatch,result,num)
        } else {
            this.props.onDraw(dispatch,attribute, result,num)
        }
    }
    //清空
    _onReset = ()=>{
        this.props.onReset(
            this.props.navigation.dispatch,
            this.props.draw.result
        );
    }
    // 空白处点击
    _onBlackPress = () => {
        // TextInputState.blurTextInput(TextInputState.currentlyFocusedField());//点击空白处键盘消失
        this.props.onBlackPress();
    }
    //执行动画 && 跳转
    _routeNavigate(i, num) {
        const { dispatch, navigate } = this.props.navigation;         
        if (num === 0) {
            this.props.cardRoute(
                dispatch,
                i,
                this.props.draw.result,
            )

        } else if (num === 1) {
            this.props.cardDetail(
                dispatch,
                navigate,
                this.props.draw.result[i]
            )
            // this.props.navigation.navigate('CardDetail', { data: this.props.draw.result[i] })
        }
    }
    //scroll大小变化时
    _onContentSizeChange = ()=>{
        this.props.onContentSizeChange(this._scrollView);
    }

    //抽卡界面
    draw(img, attribute) {
        let { common, draw} = this.props;
        // let isDelete = draw.result.length > 0 ? (draw.result[0].isDelete===1?1:0) : 2 ;
        // let isRoute = draw.result.length > 0 ? (draw.result[0].isRoute === 1 ? 1 : 0) : 1;
        
        return (
            <TouchableOpacity 
            disabled={this.props.common.disabled} 
            onPress={this._onDraw.bind(this,attribute)} >
                <Image style={[styles.img1]} source={img} />
                {/* <View style={[styles.img1, GlobalStyles.absolute, 
                    (common.disabled && common.disabledExtend)  ? styles.drawShadow : null                        
                ]} />   */}
            </TouchableOpacity>
        )
    }
    //展示图片
    showImg() {
        let { draw,common } = this.props;            
        let arr=[];
        
        for (let i = 0, len = draw.result.length; i < len; i++) {
            arr.push(
            <TouchableOpacity disabled={common.disabled} key={i}  activeOpacity={1}
                onPress={() => {this._routeNavigate(i, draw.result[i].isRoute)}}
                style={[GlobalStyles.align_items_center,GlobalStyles.justify_content_center,draw.result.length === 1 ? styles.imgOne : styles.imgEleven]}   
            >
                <Animatable.Image
                    source={require('../../../images/card/noimg.jpg')}
                    style={[
                        styles.img,
                        draw.result.length === 1 ? styles.imgOne : styles.imgEleven,
                        // draw.result[i].isRoute === 0 ? { opacity: 1 } : { opacity: 0 }
                    ]}
                    duration={   
                        draw.result[i].isRoute === 0 ?  0  : 1   
                    }
                    animation={           
                        draw.result[i].isRoute === 0 ? null :'zoomOut'
                    } 
                />     
                <Animatable.Image
                    style={[ 
                        draw.result[i].isRoute === 1 ?
                        (Platform.OS==='ios' ? 
                            (draw.result.length === 1 
                            ? 
                            // styles.imgOne : styles.imgEleven)
                            // (typeof(draw.result[i].url) !== 'object' ? styles.imgOneFrontLoading : styles.imgOne) : 
                            // (typeof(draw.result[i].url) !== 'object' ? styles.imgElevenFrontLoading : styles.imgEleven))
                            (draw.result[i].url.indexOf('../') !== -1 ? styles.imgOneFrontLoading : styles.imgOne) :
                            (draw.result[i].url.indexOf('../') !== -1 ? styles.imgElevenFrontLoading : styles.imgEleven))
                            :
                            (draw.result.length === 1 ? styles.imgOne : styles.imgEleven)
                        ) : 
                        (draw.result.length === 1 ? styles.imgOneBack : styles.imgElevenBack),
                    ]}
                    // source={{ uri: CARD_URL + draw.result[i].id + '.jpg' }}
                    source={
                        Platform.OS === 'ios' 
                        ? ((draw.result[i].url.indexOf('../') !== -1) ? require('../../../images/my/cardLoading.gif') : { uri: draw.result[i].url})
                        : { uri: CARD_URL + draw.result[i].id + '.jpg' }
                    }                    
                    duration={
                        draw.result[i].isRoute === 0 ? 0 : (draw.result.length === 1 ? 500 : 300)
                    }
                    animation={
                        draw.result[i].isRoute === 0 
                        ? null 
                        : (draw.result[i].animated ? (draw.result.length === 1 ? 'flipInY' : (Platform.OS == 'ios' ? 'zoomIn' : 'flipInY')) : null )  
                    }    
                />
            </TouchableOpacity>);
        }

        arr = draw.result.length === 0 ? [] : 
        (draw.result.length === 1 ? 
        <Animatable.View
            animation={
                draw.result[0].isDelete === 0 ?
                'swing' :
                'zoomOut'
            }
            // delay={2000}
            duration={
                draw.result[0].isDelete === 0 ?
                500 :
                300
            }              
        >
            {/* <Text style={draw.loading ? styles.showDraw : styles.hideDraw}>1</Text> */}
            {arr}
        </Animatable.View>
        :
        <Animatable.View
            style={[styles.showImg]}
            // delay={2000}
            duration={
                draw.result[0].isDelete === 0 ?
                500 :
                300
            }    
            animation={
                draw.result[0].isDelete === 0 ? 
                    (Platform.OS == 'ios' ? 'lightSpeedIn' : 'fadeInDownBig') :
                    (Platform.OS == 'ios' ? 'fadeOutUp' : 'fadeOutUp') 
            }
        >
            {/* <Text style={draw.loading ? styles.showDraw : styles.hideDraw}>11</Text> */}
            {arr}
        </Animatable.View>)

        return arr;
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextProps !== this.props
    }

    render() {
        let { draw,common } = this.props;
        return (
            <View style={GlobalStyles.flex_one}>
                {/* <StatusBar backgroundColor={this.props.theme.themeColor} /> */}

                <NavigationBar
                    title={'偷渡欧洲(。・`ω´・)'}
                    theme={common.themeColor}
                    style={GlobalStyles.shadow} />
                {/* <Image source={require('../../../images/show/draw_ios.gif')} /> */}
                <TouchableOpacity 
                    style={GlobalStyles.flex_one} 
                    activeOpacity={1}
                    onPress={this._onBlackPress.bind(this)}
                >
                    <View style={styles.container}>
                        <View style={styles.draw}>
                            {this.draw(require('../../../images/card/fire.png'), '火')}
                            {this.draw(require('../../../images/card/water.png'), '水')}
                            {this.draw(require('../../../images/card/tree.png'), '森')}
                        </View>
                        <TouchableOpacity  
                            activeOpacity={0.7}                         
                            disabled={common.disabled} 
                            style={[styles.img2, styles.img1, ]} 
                            onPress={this._onDraw.bind(this,null) } >
                            <Image style={[styles.img1]} source={require('../../../images/card/eleven.png')} />
                            {/* <View style={[styles.img1, GlobalStyles.absolute,
                            (common.disabled && common.disabledExtend) ? styles.drawShadow : null
                            ]} />  */}
                        </TouchableOpacity>
                    </View>

                    <View style={GlobalStyles.line} />

                    <View style={styles.title}>
                        <Text>抽选结果</Text>
                    </View>

                    <View style={styles.chance}>
                        <View style={styles.ssContainer}>
                            <Text>SS概率：</Text>
                            <TouchableOpacity activeOpacity={1} onPress={this._pickerShow.bind(this)} >
                                {/* <Text style={[{ color: this.props.theme.themeColor }, { fontWeight: '600' }]}>{this.state.num + ' %'}</Text> */}
                                <Text style={[{color:common.themeColor}, styles.fontWeight]}>{this.props.draw.num + ' %'}</Text>                                
                            </TouchableOpacity>
                        </View>

                        <View><Text>{'次数：' + draw.drawNum}</Text></View>
                        <View><Text>{'SS：' + draw.ssNum}</Text></View>

                        <TouchableOpacity 
                            disabled={draw.result.length>0?common.disabled:true} 
                            style={styles.clear} 
                            activeOpacity={0.8} 
                            onPress={this._onReset.bind(this)}>
                            <Text style={GlobalStyles.font_color}>清空</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        ref={(scrollView) => { this._scrollView = scrollView; }}
                        keyboardShouldPersistTaps={'handled'}
                        // onContentSizeChange={this._onContentSizeChange.bind(this)}
                    >
                        <View 
                            style={[styles.showImg,draw.result.length === 1 ? styles.showImgOne : styles.showImgEleven]}>
                            {this.showImg()}
                        </View>
                    </ScrollView>

                </TouchableOpacity>

            </View>
        )
    }
}


export default connect(
    state => ({
        draw: state.draw,
        common: state.common,        
    }),
    dispatch => bindActionCreators(drawActions, dispatch)
)(DrawComponent);


