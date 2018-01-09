import {
    REGISTERDETAIL_CHANGE_NICKNAME,
    REGISTERDETAIL_CHANGE_SIGNATURE,
    REGISTERDETAIL_SET_GENDER,
    REGISTERDETAIL_BUTTON_TRUE,
    REGISTERDETAIL_BUTTON_FALSE,
    ON_REGISTERDETAIL_WAITING,
    REGISTERDETAIL_SHADOW_FALSE,
    REGISTERDETAIL_SHOW_IMG_ANDROID,
    REGISTERDETAIL_SHOW_IMG_IOS,    
    REGISTERDETAIL_ERROR_MESSAGE,
    REGISTERDETAIL_FALSE
} from '../../actions/actionTypes/login/registerDetailType';

import { handleActions } from 'redux-actions';

const initState = {
    errorMessage: '',
    img: '',
    nickname: '',
    gender: 3,
    signature: '',
    button: true,
    shadow:false,
    localIos:'',
    localAndroid:''
};

export default handleActions({
    [REGISTERDETAIL_CHANGE_NICKNAME]: {
        next(state, action) {
            return {
                ...state,
                nickname: action.payload
            };
        }
    },
    [REGISTERDETAIL_CHANGE_SIGNATURE]: {
        next(state, action) {
            return {
                ...state,
                signature: action.payload
            };
        }
    }, 
    [REGISTERDETAIL_SET_GENDER]: {
        next(state, action) {
            return {
                ...state,
                gender: action.payload
            };
        }
    },
    [REGISTERDETAIL_BUTTON_TRUE]: {
        next(state, action) {
            return {
                ...state,
                button: true
            };
        }
    },
    [REGISTERDETAIL_BUTTON_FALSE]: {
        next(state, action) {
            return {
                ...state,
                button: false
            };
        }
    },
    [REGISTERDETAIL_ERROR_MESSAGE]: {
        next(state, action) {
            return {
                ...state,
                errorMessage: action.payload
            };
        }
    },
    [REGISTERDETAIL_SHOW_IMG_IOS]: {
        next(state, action) {
            return {
                ...state,
                img: action.payload.img,
                localIos: action.payload.localIos.slice(7)
            };
        }
    },
    [REGISTERDETAIL_SHOW_IMG_ANDROID]: {
        next(state, action) {
            return {
                ...state,
                img: action.payload.img,
                localAndroid: action.payload.localAndroid
            };
        }
    },
    [ON_REGISTERDETAIL_WAITING]: {
        next(state, action) {
            return {
                ...state,
                button: true,
                shadow: true
            };
        }
    },
    [REGISTERDETAIL_SHADOW_FALSE]: {
        next(state, action) {
            return {
                ...state,
                shadow: false
            };
        }
    },
    [REGISTERDETAIL_FALSE]: {
        next(state, action) {
            return {
                ...state,
                errorMessage: '',
                img: '',
                nickname: '',
                gender: 3,
                signature: '',
                shadow: false,
                localIos: '',
                localAndroid: ''
            };
        }
    },
}, initState);
