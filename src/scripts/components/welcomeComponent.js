import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as myActions from '../actions/action/my/myAction';

import SplashScreen from 'react-native-splash-screen';
import ViewUtils from '../utils/ViewUtils';
import { NavigationActions } from 'react-navigation';
import  styles  from '../../styles/welcomeStyle';


class WelcomeComponent extends Component {
    componentDidMount() {
        //获取主题信息
        this.props.getTheme(this.props.navigation.dispatch);

        this.reset = setTimeout(() => {
            //起始图片隐藏
            SplashScreen.hide();
            //Reset重制路由
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'Tab',
                    })
                ],

            })
            this.props.navigation.dispatch(resetAction);

        }, 1000)
    }
    componentWillUnmount() {
        this.reset && clearTimeout(this.reset);
    }
    render() {
        return( 
            <View style={styles.container} >
               {ViewUtils.waitingCodePush()}
            </View>)
    }
}


// //让业务组件和redux建立关联
export default connect(
    state => ({
        // common:state.common
    }),
    dispatch => bindActionCreators(myActions, dispatch)
)(WelcomeComponent);

