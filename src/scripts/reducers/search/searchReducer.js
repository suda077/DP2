import { ListView} from 'react-native';
import {
    SHOW_SEARCH_HISTORY,
    SEARCH_CANCEL,
    SEARCH_CHANGE_TEXT,
    SEARCH_CONTENT_TRUE,
    SEARCH_CONTENT_FALSE,
    SAVE_HISTORY,
    CLEAR_HISTORY
} from '../../actions/actionTypes/search/searchType';

import { handleActions } from 'redux-actions';

const initState = {
    searchReset: false,//判断是否重置
    isSearched: false,//判断是否搜索到内容
    isLoading: false,//判断是否在读取数据
    ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),//搜索显示内容
    text: '',//输入文本框内容		
    searchContent: false,//搜索联动
    data: [],//搜索内容
    searchHistory: false,//是否有搜索历史
    searchArr: [],//搜索历史内容
    showKeyboard:true
};

export default handleActions({
    [SHOW_SEARCH_HISTORY]: {
        next(state, action) {
            return { 
                ...state, 
                searchArr: action.payload, 
                searchHistory: true };
        }
    },
    [SEARCH_CANCEL]: {
        next(state, action) {
            return {
                ...state, 
                text: '',
                searchReset: false,
                searchContent: false,
                // isSearched: false
            };
        }
    },
    [SEARCH_CONTENT_TRUE]: {
        next(state, action) {
            return {
                ...state, searchContent: true
            };
        }
    },
    [SEARCH_CONTENT_FALSE]: {
        next(state, action) {
            return {
                ...state, searchContent: false
            };
        }
    },
    [SEARCH_CHANGE_TEXT]: {
        next(state, action) {
            return {
                ...state, 
                ds: state.ds.cloneWithRows(action.payload.arr),
                searchReset: true,
                isSearched: action.payload.arr.length > 0 ? true : false,
                data: action.payload.arr,
                text: action.payload.text,
            };
        }
    },
    [SAVE_HISTORY]: {
        next(state, action) {
            return {
                ...state, 
                searchHistory: true,
                searchArr:action.payload,
                searchContent: false
            };
        }
    },
    [CLEAR_HISTORY]: {
        next(state, action) {
            return {
                ...state,
                searchHistory: false,
                searchArr: [],
            };
        }
    },
}, initState);
