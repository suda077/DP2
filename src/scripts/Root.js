import React, { Component } from "react";
import { Platform } from "react-native";
import { Provider, connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";

import getStore from "./store/index";
import { AppNavigator } from './routers/appNavigator';
import codePush from 'react-native-code-push';//导入热更新


//navigation router的reducer, 叫做getStateForAction
const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

const mapStateToProps = (state) => ({
    nav: state.nav
});


class App extends Component {
    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav,
                })}
                screenProps={{showKeyboard:true}}
            />
        );
    }
}


//使app在重启时也能保持更新版本防止数据回滚
const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

let AppWithNavigationState = connect(mapStateToProps)
    (codePush(codePushOptions)(App));

const store = getStore(navReducer);

export default function Root() {
    return (
        <Provider store={store}>
            <AppWithNavigationState />
        </Provider>
    );
}



