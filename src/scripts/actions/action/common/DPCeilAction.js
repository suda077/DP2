import {
    NetInfo
} from "react-native";


import { createAction } from 'redux-actions';
import ArrayUtils from "../../../utils/ArrayUtils";
import { CARD_URL } from "../../../utils/ConstUtils";
import { disabled } from "../commonAction";

// let imgShow = (isConnected, dispatch, id,that) => {
//     // isConnected ?
//     //     dispatch({
//     //         type: 'ON_IMG_LOAD',
//     //         payload: { uri: CARD_URL + id + '.jpg' }
//     //     }) : null
//     isConnected ? 
//         that.setState({ img: { uri: CARD_URL + id + '.jpg' }})
//        : null
// }
    

// export let addNetInfo = createAction(
//     ON_IMG_LOAD,
//     (dispatch, id, that) => {
//         ArrayUtils.addNetInfo(isConnected => imgShow(isConnected, dispatch, id, that));
//     }
// )
// export let removeNetInfo = createAction(
//     ON_IMG_LOAD,
//     (dispatch, id, that) => {
//         ArrayUtils.removeNetInfo(isConnected => imgShow(isConnected, dispatch, id, that));
//     }
// )

// //读取图片资源
// export let onImgLoad = (dispatch, id ,that) =>
//     () => {
//         ArrayUtils.isNetInfo(isConnected => imgShow(isConnected, dispatch, id, that));
//     }
// //添加图片监听事件
// export let addNetInfo = (dispatch, id, that) =>
//     () => {
//         ArrayUtils.addNetInfo(isConnected => imgShow(isConnected, dispatch, id, that));
//     }
// //删除图片事件监听
// export let removeNetInfo = (dispatch, id, that) =>
//     () => {
//         ArrayUtils.removeNetInfo(isConnected => imgShow(isConnected, dispatch, id, that));
//     }

//页面跳转
export let cardDetail =
    (dispatch, navigate, resultNum) =>
        () => {
            navigate('CardDetail', { data: resultNum });
            disabled(dispatch, 300)
        }
    ;

