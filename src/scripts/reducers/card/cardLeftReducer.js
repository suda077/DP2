import {
    PAGE_INIT,
    LOADING_FALSE,
    ON_REFRESH_TRUE,
    ON_REFRESH_FALSE,
    ON_END_REACHED,
    SHOW_FOOT
} from '../../actions/actionTypes/card/cardLeftType';
import {
    ON_CHOICE_RARITY,
    ON_CHOICE_ATTRIBUTE,
    ON_CHOICE_TAG,
    ON_CHOICE_RACE
} from '../../actions/actionTypes/card/cardChoiceType';
import {
   SAVE_HISTORY
} from '../../actions/actionTypes/search/searchType';

import DP from '../../../data/dp.json';
import { handleActions } from 'redux-actions';

const initState = {
    dsArr:[],//原数据
    ds: [],//显示数据,
    loading: true,
    isChoiceRarity: 'all',
    isChoiceAttribute: 'all',
    isChoiceTag: 'all',
    isChoiceRace: 'all', 
    timer:2000,//动画延迟载入时间
    refreshing:false,
    showFoot: 0,// 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中,
    index: 0,//下拉刷新数组下标start
    end: 0,//下拉刷新数组下标end
    item: 14,//初始化渲染组件数量
};


export default handleActions({
    [SAVE_HISTORY]:{
        next(state, action) {
            return {
                ...state,
                timer:500
            };
        }
    },
    [PAGE_INIT]: {
        next(state, action) {
            return {
                ...state,
                dsArr: DP,
                ds: DP.slice(0, state.item), 
                loading: true, 
                timer: 2000, 
                isChoiceRarity: 'all',
                isChoiceAttribute: 'all',
                isChoiceTag: 'all',
                isChoiceRace: 'all' ,
                index: state.item,
                end: state.item * 2,
                showFoot: 0
            };
        }
    },
    [SHOW_FOOT]: {
        next(state, action) {
            return {
                ...state,
                showFoot:2,
            };
        }
    },
    [ON_END_REACHED]: {
        next(state, action) {
            return { ...state, 
                ds: state.ds.concat(state.dsArr.slice(state.index, state.end)), 
                index: state.index + state.item,
                end: state.end + state.item,
                timer: 500,
                showFoot: state.dsArr.length <= state.end ? 1 :0,
            };
        }
    },
    [LOADING_FALSE]: {
        next(state, action) {
            return { ...state, loading:false };
        }
    },
    [ON_REFRESH_TRUE]: {
        next(state, action) {
            return { ...state, refreshing:true };
        }
    },
    [ON_REFRESH_FALSE]: {
        next(state, action) {
            return { ...state, refreshing: false };
        }
    },
    [ON_CHOICE_RARITY]: {
        next(state, action) {
            return { ...state, isChoiceRarity: action.payload, timer:500,
                ds: DP.filter(item =>
                    (action.payload !== 'all' ? item.rarity === action.payload : true) &&
                    (state.isChoiceAttribute !== 'all' ? item.attribute === state.isChoiceAttribute : true) &&
                    (state.isChoiceTag !== 'all' ? item.tag === state.isChoiceTag : true) 
                    && (state.isChoiceRace !== 'all' ? item.race.join().indexOf(state.isChoiceRace) !== -1 : true)
                ).slice(0, state.item),
                dsArr: DP.filter(item =>
                    (action.payload !== 'all' ? item.rarity === action.payload : true) &&
                    (state.isChoiceAttribute !== 'all' ? item.attribute === state.isChoiceAttribute : true) &&
                    (state.isChoiceTag !== 'all' ? item.tag === state.isChoiceTag : true)
                    && (state.isChoiceRace !== 'all' ? item.race.join().indexOf(state.isChoiceRace) !== -1 : true)
                ),
                index: state.item,
                end: state.item * 2,
                showFoot: 0
            };
        }
    },
    [ON_CHOICE_ATTRIBUTE]: {
        next(state, action) {
            return { ...state, isChoiceAttribute: action.payload, timer:500,
                ds: DP.filter(item =>
                    (state.isChoiceRarity !== 'all' ? item.rarity === state.isChoiceRarity : true) &&
                    (action.payload !== 'all' ? item.attribute === action.payload : true) &&
                    (state.isChoiceTag !== 'all' ? item.tag === state.isChoiceTag : true) 
                    && (state.isChoiceRace !== 'all' ? item.race.join().indexOf(state.isChoiceRace) !== -1 : true)
                ).slice(0, state.item),
                dsArr: DP.filter(item =>
                    (state.isChoiceRarity !== 'all' ? item.rarity === state.isChoiceRarity : true) &&
                    (action.payload !== 'all' ? item.attribute === action.payload : true) &&
                    (state.isChoiceTag !== 'all' ? item.tag === state.isChoiceTag : true)
                    && (state.isChoiceRace !== 'all' ? item.race.join().indexOf(state.isChoiceRace) !== -1 : true)
                ),
                index: state.item,
                end: state.item * 2,
                showFoot: 0
            };
        }
    },
    [ON_CHOICE_TAG]: {
        next(state, action) {
            return { ...state, isChoiceTag: action.payload, timer:500,
                ds: DP.filter(item =>
                    (state.isChoiceRarity !== 'all' ? item.rarity === state.isChoiceRarity : true) &&
                    (state.isChoiceAttribute !== 'all' ? item.attribute === state.isChoiceAttribute : true) &&
                    (action.payload !== 'all' ? item.tag === action.payload : true) 
                    && (state.isChoiceRace !== 'all' ? item.race.join().indexOf(state.isChoiceRace) !== -1 : true)
                ).slice(0, state.item),
                dsArr: DP.filter(item =>
                    (state.isChoiceRarity !== 'all' ? item.rarity === state.isChoiceRarity : true) &&
                    (state.isChoiceAttribute !== 'all' ? item.attribute === state.isChoiceAttribute : true) &&
                    (action.payload !== 'all' ? item.tag === action.payload : true)
                    && (state.isChoiceRace !== 'all' ? item.race.join().indexOf(state.isChoiceRace) !== -1 : true)
                ),
                index: state.item,
                end: state.item * 2,
                showFoot: 0
            };
        }
    },
    [ON_CHOICE_RACE]: {
        next(state, action) {
            return { ...state, isChoiceRace: action.payload, timer:500,
                ds: DP.filter(item =>
                    (state.isChoiceRarity !== 'all' ? item.rarity === state.isChoiceRarity : true) &&
                    (state.isChoiceAttribute !== 'all' ? item.attribute === state.isChoiceAttribute : true) &&
                    (state.isChoiceTag !== 'all' ? item.tag === state.isChoiceTag : true) 
                    && (action.payload !== 'all' ? item.race.join().indexOf(action.payload) !== -1 : true)
                ).slice(0, state.item),
                dsArr: DP.filter(item =>
                    (state.isChoiceRarity !== 'all' ? item.rarity === state.isChoiceRarity : true) &&
                    (state.isChoiceAttribute !== 'all' ? item.attribute === state.isChoiceAttribute : true) &&
                    (state.isChoiceTag !== 'all' ? item.tag === state.isChoiceTag : true)
                    && (action.payload !== 'all' ? item.race.join().indexOf(action.payload) !== -1 : true)
                ),
                index: state.item,
                end: state.item * 2,
                showFoot: 0
            };
        }
    },
}, initState);
