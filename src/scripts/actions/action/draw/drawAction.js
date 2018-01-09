import { 
    Animated,
    InteractionManager,
    Platform
 } from "react-native";
import {
    ON_DRAW,
    ON_DRAW_ELEVEN,
    PICKER_SHOW,
    ON_PICKER_CONFIRM,
    ON_PICKER_CANCEL,
    ON_PICKER_SELECT,
    ON_RESET,
    ON_BLACK_PRESS,
    ON_CONTENT_SIZE_CHANGE,
    CARD_ROUTE,
    IS_SS
} from '../../actionTypes/draw/drawType';
import { disabled } from "../commonAction";
import ArrayUtils from "../../../utils/ArrayUtils";

import DP from '../../../../data/dp.json';
import Picker from 'react-native-picker';
import { createAction } from 'redux-actions';
import { CARD_URL } from '../../../utils/ConstUtils';



//返回卡片数据
let isSS = (num)=> {
    let isSSNum = Math.ceil(Math.random() * 100);
    return isSSNum <= num ? DP.filter(item => item.rarity === 'SS+') : DP.filter(item => item.rarity !== "SS+");
}

//概率框点击事件
export let pickerShow = createAction(
    PICKER_SHOW,()=>{
        Picker.show();
    }
);
//抽卡(单抽)
//函数方式action使用dispatch传递
export let onDraw = 
    (dispatch, attribute, result, num) =>
        () => {
            /* map方法不会触发componentWillUpdate方法 */
            //卡片删除
            if (result.length>0){
                result.map((val, index) => {
                    val.isDelete++;
                    return val;
                })
            }
            /* END */

            Picker.hide();//滚轮隐藏
            let arr = isSS(num).filter(item => item.attribute === attribute);
            let number = Math.floor(Math.random() * arr.length);
            let append = Object.assign({}, arr[number])
            // let append = ArrayUtils.deepCopy(arr[number]);
            // let append = arr[number]    
            //是否旋转
            append.isRoute = 0;
            //是否删除
            append.isDelete = 0;
            //初始图片显示
            append.url = '../../../../images/my/cardLoading.gif';
            //判断是否执行卡片翻转动画
            append.animated = false;

            disabled(dispatch, 500, {
                type: ON_DRAW,
                payload: [append]},
            )

        }

//抽卡(11连)
export let onDrawEleven = 
    (dispatch, result, num) => 
        () => {
            //卡片删除
            if (result.length > 0) {
                result.map((val, index) => {
                    val.isDelete++;
                    return val;
                })
            }
            Picker.hide();//滚轮隐藏
            let arrRes= [];
            for (let i = 0; i < 11; i++) {
                let arr = isSS(num)
                let number = Math.floor(Math.random() * arr.length);
                let append = Object.assign({}, arr[number])
                append.isRoute = 0;//是否旋转
                append.isDelete = 0;//是否删除
                append.url = '../../../../images/my/cardLoading.gif'//初始图片显示
                append.animated = false;

                /* push方法不会触发componentWillUpdate方法 */
                arrRes.push(append);
            }       
            disabled(dispatch, 500, {
                type: ON_DRAW_ELEVEN,
                payload: arrRes},
            )
        }
//清空
export let onReset =
    (dispatch, result) =>
        () => {
            Picker.hide();
            result.map((val, index) => {
                val.isDelete = val.isDelete + 1;
                return val;
            })
            disabled(dispatch, 400, { type: ON_RESET })
        }
    ;
//图片翻转
export let cardRoute = 
    (dispatch, i, result) => 
        ()=>{
            Picker.hide();
            result[i].isRoute++;
            dispatch({
                type: CARD_ROUTE
            })
            if (Platform.OS === 'ios'){
                fetch(CARD_URL + result[i].id + '.jpg')
                    .then(response => response.url)
                    .then(url => {
                        result[i].url = url;
                        result[i].animated = true
                        if (result[i].rarity === 'SS+') {
                            dispatch({
                                type: IS_SS,
                                payload: 1
                            })
                            return
                        };
                        dispatch({
                            type: IS_SS
                        })
                    })
            }else{
                result[i].animated = true                
                if (result[i].rarity === 'SS+') {
                    dispatch({
                        type: IS_SS,
                        payload: 1
                    })
                    return
                };
                dispatch({
                    type: IS_SS
                })
            }
            

    };

//概率框确定
export let onPickerConfirm = createAction(
    ON_PICKER_CONFIRM,(data)=>data
);
//概率框取消
export let onPickerCancel = createAction(
    ON_PICKER_CANCEL
);
//概率框选择
export let onPickerSelect = createAction(
    ON_PICKER_SELECT, (data) => data
);

//空白处点击
export let onBlackPress = createAction(
    ON_BLACK_PRESS, () => {
        Picker.hide()
    }
);
//scrll大小变换时
export let onContentSizeChange = createAction(
    ON_CONTENT_SIZE_CHANGE, (_scrollView)=>{
        _scrollView.scrollToEnd({ animated: true })
    }
);

//页面跳转
export let cardDetail =
    (dispatch,navigate, resultNum) =>
        () => {
            Picker.hide();
            navigate('CardDetail', { data: resultNum});
            disabled(dispatch,300)
        }
;
