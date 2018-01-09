/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "SplashScreen.h"
//导入热更新
#import <CodePush/CodePush.h>

#import <UMSSDKUI/UMSMainTabBarController.h>

#import <ShareSDK/ShareSDK.h>
#import <ShareSDKConnector/ShareSDKConnector.h>

//腾讯开放平台（对应QQ和QQ空间）SDK头文件
#import <TencentOpenAPI/TencentOAuth.h>
#import <TencentOpenAPI/QQApiInterface.h>

//微信SDK头文件
#import "WXApi.h"

//新浪微博SDK头文件
#import "WeiboSDK.h"


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
 
  
  /**初始化ShareSDK应用
   
   @param activePlatforms
   使用的分享平台集合
   @param importHandler (onImport)
   导入回调处理，当某个平台的功能需要依赖原平台提供的SDK支持时，需要在此方法中对原平台SDK进行导入操作
   @param configurationHandler (onConfiguration)
   配置回调处理，在此方法中根据设置的platformType来填充应用配置信息
   */
  [ShareSDK registerActivePlatforms:@[
                                      @(SSDKPlatformTypeSinaWeibo),
                                      @(SSDKPlatformTypeWechat),
                                      @(SSDKPlatformTypeQQ),
                                      ]
                           onImport:^(SSDKPlatformType platformType)
   {
     switch (platformType)
     {
       case SSDKPlatformTypeWechat:
         [ShareSDKConnector connectWeChat:[WXApi class]];
         break;
       case SSDKPlatformTypeQQ:
         [ShareSDKConnector connectQQ:[QQApiInterface class] tencentOAuthClass:[TencentOAuth class]];
         break;
       case SSDKPlatformTypeSinaWeibo:
         [ShareSDKConnector connectWeibo:[WeiboSDK class]];
         break;
         
       default:
         break;
     }
   }
   onConfiguration:^(SSDKPlatformType platformType, NSMutableDictionary *appInfo)
   {
     
     switch (platformType)
     {
       case SSDKPlatformTypeSinaWeibo:
         //设置新浪微博应用信息,其中authType设置为使用SSO＋Web形式授权
         [appInfo SSDKSetupSinaWeiboByAppKey:@"305496667"
                                   appSecret:@"eb0fb10c525809761c445df88bd71ca3"
                                 redirectUri:@"http://www.sharesdk.cn"
                                    authType:SSDKAuthTypeBoth];
         break;
       case SSDKPlatformTypeWechat:
         [appInfo SSDKSetupWeChatByAppId:@"wxb05fd5b436d00743"
                               appSecret:@"4e656dc8724dd78ba81b8c2fdd844787"];
         break;
       case SSDKPlatformTypeQQ:
         [appInfo SSDKSetupQQByAppId:@"1106338167"
                              appKey:@"egMaBAs9q1T2CnKI"
                            authType:SSDKAuthTypeBoth];
         break;
       default:
         break;
     }
   }];
  
  
  
  
  
  
  
  NSURL *jsCodeLocation;
  
//  #ifdef DEBUG
//
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
//
//  #else

//  jsCodeLocation = [CodePush bundleURL];

//  #endif
  

//  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  
  //告诉rn从打包的bundle文件夹查找js文件
//  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"bundle/index.ios" withExtension:@"jsbundle"];


  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"DP2"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  
  self.window.rootViewController = rootViewController;
  
//  self.window.rootViewController = [[UMSMainTabBarController alloc] init];
//  [self.window setBackgroundColor:[UIColor whiteColor]];
  
  
  [SplashScreen show];
  
  [self.window makeKeyAndVisible];
  

  return YES;
}

@end
