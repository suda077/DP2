import React, { Component } from 'react';
import { Dimensions} from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom, DrawerNavigator} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

import ViewUtils from "../utils/ViewUtils";

import WelcomeComponent from '../components/welcomeComponent';
import DrawComponent from '../components/draw/drawComponent';
import CardDetailComponent from '../components/card/cardDetailComponent';
import CardLeftComponent from '../components/card/cardLeftComponent';
import CardChoiceComponent from '../components/card/cardChoiceComponent';
import SearchComponent from '../components/search/searchComponent';
import AboutAuthorComponent from '../components/about/aboutAuthorComponent';
import MyComponent from '../components/my/myComponent';
import WebSiteComponent from '../components/about/webSiteComponent';
import LoginComponent from '../components/login/loginComponent';
import ForgetPwdComponent from '../components/login/forgetPwdComponent';
import RegisterComponent from '../components/login/registerComponent';



const Drawer = DrawerNavigator(
    {
        CardLeft: {
            screen: CardLeftComponent
        }
    },
    {
        // drawerWidth: Dimensions.get('window').width,//获取屏幕宽度
        drawerPosition: 'right', // 抽屉在左边还是右边
        contentOptions: {
            activeItemKey: 'Notifications',
            onItemPress: (route) => {
                alert(route)
            },
        },

        contentComponent: props => {
            return (
                <CardChoiceComponent 
                    {...props}
                />
            )
        },
    }
)

const Tab = TabNavigator(
    {
        Draw: {
            screen: DrawComponent,
            navigationOptions: ({ navigation }) => ({
                title: '偷渡欧洲(。・`ω´・)',
                tabBarLabel: '抽卡',
                tabBarIcon: ({ focused, tintColor }) => (
                    ViewUtils.tabBarItem(require('../../images/ic_card.png'), tintColor)
                ),
                header: null,//隐藏顶部导航栏
            }),
        },
        Card: {
            screen: Drawer,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '图鉴',
                tabBarIcon: ({ focused, tintColor }) => (
                    ViewUtils.tabBarItem(require('../../images/ic_cardbox.png'), tintColor)
                ),
                header: null,//隐藏顶部导航栏
            }),
        },
        Search: {
            screen: SearchComponent,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '搜索',
                tabBarIcon: ({ focused, tintColor }) => (
                    ViewUtils.tabBarItem(require('../../images/ic_search.png'), tintColor)
                ),
                header: null,//隐藏顶部导航栏
                // tabBarVisible: false
            }),
        },
        My: {
            screen: MyComponent,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '我的',
                tabBarIcon: ({ focused, tintColor }) => (
                    ViewUtils.tabBarItem(require('../../images/ic_my.png'), tintColor)
                ),
                header: null,//隐藏顶部导航栏
            }),
        },
    },

    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#9E9E9E',
            inactiveTintColor: '#cdcdcd',
            style: {
                backgroundColor: '#fff',
                overflow:'hidden',
                
            },
            labelStyle: {
                fontSize: 12, // 文字大小  
            },

        },
        initialRouteName: 'Card', //默认显示页面
    });

const AppNavigator = StackNavigator(
    {
        Welcome: { 
            screen: WelcomeComponent,
            navigationOptions:{
                header:null
            }
        },
        Tab: {
            screen: Tab,
            //适用于其他app或浏览器使用url打开本app并进入指定页面
            // path: 'HomePage',
        },
        CardDetail:{
            screen: CardDetailComponent
        },
        AboutAuthor:{
            screen: AboutAuthorComponent,
            navigationOptions: {
                header: null
            }
        },
        WebSite: {
            screen: WebSiteComponent,
            navigationOptions: {
                header: null
            }
        },
        Login: {
            screen: LoginComponent,
            navigationOptions: {
                header: null
            }
        },
        ForgetPwd: {
            screen: ForgetPwdComponent,
            navigationOptions: {
                header: null
            }
        },
        Register: {
            screen: RegisterComponent,
            navigationOptions: {
                header: null
            }
        },
    },
    {
        navigationOptions: {
            headerBackTitle: null,
            headerTintColor: '#fff',
            showIcon: true,
            swipeEnabled: false,
            animationEnabled: false,
            headerTitleStyle: {
                alignSelf: 'center'
            },
            headerStyle: {
                // backgroundColor: this.state.theme.themeColor
            },
            gesturesEnabled: true,
        },
        mode: 'draw',
        //页面切换动画
        transitionConfig: () => ({
            //screenInterpolator: CardStackStyleInterpolator.forVertical,//上下
            screenInterpolator: CardStackStyleInterpolator.forHorizontal,//左右
        }),
    });

export {
    AppNavigator
};
