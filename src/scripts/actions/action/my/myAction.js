import { 
    NativeModules,
    Linking,
    Alert
 } from "react-native";
import {
    LOGIN_RESULT,
    THEME_TRUE,
    GET_USERDATA,
    LOG_OUT,
    ERROR_MESSAGE,
    ON_CODEPUSH_WAITING,
    MY_SHADOW_FALSE
} from '../../actionTypes/my/myType';
import {
    THEME_SET,
} from '../../actionTypes/commonType';
import { disabled } from "../commonAction";
import { createAction } from 'redux-actions';
import LoginDao from "../../../repository/loginDao";
import ThemeDao from "../../../repository/ThemeDao";
import { MAIL_TO, MORE_MENU } from "../../../utils/ConstUtils";
import codePush from 'react-native-code-push';//导入热更新


export let pageInit = (dispatch)=>
    ()=>{
        new LoginDao('dp').getLoginKeys()
            .then(result => {
                dispatch({
                    type: GET_USERDATA,
                    payload: result
                })
            })
            .catch(error=>{
                dispatch({
                    type: ERROR_MESSAGE,
                    payload: error
                })
            }) 
    };

export let onClick = (dispatch,navigate,tab)=>
    ()=>{
        // TargetComponent:跳转页面
        // params：传递属性
        let TargetComponent, params = { menuType: tab }
        switch (tab) {
            //自定义主题
            case MORE_MENU.Custom_Theme:
                disabled(dispatch, 200, { type: THEME_TRUE})
                break;
            //反馈
            case MORE_MENU.FeedBack:
                Linking.canOpenURL(MAIL_TO).then(supported => {
                    if (!supported) {
                        // console.log('未能处理url地址' + MAIL_TO);
                    } else {
                        return Linking.openURL(MAIL_TO);
                    }
                }).catch(err => {
                    //console.error('错误信息:', err)
                });
                break;
            //检查更新
            case MORE_MENU.Update:
                dispatch({ type: ON_CODEPUSH_WAITING})
                codePush.checkForUpdate()//判断是否有更新包
                    .then((update) => {
                        if (update) {
                            // dispatch({ type: MY_SHADOW_FALSE })
                            codePush.sync({
                                updateDialog: {
                                    appendReleaseDescription: true,//是否更新描述，默认false
                                    descriptionPrefix: '\r\n更新内容:\r\n',//更新说明的前缀
                                    title: '发现新版本',//标题
                                    mandatoryContinueButtonLabel: '立即更新',//强制更新时的按钮文字
                                    mandatoryUpdateMessage: '新的更新包',//强制更新时的通知

                                    optionalIgnoreButtonLabel: '取消', //非强制更新时，取消按钮文字. 
                                    optionalInstallButtonLabel: '更新', //非强制更新时，确认文字. 
                                    optionalUpdateMessage: '需要更新么？', //非强制更新时，更新通知. 
                                },
                                // updateDialog:null,
                                installMode: codePush.InstallMode.IMMEDIATE,//非强制更新启动模式三种：ON_NEXT_RESUME程序在前台，并没有从后台切换到前台的情况下、ON_NEXT_RESTART下次启动安装、IMMEDIATE立即启动
                                mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,//强制更新启动模式
                                // deploymentKey: CODE_PUSH_PRODUCTION_KEY,//指定你要查询更新的部署秘钥，默认情况下该值来自于Info.plist(Ios)和MianActivity.java(Android)文件，你可以通过设置该属性来动态查询不同部署key下的更新。
                            });
                            //APP重启后,防止数据回滚
                            codePush.notifyApplicationReady();
                        } else {
                            dispatch({ type: MY_SHADOW_FALSE })
                            Alert.alert(
                                '提示',
                                '已是最新版本',
                                [
                                    { text: '确定', onPress: () => { } },
                                ],
                                { cancelable: false }
                            )
                        }
                    });  

                break;
            //关于作者
            case MORE_MENU.About_Author:
                disabled(dispatch, 200)            
                TargetComponent = 'AboutAuthor';
                break;
            //登录
            case MORE_MENU.Login:
                disabled(dispatch, 200)            
                TargetComponent = 'Login';
                break;
        }
        if (TargetComponent) {
            navigate(TargetComponent, params)
        }
    }
//设置主题颜色
export let themeFalse = createAction(
    THEME_SET,(theme)=>{
        new ThemeDao('dp').saveTheme(theme);
        return theme;
    }
)
//获取主题颜色
export let getTheme = (dispatch)=>
    () => {
        new ThemeDao('dp').getTheme()
        .then(res=>
            dispatch({
                type: THEME_SET,
                payload: res
            })
        )
    }
//注销
export let logOut = 
    (dispatch) => 
        ()=>{
            NativeModules.UMS.logout(
                (res) => {
                    new LoginDao('dp').removeLoginItem();
                    dispatch({
                        type: LOG_OUT
                    })
                },
                (error) => {
                    new LoginDao('dp').removeLoginItem();
                    dispatch({
                        type: ERROR_MESSAGE,
                        payload: error
                    })
                }

            )
        }