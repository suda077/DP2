import {
    NetInfo
} from "react-native";
import {
    ADD_IMG_NET_INFO,
    REMOVE_IMG_NET_INFO,
    ON_IMG_CANCEL,
    ON_IMG_SHOW,
    ON_IMG_LOAD
} from '../../actionTypes/card/cardDetailType';

import { createAction } from 'redux-actions';
import ArrayUtils from "../../../utils/ArrayUtils";
import { CARD_URL} from "../../../utils/ConstUtils";
import { goBack } from "../../action/commonAction";


let imgShow= (isConnected,dispatch,id)=>{
    isConnected ?     
    dispatch({
        type: ON_IMG_LOAD,
        payload: { uri: CARD_URL + id + '.jpg' }
    }) : null
    
}
//读取图片资源
export let onImgLoad = (dispatch,id)=> 
    ()=>{
        ArrayUtils.isNetInfo(isConnected => imgShow(isConnected, dispatch, id) );
    }
//添加图片监听事件
export let addNetInfo = (dispatch, id) =>
    () => {
        ArrayUtils.addNetInfo(isConnected => imgShow(isConnected, dispatch, id));
    }
//删除图片事件监听
export let removeNetInfo = (dispatch, id) =>
    () => {
        ArrayUtils.removeNetInfo(isConnected => imgShow(isConnected, dispatch, id));
    }
//图片显示
export let onImgShow = createAction(ON_IMG_SHOW)
//图片隐藏
export let onImgCancel = createAction(ON_IMG_CANCEL)
//后退
export let onGoBack = (navigation)=>
    ()=>{
        goBack(navigation);
    }

