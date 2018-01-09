import {
    NativeModules,
} from "react-native";
import { NavigationActions } from 'react-navigation';
import { DURATION } from 'react-native-easy-toast';
import {
    LOGIN_CHANGE_PHONE,
    LOGIN_CHANGE_PWD,
    LOGIN_BUTTON_TRUE,
    LOGIN_BUTTON_FALSE,
    ON_LOGIN_WAITING,
    LOGIN_SHADOW_FALSE
} from '../../actionTypes/login/loginType';
import { GET_USERDATA } from "../../actionTypes/my/myType";
import { disabled } from "../commonAction";
import { createAction } from 'redux-actions';
import LoginDao from "../../../repository/loginDao";
import ArrayUtils from "../../../utils/ArrayUtils";

//手机号响应
export let onChangePhone = 
    (dispatch,phone,pwd) =>
        new Promise((resolve,reject)=>{
            dispatch({
                type: LOGIN_CHANGE_PHONE,
                payload: phone
            })
            resolve({
                phone: phone,
                pwd: pwd
            })
        })
        .then(res=>{
            if (res.phone.length === 11
                && res.pwd.length >= 6
                && res.pwd.length <= 15 ){
                return{
                    type: LOGIN_BUTTON_FALSE
                }
            }
            return {
                type: LOGIN_BUTTON_TRUE
            }
        })
//密码响应
export let onChangePwd =
    (dispatch, phone, pwd) =>
        new Promise((resolve, reject) => {
            dispatch({
                type: LOGIN_CHANGE_PWD,
                payload: pwd
            })
            resolve({
                phone: phone,
                pwd: pwd
            })
        })
        .then(res => {
            if (res.phone.length === 11
                && res.pwd.length >= 6
                && res.pwd.length <= 15) {
                return {
                    type: LOGIN_BUTTON_FALSE
                }
            }
            return {
                type: LOGIN_BUTTON_TRUE
            }
        })
//登录
export let onLogin = 
    (navigation,toast,country,phone,pwd)=>
        ()=>{
            navigation.dispatch({
                type: ON_LOGIN_WAITING
            })
            NativeModules.UMS.loginWithPhoneNumber(country, phone, pwd,
                data => {
                    let res = ArrayUtils.saveLoginItem(data);

                    // const resetAction = NavigationActions.reset({
                    //     index: 0,
                    //     actions: [
                    //         NavigationActions.navigate({
                    //             routeName: 'Tab'
                    //         })
                    //     ],

                    // })
                    // navigation.dispatch(resetAction)

                    navigation.goBack();

                    navigation.dispatch({
                        type: GET_USERDATA,
                        payload: res
                    })
                    

                },
                (error) => {
                    //去除状态码
                    if (error.indexOf('(') != -1) {
                        error = error.split('(')[0];
                    }
                    toast.show(error, DURATION.LENGTH_SHORT);

                    navigation.dispatch({
                        type: LOGIN_SHADOW_FALSE
                    })
                }
            );	
        }
//第三方登录
export let onLoginWithXX =
    (navigation, toast,num) =>
        () => {
            navigation.dispatch({
                type: ON_LOGIN_WAITING
            })
            NativeModules.UMS.loginWithSocialAccount(
                num,
                data => {
                    let res = ArrayUtils.saveLoginItem(data);

                    navigation.goBack();

                    navigation.dispatch({
                        type: GET_USERDATA,
                        payload: res
                    })

                },
                error => {
                    toast.show(error, DURATION.LENGTH_SHORT);
                }
            )
        }
//忘记密码页面
export let forgetPwd = 
    (dispatch,navigate) => 
        () => {
            navigate('ForgetPwd');
            disabled(dispatch,400)
        }
//注册页面
export let register =
    (dispatch, navigate) =>
        () => {
            navigate('Register');
            disabled(dispatch, 400)
        }
//后退
export let onGoBack = (navigation) =>
    () => {
        navigation.goBack();
    }