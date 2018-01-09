import {
    LOGIN_CHANGE_PHONE,
    LOGIN_CHANGE_PWD,
    LOGIN_BUTTON_TRUE,
    LOGIN_BUTTON_FALSE,
    ON_LOGIN_WAITING,
    LOGIN_SHADOW_FALSE
} from '../../actions/actionTypes/login/loginType';
import { GET_USERDATA } from "../../actions/actionTypes/my/myType";

import { handleActions } from 'redux-actions';

const initState = {
    phone: '',
    pwd: '',
    button: true,
    shadow: false
};

export default handleActions({
    [LOGIN_CHANGE_PHONE]: {
        next(state, action) {
            return {
                ...state,
               phone: action.payload
            };
        }
    },
    [LOGIN_CHANGE_PWD]: {
        next(state, action) {
            return {
                ...state,
                pwd: action.payload
            };
        }
    },
    [LOGIN_BUTTON_TRUE]: {
        next(state, action) {
            return {
                ...state,
                button: true
            };
        }
    },
    [LOGIN_BUTTON_FALSE]: {
        next(state, action) {
            return {
                ...state,
                button: false
            };
        }
    },
    [ON_LOGIN_WAITING]: {
        next(state, action) {
            return {
                ...state,
                button: true,
                shadow:true
            };
        }
    },
    [LOGIN_SHADOW_FALSE]:{
        next(state, action) {
            return {
                ...state,
                shadow: false
            };
        }
    },
    [GET_USERDATA]:{
        next(state, action) {
            return {
                ...state,
                shadow: false,
                phone: '',
                pwd: '',
            };
        }
    }
}, initState);
