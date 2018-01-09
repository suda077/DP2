import {
    CHANGE_BLOG,
    CHANGE_CONTENT,
    CAN_GO_BACK
} from '../../actions/actionTypes/about/aboutType';

import { handleActions } from 'redux-actions';

const initState = {
    // 初始状态不展开
    showBlog: false,
    showContent: false,
    canGoBack: false,//判断项目页面是否能后退
};

export default handleActions({
    [CHANGE_BLOG]: {
        next(state, action) {
            return { ...state, showBlog: !state.showBlog };
        }
    },
    [CHANGE_CONTENT]: {
        next(state, action) {
            return { ...state, showContent: !state.showContent };
        }
    },
    [CAN_GO_BACK]: {
        next(state, action) {
            return { ...state, canGoBack: action.payload };
        }
    },
}, initState);
