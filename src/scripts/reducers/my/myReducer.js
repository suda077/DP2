import {
    LOGIN_RESULT,
    THEME_TRUE,
    GET_USERDATA,
    LOG_OUT,
    ERROR_MESSAGE,
    ON_CODEPUSH_WAITING,
    MY_SHADOW_FALSE
} from '../../actions/actionTypes/my/myType';
import { REGISTERDETAIL_FALSE } from "../../actions/actionTypes/login/registerDetailType";
import { REGISTERDETAIL_TRUE } from "../../actions/actionTypes/login/registerType";
import {
    THEME_SET
} from '../../actions/actionTypes/commonType';
import { handleActions } from 'redux-actions';

const initState = {
    customThemeValue: false,//主题颜色
    codePush: false,//热更新
    loginState: false,//登录状态
    data: {},//用户数据
    // visible: false,//下拉列表是否可见
    errorMessage: '',//判断错误信息
    resetPwd: false,//修改密码
    shadow:false
};

export default handleActions({
    [LOGIN_RESULT]: {
        next(state, action) {
            return { 
                ...state, 
                data: action.payload,
                loginState: true
            };
        }
    },
    [THEME_TRUE]: {
        next(state, action) {
            return {
                ...state,
                customThemeValue: true
            };
        }
    },
    [THEME_SET]: {
        next(state, action) {
            return {
                ...state,
                customThemeValue: false
            };
        }
    },
    [GET_USERDATA]:{
        next(state, action) {
            return {
                ...state,
                loginState: true,
                data: action.payload
            };
        }
    }, 
    [REGISTERDETAIL_TRUE]: {
        next(state, action) {
            return {
                ...state,
                loginState: true,
                data: action.payload
            };
        }
    },
    [REGISTERDETAIL_FALSE]: {
        next(state, action) {
            return {
                ...state,
                loginState: true,                
                data: action.payload
            };
        }
    },
    [LOG_OUT]: {
        next(state, action) {
            return {
                ...state,
                loginState: false,
                data: {}
            };
        }
    },
    [ERROR_MESSAGE]: {
        next(state, action) {
            return {
                ...state,
                errorMessage: action.payload
            };
        }
    }, 
    [ON_CODEPUSH_WAITING]: {
        next(state, action) {
            return {
                ...state,
                shadow: true
            };
        }
    },
    [MY_SHADOW_FALSE]: {
        next(state, action) {
            return {
                ...state,
                shadow: false
            };
        }
    },
}, initState);
