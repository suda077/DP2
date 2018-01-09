import {
    ON_DRAW,
    ON_DRAW_ELEVEN,
    ON_PICKER_CONFIRM,
    ON_PICKER_CANCEL,
    ON_PICKER_SELECT,
    ON_RESET,
    CARD_ROUTE,
} from '../../actions/actionTypes/draw/drawType';
import { DISABLED_FALSE } from "../../actions/actionTypes/commonType";

import { handleActions } from 'redux-actions';

const initState ={
    result: [],//
    drawNum: 0,//抽卡次数
    ssNum: 0,//ss抽到次数
    num: '7',
    img: require('../../../images/card/noimg.jpg'),
    loading: false
};

export default handleActions({
    [DISABLED_FALSE]:{
        next(state, action) {
            return { ...state, loading: false };
        }
    },
    [ON_DRAW]: {
        next(state, action) {
            return { ...state, result: action.payload, loading:true};
        }
    }, 
    [ON_DRAW_ELEVEN]: {
        next(state, action) {
            return { ...state, result: action.payload, loading: true};
        }
    }, 
    [ON_PICKER_CONFIRM]:{
        next(state, action) {
            return { ...state,num:action.payload };
        }
    },
    [ON_PICKER_CANCEL]:{
        next(state, action) {
            return { ...state, num: '7' };
        }
    },
    [ON_PICKER_SELECT]:{
        next(state, action) {
            return { ...state, num: action.payload };
        }
    },
    [ON_RESET]:{
        next(state, action) {
            return { ...state, ssNum: 0, drawNum: 0, result: [] };
        }
    },
    [CARD_ROUTE]:{
        next(state, action) {
            return { ...state, 
                ssNum: action.payload === 1 ? state.ssNum + 1 : state.ssNum,
                drawNum: state.drawNum + 1
            };
        } 
    },
}, initState);
