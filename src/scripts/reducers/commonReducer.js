import {
    DISABLED_FALSE,
    DISABLED_TRUE,
    THEME_SET,
} from '../actions/actionTypes/commonType';

import { handleActions } from 'redux-actions';

const initState = {
    disabled: false,
    themeColor:'',
};

export default handleActions({
    [DISABLED_FALSE]: {
        next(state, action) {
            return { ...state, disabled: false };
        }
    },
    [DISABLED_TRUE]: {
        next(state, action) {
            return { ...state, disabled: true };
        }
    },
    [THEME_SET]: {
        next(state, action) {
            return {
                ...state,
                themeColor: action.payload
            };
        }
    },
}, initState);
