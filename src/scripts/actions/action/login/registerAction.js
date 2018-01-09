import {
    NativeModules,
} from "react-native";
import { DURATION } from 'react-native-easy-toast';
import {
    REGISTER_CHANGE_PHONE,
    REGISTER_CHANGE_VCODE,
    REGISTER_CHANGE_PWD,
    REGISTER_BUTTON_TRUE,
    REGISTER_BUTTON_FALSE,
    REGISTER_VCODE_TRUE,
    REGISTER_VCODE_FALSE,
    REGISTER_VCODE_RESET,
    REGISTER_VCODE_COUNTDOWN,
    ON_REGISTER_WAITING,
    REGISTER_SHADOW_FALSE,
    REGISTERDETAIL_TRUE
} from '../../actionTypes/login/registerType';
import { GET_USERDATA } from "../../actionTypes/my/myType";
import { createAction } from 'redux-actions';
import LoginDao from "../../../repository/loginDao";
import ArrayUtils from "../../../utils/ArrayUtils";


let timer;
//手机号响应
export let onChangePhone =
    (dispatch, phone, vcode, pwd, isSendVcode) =>
        new Promise((resolve, reject) => {
            dispatch({
                type: REGISTER_CHANGE_PHONE,
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
                && res.vcode.length === 4
                && res.pwd.length >= 6
                && res.pwd.length <= 15
                && res.isSendVcode
            ) {
                return {
                    type: REGISTER_BUTTON_FALSE
                }
            }
            return {
                type: REGISTER_BUTTON_TRUE
            }
        })
//密码响应
export let onChangePwd =
    (dispatch, phone, vcode, pwd, isSendVcode) =>
        new Promise((resolve, reject) => {
            dispatch({
                type: REGISTER_CHANGE_PWD,
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
                    type: REGISTER_BUTTON_FALSE
                }
            }
            return {
                type: REGISTER_BUTTON_TRUE
            }
        })
//验证码响应
export let onChangeVcode = 
    (dispatch, phone, vcode, pwd, isSendVcode) =>
        new Promise((resolve, reject) => {
            dispatch({
                type: REGISTER_CHANGE_VCODE,
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
                    type: REGISTER_BUTTON_FALSE
                }
            }
            return {
                type: REGISTER_BUTTON_TRUE
            }
        })

//发送验证码
export let sendVcode = 
    (dispatch, country, phone, timeout, toast)=>
        ()=>{
            // 修改状态写在发送器之前
            dispatch({
                type: REGISTER_VCODE_TRUE
            })
            NativeModules.UMS.sendVerifyCodeForRegitser(
                country,
                phone,
                (res) => { 
                    toast.show('验证码发送成功', DURATION.LENGTH_LONG)
                    timer = setInterval(() => {
                        if (timeout > 1) {
                            dispatch({
                                type: REGISTER_VCODE_COUNTDOWN
                            });
                            timeout--;
                        } else {
                            clearInterval(timer);
                            dispatch({
                                type: REGISTER_VCODE_RESET
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
                        type: REGISTER_VCODE_FALSE
                    })
                    return;
                }
            )
        }
//保存数据
export let onSave =
    (navigation, country, phone, vcode, pwd, toast) =>
        () => {
            navigation.dispatch({
                type: ON_REGISTER_WAITING
            })
            let regex = /^[A-Za-z0-9_]{6,15}$/g;
            if (pwd.match(regex) === null) {
                toast.show('密码格式请使用字母/数字/下划线', DURATION.LENGTH_LONG);
                navigation.dispatch({
                    type: REGISTER_SHADOW_FALSE
                })
                return;
            }
            NativeModules.UMS.registerWithPhoneNumber(
                country,
                phone,
                vcode,
                pwd,
                {
                    nickname: "用户" + Math.round(Math.random() * 1000 + 1000),//1000~2000随机数
                    signature: "这家伙很懒，什么都没写哦~"
                },
                (data) => {
                    toast.show('注册成功', DURATION.LENGTH_LONG);
                    clearInterval(timer);
                    let res = ArrayUtils.saveLoginItem(data);

                    navigation.dispatch({
                        type: REGISTERDETAIL_TRUE,
                        payload: res
                    })
                },
                (error) => {
                    if (error.indexOf('(') != -1) {
                        error = error.split('(')[0];
                    }
                    toast.show(error, DURATION.LENGTH_LONG);
                    navigation.dispatch({
                        type: REGISTER_SHADOW_FALSE
                    })
                }
            )

        }
//后退
export let onGoBack = (navigation) =>
    () => {
        navigation.goBack();
    }
