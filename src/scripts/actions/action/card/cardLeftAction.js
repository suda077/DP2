import {
    PAGE_INIT,
    LOADING_TRUE,
    ON_DRAWER,
    ON_REFRESH_TRUE,
    ON_REFRESH_FALSE,
    ON_END_REACHED,
    SHOW_FOOT
} from '../../actionTypes/card/cardLeftType';

import { createAction } from 'redux-actions';
import { CARD_URL} from "../../../utils/ConstUtils";

//页面初始化
export let pageInit = (dispatch)=>
    ()=>{
        dispatch({ 
            type: PAGE_INIT
        });
        // let timeout = setTimeout(() => {
            // dispatch({ type: LOADING_TRUE });
            // timeout && clearTimeout(timeout)
        // }, 2000);
    }
//打开抽屉筛选
export let onDrawer = (navigate)=>
    ()=>{
        navigate('DrawerOpen');
    }
  
//下拉刷新
export let onRefresh = (dispatch)=>
    ()=>{
        dispatch({
            type: ON_REFRESH_TRUE
        })
        let timeout = setTimeout(() => {
            dispatch({
                type: ON_REFRESH_FALSE
            })
        }, 1000);
    }
//上拉刷新
export let onEndReached = (dispatch) =>
    () => {
        dispatch({ type: SHOW_FOOT});
        let timeout = setTimeout(() => { 
            dispatch({ type: ON_END_REACHED });            
        }, 1000);

    }