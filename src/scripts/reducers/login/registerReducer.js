import {
    REGISTER_CHANGE_PHONE,
    REGISTER_CHANGE_VCODE,
    REGISTER_CHANGE_PWD,
    REGISTER_BUTTON_TRUE,
    REGISTER_BUTTON_FALSE,
    REGISTER_VCODE_TRUE,
    REGISTER_VCODE_FALSE,
    REGISTER_VCODE_RESET,
    REGISTER_VCODE_COUNTDOWN,
    ON_REGISTER_WAITING,
    REGISTER_SHADOW_FALSE,
    REGISTERDETAIL_TRUE
} from '../../actions/actionTypes/login/registerType';
import { GET_USERDATA } from "../../actions/actionTypes/my/myType";
import { REGISTERDETAIL_FALSE } from "../../actions/actionTypes/login/registerDetailType";


import { handleActions } from 'redux-actions';

const initState = {
    phone: '',
    vcode: '',
    pwd: '',
    isSendVcode: false,
    timeout: 60,
    showRegisterDetail: false,
    button: true,
    shadow: false
};

export default handleActions({
    [REGISTER_CHANGE_PHONE]: {
        next(state, action) {
            return {
                ...state,
                phone: action.payload
            };
        }
    },
    [REGISTER_CHANGE_PWD]: {
        next(state, action) {
            return {
                ...state,
                pwd: action.payload
            };
        }
    },
    [REGISTER_CHANGE_VCODE]: {
        next(state, action) {
            return {
                ...state,
                vcode: action.payload
            };
        }
    },
    [REGISTER_BUTTON_FALSE]: {
        next(state, action) {
            return {
                ...state,
                button: false
            };
        }
    },
    [REGISTER_BUTTON_TRUE]: {
        next(state, action) {
            return {
                ...state,
                button: true
            };
        }
    },
    [REGISTER_VCODE_TRUE]: {
        next(state, action) {
            return {
                ...state,
                isSendVcode: true
            };
        }
    },
    [REGISTER_VCODE_FALSE]: {
        next(state, action) {
            return {
                ...state,
                isSendVcode: false
            };
        }
    },
    [REGISTER_VCODE_RESET]: {
        next(state, action) {
            return {
                ...state,
                isSendVcode: false,
                timeout: 60
            };
        }
    },
    [REGISTER_VCODE_COUNTDOWN]: {
        next(state, action) {
            return {
                ...state,
                timeout: state.timeout - 1
            };
        }
    },
    [ON_REGISTER_WAITING]: {
        next(state, action) {
            return {
                ...state,
                button: true,
                shadow: true
            };
        }
    },
    [REGISTER_SHADOW_FALSE]: {
        next(state, action) {
            return {
                ...state,
                shadow: false
            };
        }
    },
    [REGISTERDETAIL_TRUE]: {
        next(state, action) {
            return {
                ...state,
                shadow: false,
                phone: '',
                vcode: '',
                pwd: '',
                isSendVcode: false,
                timeout: 60,
                showRegisterDetail: true,
            };
        }
    },
    [REGISTERDETAIL_FALSE]:{
        next(state, action) {
            return {
                ...state,
                showRegisterDetail: false,
            };
        }
    }
}, initState);
