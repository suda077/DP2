import {
    Platform
} from 'react-native'
//卡片服务器地址前缀
export const CARD_URL = 'http://dorapo-gatya.soccer-bar.com/img/card/thumb/th_normal_';
//状态栏高度
export const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
export const NAV_BAR_HEIGHT_ANDROID = 50;
export const NAV_BAR_HEIGHT_IOS = 44;
export const MAIL_TO = 'mailto://1720137380@qq.com';
//更多菜单
export const MORE_MENU = {
    About_Author: 'About Author',//关于作者
    Custom_Theme: 'Custom Theme',//主题
    FeedBack: 'Feedback',//反馈
    Update: 'Update',//更新
    Login: 'Login'//登录
}
//主题
export const ThemeFlags = {
    Default: '#303537',
    Red: '#F44336',
    Pink: '#E91E63',
    Purple: '#9C27B0',
    DeepPurple: '#673AB7',
    Indigo: '#3F51B5',
    Blue: '#2196F3',
    LightBlue: '#03A9F4',
    Cyan: '#00BCD4',
    Teal: '#009688',
    Green: '#4CAF50',
    LightGreen: '#8BC34A',
    Lime: '#CDDC39',
    Yellow: '#6353ef',
    Amber: '#FFC107',
    Orange: '#FF9800',
    DeepOrange: '#FF5722',
    Brown: '#795548',
    Grey: '#9E9E9E',
    BlueGrey: '#607D8B',
    White: '#f4e3'
}
//github项目地址
const GIT_HUB = 'https://github.com/suda077/DP2';
//qq
const QQ = '1720137380';
//作者界面
export const FLAG = {
    BLOG: {
        name: '项目地址',
        items: {
            GITHUB: {
                title: 'GitHub',
                url: GIT_HUB,
            },
        }
    },
    CONTACT: {
        name: '联系方式',
        items: {
            QQ: {
                title: 'QQ',
                account: QQ,
            },
        }
    },
}