import {
    NativeModules,
    Platform
} from "react-native";
import { NavigationActions } from 'react-navigation';
import { DURATION } from 'react-native-easy-toast';
import {
    REGISTERDETAIL_CHANGE_NICKNAME,
    REGISTERDETAIL_CHANGE_SIGNATURE,
    REGISTERDETAIL_SET_GENDER,
    REGISTERDETAIL_SHOW_IMG_ANDROID,
    REGISTERDETAIL_SHOW_IMG_IOS,    
    REGISTERDETAIL_BUTTON_TRUE,
    REGISTERDETAIL_BUTTON_FALSE,
    ON_REGISTERDETAIL_WAITING,
    REGISTERDETAIL_SHADOW_FALSE,
    REGISTERDETAIL_ERROR_MESSAGE,
    REGISTERDETAIL_FALSE
} from '../../actionTypes/login/registerDetailType';
import { createAction } from 'redux-actions';
import LoginDao from "../../../repository/loginDao";
import ArrayUtils from "../../../utils/ArrayUtils";
import ImagePicker from 'react-native-image-picker'; 

let timer;
//底部弹出框选项
const photoOptions = {
    title: '选择头像',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '从手机相册中选择',
    quality: 0.75,
    allowsEditing: true,
    noData: false,
    cameraType: 'back',
    mediaType: 'photo',
    videoQuality: 'high',
    maxWidth: 600,
    maxHeight: 600,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
}

//昵称响应
export let onChangeNickname =
    (dispatch, img, nickname, signature, gender) =>
        new Promise((resolve, reject) => {
            dispatch({
                type: REGISTERDETAIL_CHANGE_NICKNAME,
                payload: nickname
            })
            resolve({
                img: img,
                nickname: nickname,
                signature: signature,
                gender: gender
            })
        })
        .then(res => {
            if (res.img !== ''
                || res.nickname.length > 1
                || res.signature.length > 0
                || res.gender !== 3
            ) {
                return {
                    type: REGISTERDETAIL_BUTTON_FALSE
                }
            }
            return {
                type: REGISTERDETAIL_BUTTON_TRUE
            }
        })
//签名响应
export let onChangeSinature =
    (dispatch, img, nickname, signature, gender) =>
        new Promise((resolve, reject) => {
            dispatch({
                type: REGISTERDETAIL_CHANGE_SIGNATURE,
                payload: signature
            })
            resolve({
                img: img,
                nickname: nickname,
                signature: signature,
                gender: gender
            })
        })
        .then(res => {
            if (res.img !== ''
                || res.nickname.length > 1
                || res.signature.length > 0
                || res.gender !== 3
            ) {
                return {
                    type: REGISTERDETAIL_BUTTON_FALSE
                }
            }
            return {
                type: REGISTERDETAIL_BUTTON_TRUE
            }
        })
//设置性别
export let setGender = 
    (dispatch, img, nickname, signature, gender) =>
        new Promise((resolve, reject) => {
            dispatch({
                type: REGISTERDETAIL_SET_GENDER,
                payload: gender
            })
            resolve({
                img: img,
                nickname: nickname,
                signature: signature,
                gender: gender
            })
        })
            .then(res => {
                if (res.img !== ''
                    || res.nickname.length > 1
                    || res.signature.length > 0
                    || res.gender !== 3
                ) {
                    return {
                        type: REGISTERDETAIL_BUTTON_FALSE
                    }
                }
                return {
                    type: REGISTERDETAIL_BUTTON_TRUE
                }
            })
//上传头像
export let onChoiceImg =
    (dispatch, nickname, signature, gender) =>
        new Promise((resolve, reject) => {
            ImagePicker.showImagePicker(photoOptions, (response) => {
                if (response.didCancel) {
                    dispatch({
                        type: REGISTERDETAIL_ERROR_MESSAGE,
                        payload: '用户取消操作'
                    })
                }
                else if (response.error) {
                    dispatch({
                        type: REGISTERDETAIL_ERROR_MESSAGE,
                        payload: 'ImagePicker错误: ' + response.error
                    })
                }
                else if (response.customButton) {
                    dispatch({
                        type: REGISTERDETAIL_ERROR_MESSAGE,
                        payload: 'User tapped custom button: ' + response.customButton
                    })
                }
                else {
                    let source = { uri: response.uri };
                    if (Platform.OS === 'android') {
                        NativeModules.UMS.uploadAvatar(
                            response.uri.slice(7),  //去除file文件头   
                            (res) => {
                                //获取头像avatar
                                let str = res.slice(1, res.length - 1);
                                let result = {
                                    localAndroid: str.split(','),
                                    img: source
                                }
                                dispatch({
                                    type: REGISTERDETAIL_SHOW_IMG_ANDROID,
                                    payload: result
                                })
                                
                                resolve({
                                    img: source,
                                    nickname: nickname,
                                    signature: signature,
                                    gender: gender
                                })
   
                            },
                            (error) => {}
                        )
                    } else {
                        let result = {
                            localIos: response.uri,
                            img: source
                        }

                        dispatch({
                            type: REGISTERDETAIL_SHOW_IMG_IOS,
                            payload: result
                        })

                        resolve({
                            img: source,
                            nickname: nickname,
                            signature: signature,
                            gender: gender
                        })

                    }
                }
            })
        }).then(res=>{
            if (res.img !== ''
                || res.nickname.length > 1
                || res.signature.length > 0
                || res.gender !== 3
            ) {
                return {
                    type: REGISTERDETAIL_BUTTON_FALSE
                }
            }
            return {
                type: REGISTERDETAIL_BUTTON_TRUE
            }
        })


//保存数据
export let onSaveDetail =
    (navigation, data, localAndroid) =>
        () => {
            navigation.dispatch({
                type: ON_REGISTERDETAIL_WAITING
            })
            //更新数据
            NativeModules.UMS.updateUserInfo(
                data,
                (res) => {
                    new LoginDao('dp').getLoginKeys()
                        .then(result => {
                            if (Platform.OS === 'android' && localAndroid) {
                                //获取头像avatar
                                result['avatar'] = localAndroid;
                                result["nickname"] = data['nickname'];
                                result["gender"] = data['gender'];
                                result["signature"] = data['signature'];
                            } else {
                                result['avatar'] = res['avatar'];
                                result["nickname"] = res['nickname'];
                                result["gender"] = res['gender'];
                                result["signature"] = res['signature'];
                            }
                            
                            new LoginDao('dp').saveLoginItem(JSON.stringify(result));

                            navigation.dispatch({
                                type: REGISTERDETAIL_FALSE,
                                payload: result
                            })

                            timer = setTimeout(() => {  
                                clearTimeout(timer); 
                                //Reset重制路由
                                const resetAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({
                                            routeName: 'Tab',
                                        })
                                    ],

                                })
                                navigation.dispatch(resetAction);
                            }, 0);

                        })
                        .catch(error => {
                            navigation.dispatch({
                                type: REGISTERDETAIL_SHADOW_FALSE
                            })
                        })

                },
                error => {
                    navigation.dispatch({
                        type: REGISTERDETAIL_SHADOW_FALSE
                    })
                }
            )

        }
