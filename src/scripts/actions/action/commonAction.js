import { 
    DISABLED_FALSE, 
    DISABLED_TRUE, 
    GO_BACK
} from '../actionTypes/commonType';
import { createAction } from 'redux-actions';

//防止重复点击
export let disabled = (dispatch, timer, obj)=>{
    // let extend = disabledExtend ? disabledExtend :false;
    // let extendTimer = timerExtend ? timerExtend :200;
    dispatch({ type: DISABLED_TRUE });
    let timeout = setTimeout(() => {
        obj && dispatch(obj);
        let timeouter = setTimeout(() => { 
            dispatch({ type: DISABLED_FALSE })
            timeouter && clearTimeout(timeouter)       
        }, timer + 200); 
        timeout && clearTimeout(timeout)
    }, timer);
}
export let goBack = createAction(
    GO_BACK,
    (navigation) => {
        navigation.goBack();
        return true;
    }
)
