import {
    ON_CHOICE_RARITY,
    ON_CHOICE_ATTRIBUTE,
    ON_CHOICE_TAG,
    ON_CHOICE_RACE,
} from '../../actionTypes/card/cardChoiceType';
import {
    PAGE_INIT,
    LOADING_FALSE,
} from '../../actionTypes/card/cardLeftType';
import { InteractionManager} from 'react-native';

import { createAction } from 'redux-actions';

//稀有度
export let onChoiceRarity = createAction(
    ON_CHOICE_RARITY,(res)=>{
        return res
    })
//属性
export let onChoiceAttribute = createAction(
    ON_CHOICE_ATTRIBUTE, (res) => {
        return res
    })
//图标
export let onChoiceTag = createAction(
    ON_CHOICE_TAG, (res) => {
        return res
    })
//种族
export let onChoiceRace = createAction(
    ON_CHOICE_RACE, (res) => {
        return res      
    })
//关闭筛选页
export let onDrawerClose = (navigate)=>
    ()=>{
        navigate('DrawerClose');
    }

//重置数据
export let onResetData = (dispatch,navigate) =>
    () => {
        navigate('DrawerClose');
        InteractionManager.runAfterInteractions(() => {
            dispatch({
                type: PAGE_INIT
            });
        })
        let timeout = setTimeout(() => {
            dispatch({ type: LOADING_FALSE });
            timeout && clearTimeout(timeout)
        }, 2000);
    }

