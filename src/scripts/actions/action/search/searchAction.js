import {
    SHOW_SEARCH_HISTORY,
    SEARCH_CANCEL,
    SEARCH_CONTENT_TRUE,
    SEARCH_CONTENT_FALSE,
    SEARCH_CHANGE_TEXT,
    SAVE_HISTORY,
    CLEAR_HISTORY
} from '../../actionTypes/search/searchType';
import SearchDpDao from '../../../repository/searchDpDao';
import DP from '../../../../data/dp.json';
import { createAction } from 'redux-actions';



//搜索取消
export let searchCancel = createAction(
    SEARCH_CANCEL
) 

//页面初始化读取缓存
export let pageInit = (dispatch)=>
    ()=>{
        new SearchDpDao('dp').getSearchKeys()
            .then(result => {
                if (result){
                    dispatch({
                        type: SHOW_SEARCH_HISTORY,
                        payload: result
                    })
                }
            })
    } 

//键盘搜索响应
export let searchChangeText = 
    (dispatch,text)=>
        new Promise((resolve, reject)=>{
            dispatch({ type: SEARCH_CONTENT_TRUE })
            resolve(text)

        }).then(res=>{
            if (res.length > 0 && res.replace(/(^\s*)/g, "") !== ''){
                let arr = [];
                for (let i = 0, len = DP.length; i < len; i++) {
                    if (DP[i].name.toUpperCase().indexOf(res.toUpperCase()) !== -1) {
                        arr.push(DP[i]);
                    }
                }
                return {
                    type: SEARCH_CHANGE_TEXT,
                    payload: {
                        arr: arr,
                        text: res
                    }
                }
            }
            else{
                return {
                    type: SEARCH_CANCEL
                }
            }
        })

//搜索框提交存入缓存
export let onSubmitEditing = 
    (dispatch, text) => 
        new Promise((resolve,reject)=>{
            dispatch({ type: SEARCH_CONTENT_FALSE });

            return new SearchDpDao('dp').getSearchKeys()
                .then(result => {//有历史记录时
                    //存入历史记录长度
                    if (result.length >= 6) {
                        result.pop();
                    }
                    for (let i = 0, len = result.length; i < len; i++) {
                        if (result[i] == text) {
                            result.splice(i, 1);
                            break;
                        }
                    }
                    result.unshift(text);
                    new SearchDpDao('dp').saveSearchItem(JSON.stringify(result))

                    dispatch({
                        type: SAVE_HISTORY,
                        payload: result
                    });
                    
                })
                .catch(error => {//没有历史记录时
                    new SearchDpDao('dp').saveSearchItem(JSON.stringify([text]))

                    dispatch({
                        type: SAVE_HISTORY,
                        payload: [text]
                    });

                });

        })


//点击搜索内容存入缓存
export let pressSearch = 
    (dispatch, text) =>
        new Promise((resolve, reject) => {
            dispatch({ type: SEARCH_CONTENT_FALSE });

            return new SearchDpDao('dp').getSearchKeys()
                .then(result => {//有历史记录时
                    //存入历史记录长度
                    if (result.length >= 6) {
                        result.pop();
                    }
                    for (let i = 0, len = result.length; i < len; i++) {
                        if (result[i] == text) {
                            result.splice(i, 1);
                            break;
                        }
                    }
                    result.unshift(text);
                    new SearchDpDao('dp').saveSearchItem(JSON.stringify(result))

                    dispatch({
                        type: SAVE_HISTORY,
                        payload: result
                    });

                    resolve(text)

                })
                .catch(error => {//没有历史记录时
                    new SearchDpDao('dp').saveSearchItem(JSON.stringify([text]))

                    dispatch({
                        type: SAVE_HISTORY,
                        payload: [text]
                    });

                    resolve(text)
                       
                });

            
        }).then(res => {

            let arr = [];
            for (let i = 0, len = DP.length; i < len; i++) {
                if (DP[i].name.toUpperCase().indexOf(res.toUpperCase()) !== -1) {
                    arr.push(DP[i]);
                }
            }
            return {
                type: SEARCH_CHANGE_TEXT,
                payload: {
                    arr: arr,
                    text: res
                }
            }

        })
//删除历史记录
export let deleteSearchItem = 
    (dispatch,name)=>
        ()=>{
            new SearchDpDao('dp').getSearchKeys()
                .then(result => {

                    for (let i = 0, len = result.length; i < len; i++) {
                        if (result[i] == name) {
                            result.splice(i, 1);
                            break;
                        }
                    }

                    //result长度为0时删除Async
                    if (result.length === 0) {
                        new SearchDpDao('dp').removeSearchItem();
                        dispatch({
                            type: CLEAR_HISTORY
                        })
                    }else{
                        new SearchDpDao('dp').saveSearchItem(JSON.stringify(result)) 
                        dispatch({
                            type: SAVE_HISTORY,
                            payload: result
                        })
                    }

                })
        }
//清空历史
export let removeSearchItem = createAction(
    CLEAR_HISTORY,()=>{
        new SearchDpDao('dp').removeSearchItem();
    }
)



