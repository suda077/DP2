import {
    FORGETPWD_CHANGE_PHONE,
    FORGETPWD_CHANGE_VCODE,
    FORGETPWD_CHANGE_PWD,
    FORGETPWD_BUTTON_TRUE,
    FORGETPWD_BUTTON_FALSE,
    FORGETPWD_VCODE_TRUE,
    FORGETPWD_VCODE_FALSE,
    FORGETPWD_VCODE_RESET,
    FORGETPWD_VCODE_COUNTDOWN,
    ON_FORGETPWD_WAITING,
    FORGETPWD_SHADOW_FALSE,
    FORGETPWD_RESET
} from '../../actions/actionTypes/login/forgetPwdType';
import { GET_USERDATA } from "../../actions/actionTypes/my/myType";

import { handleActions } from 'redux-actions';

const initState = {
    phone: '',
    vcode: '',
    pwd: '',
    vcodeError: false,
    isSendVcode: false,
    timeout: 60,
    button: true,
    shadow: false
};

export default handleActions({
    [FORGETPWD_CHANGE_PHONE]: {
        next(state, action) {
            return {
                ...state,
                phone: action.payload
            };
        }
    },
    [FORGETPWD_CHANGE_PWD]: {
        next(state, action) {
            return {
                ...state,
                pwd: action.payload
            };
        }
    },
    [FORGETPWD_CHANGE_VCODE]: {
        next(state, action) {
            return {
                ...state,
                vcode: action.payload
            };
        }
    },
    [FORGETPWD_BUTTON_FALSE]: {
        next(state, action) {
            return {
                ...state,
                button: false
            };
        }
    },
    [FORGETPWD_BUTTON_TRUE]: {
        next(state, action) {
            return {
                ...state,
                button: true
            };
        }
    },
    [FORGETPWD_VCODE_TRUE]: {
        next(state, action) {
            return {
                ...state,
                isSendVcode: true
            };
        }
    },
    [FORGETPWD_VCODE_FALSE]:{
        next(state, action) {
            return {
                ...state,
                isSendVcode: false
            };
        }
    },
    [FORGETPWD_VCODE_RESET]:{
        next(state, action) {
            return {
                ...state,
                isSendVcode: false,
                timeout: 60
            };
        }
    },
    [FORGETPWD_VCODE_COUNTDOWN]: {
        next(state, action) {
            return {
                ...state,
                timeout: state.timeout - 1
            };
        }
    },
    [ON_FORGETPWD_WAITING]: {
        next(state, action) {
            return {
                ...state,
                button: true,
                shadow: true
            };
        }
    },
    [FORGETPWD_SHADOW_FALSE]: {
        next(state, action) {
            return {
                ...state,
                shadow: false
            };
        }
    },
    [FORGETPWD_RESET]: {
        next(state, action) {
            return {
                ...state,
                shadow: false,
                phone: '',
                vcode: '',
                pwd: '',
                isSendVcode: false,
                timeout: 60,
            };
        }
    },
}, initState);
