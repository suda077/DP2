import {
    Clipboard
} from "react-native";
import {
    CHANGE_BLOG,
    CHANGE_CONTENT,
    CAN_GO_BACK
} from '../../actionTypes/about/aboutType';
import { disabled } from "../commonAction";
import { createAction } from 'redux-actions';
import { FLAG } from "../../../utils/ConstUtils";


export let onClick = (dispatch, navigate, tab) =>
    () => {
        switch (tab) {
            case FLAG.BLOG:
                dispatch({
                    type: CHANGE_BLOG
                })
                break;
            case FLAG.CONTACT:
                dispatch({
                    type: CHANGE_CONTENT
                })
                break;
            case FLAG.BLOG.items.GITHUB:
                disabled(
                    dispatch,
                    400
                )
                navigate('WebSite', {
                    url: tab.url,
                })
                break;
            case FLAG.CONTACT.items.QQ:
                Clipboard.setString(tab.account);
                // this.toast.show('QQ:' + tag.account + '已保存到剪切板', DURATION.LENGTH_SHORT);
                break;
        }
    }
//判断项目页面是否能后退
export let canGoBack = createAction(
    CAN_GO_BACK,(e)=>e.canGoBack
)
