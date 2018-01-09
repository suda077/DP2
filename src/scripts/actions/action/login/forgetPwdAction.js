import {
    NativeModules,
} from "react-native";
import { NavigationActions } from 'react-navigation';
import { DURATION } from 'react-native-easy-toast';
import {
    FORGETPWD_CHANGE_PHONE,
    FORGETPWD_CHANGE_VCODE,
    FORGETPWD_CHANGE_PWD,
    FORGETPWD_BUTTON_TRUE,
    FORGETPWD_BUTTON_FALSE,
    FORGETPWD_VCODE_TRUE,
    FORGETPWD_VCODE_FALSE,
    FORGETPWD_VCODE_RESET,
    FORGETPWD_VCODE_COUNTDOWN,
    ON_FORGETPWD_WAITING,
    FORGETPWD_SHADOW_FALSE,
    FORGETPWD_RESET
} from '../../actionTypes/login/forgetPwdType';
import { createAction } from 'redux-actions';


let timer;
//手机号响应
export let onChangePhone =
    (dispatch, phone, vcode, pwd, isSendVcode) =>
        new Promise((resolve, reject) => {
            dispatch({
                type: FORGETPWD_CHANGE_PHONE,
                payload: phone
            })
            resolve({
                phone: phone,
                vcode: vcode,
                pwd: pwd,
                isSendVcode: isSendVcode
            })
        })
        .then(res => {
            if (res.phone.length === 11
                && res.vcode.length ===4
                && res.pwd.length >= 6
                && res.pwd.length <= 15
                && res.isSendVcode
            ) {
                return {
                    type: FORGETPWD_BUTTON_FALSE
                }
            }
            return {
                type: FORGETPWD_BUTTON_TRUE
            }
        })
//密码响应
export let onChangePwd =
    (dispatch, phone, vcode, pwd, isSendVcode) =>
        new Promise((resolve, reject) => {
            dispatch({
                type: FORGETPWD_CHANGE_PWD,
                payload: pwd
            })
            resolve({
                phone: phone,
                vcode: vcode,
                pwd: pwd,
                isSendVcode: isSendVcode
            })
        })
        .then(res => {
            if (res.phone.length === 11
                && res.vcode.length === 4
                && res.pwd.length >= 6
                && res.pwd.length <= 15
                && res.isSendVcode
            ) {
                return {
                    type: FORGETPWD_BUTTON_FALSE
                }
            }
            return {
                type: FORGETPWD_BUTTON_TRUE
            }
        })
//验证码响应
export let onChangeVcode = 
    (dispatch, phone, vcode, pwd, isSendVcode) =>
        new Promise((resolve, reject) => {
            dispatch({
                type: FORGETPWD_CHANGE_VCODE,
                payload: vcode
            })
            resolve({
                phone: phone,
                vcode: vcode,
                pwd: pwd,
                isSendVcode: isSendVcode
            })
        })
        .then(res => {
            if (res.phone.length === 11
                && res.vcode.length === 4
                && res.pwd.length >= 6
                && res.pwd.length <= 15
                && res.isSendVcode
            ) {
                return {
                    type: FORGETPWD_BUTTON_FALSE
                }
            }
            return {
                type: FORGETPWD_BUTTON_TRUE
            }
        })

//发送验证码
export let sendVcode = 
    (dispatch, country, phone, timeout, toast)=>
        ()=>{
            // 修改状态写在发送器之前
            dispatch({
                type: FORGETPWD_VCODE_TRUE
            })
            NativeModules.UMS.sendVerifyCodeForResetPassword(
                country,
                phone,
                (res) => { 
                    toast.show('验证码发送成功', DURATION.LENGTH_LONG)
                    timer = setInterval(() => {
                        if (timeout > 1) {
                            dispatch({
                                type: FORGETPWD_VCODE_COUNTDOWN
                            });
                            timeout--;
                        } else {
                            clearInterval(timer);
                            dispatch({
                                type: FORGETPWD_VCODE_RESET
                            })
                        }
                    }, 1000)

                },
                (error) => { 
                    //去除状态码
                    if (error.indexOf('(') != -1) {
                        error = error.split('(')[0];
                    }
                    toast.show(error, DURATION.LENGTH_LONG);

                    dispatch({
                        type: FORGETPWD_VCODE_FALSE
                    })
                    return;
                }
            )
        }
//保存数据
export let onSave = 
    (navigation, country, phone, vcode, pwd, toast)=>
        ()=>{
            navigation.dispatch({
                type: ON_FORGETPWD_WAITING
            })
            let regex = /^[A-Za-z0-9_]{6,15}$/g;
            if (pwd.match(regex) === null) {
                toast.show('密码格式请使用字母/数字/下划线', DURATION.LENGTH_LONG);
                navigation.dispatch({
                    type: FORGETPWD_SHADOW_FALSE
                })
                return;
            } 
            NativeModules.UMS.resetPasswordWithPhoneNumber(
                country,
                phone,
                vcode,
                pwd,
                (res) => {
                    toast.show('修改成功', DURATION.LENGTH_LONG);
                    clearInterval(timer);
                    navigation.goBack();
                    navigation.dispatch({
                        type: FORGETPWD_RESET
                    })
                },
                (error) => {
                    if (error.indexOf('(') != -1) {
                        error = error.split('(')[0];
                    }
                    toast.show(error, DURATION.LENGTH_LONG);
                    navigation.dispatch({
                        type: FORGETPWD_SHADOW_FALSE
                    })
                }
            )
        }
//后退
export let onGoBack = (navigation) =>
    () => {
        navigation.goBack();
    }
