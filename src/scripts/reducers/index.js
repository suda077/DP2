import { combineReducers } from 'redux';


import draw from './draw/drawReducer';
import cardDetail from './card/cardDetailReducer';
import cardLeft from './card/cardLeftReducer';
import search from './search/searchReducer';
import my from './my/myReducer';
import about from './about/aboutReducer';
import login from './login/loginReducer';
import forgetPwd from './login/forgetPwdReducer';
import register from './login/registerReducer';
import registerDetail from './login/registerDetailReducer';
import common from './commonReducer';


//和导航相关的reducer通过从调用出传递进来
export default function getReducers(navReducer) {
    return combineReducers({  
        draw,   
        cardLeft,
        cardDetail,
        search,
        my,
        about,
        login,
        forgetPwd,
        register,
        registerDetail,
        common,  
        nav: navReducer
    });
}
