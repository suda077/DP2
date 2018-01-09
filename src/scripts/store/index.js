import { compose,createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import getReducers from '../reducers';

export default function getStore(navReducer) {
    return createStore(
        getReducers(navReducer),
        undefined,
        compose(
            applyMiddleware(thunk,promiseMiddleware,logger)
        )
    );
}
