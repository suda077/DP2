import {
    ON_IMG_CANCEL,
    ON_IMG_SHOW,
    ON_IMG_LOAD
} from '../../actions/actionTypes/card/cardDetailType';

import { handleActions } from 'redux-actions';

const initState = {
    shadow: 0,
    img: require('../../../images/card/noimg.jpg'),
};

export default handleActions({
    [ON_IMG_SHOW]: {
        next(state, action) {
            return { ...state, shadow: 1 };
        }
    },
    [ON_IMG_CANCEL]: {
        next(state, action) {
            return { ...state, shadow: 0 };
        }
    },
    [ON_IMG_LOAD]: {
        next(state, action) {
            return { ...state, img: action.payload ? action.payload :state.img };
        }
    },
}, initState);
