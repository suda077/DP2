//
//  UMSLoginModuleViewController.h
//  UMSSDKUI
//
//  Created by 刘靖煌 on 17/3/28.
//  Copyright © 2017年 mob.com. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "UMSBaseViewController.h"
#import "UMSLoginViewController.h"

/**
 登录模块主视图控制器
 */
@interface UMSLoginModuleViewController : UMSBaseViewController

/**
 可供自定义的左导航栏按钮
 */
@property (nonatomic, strong) UIBarButtonItem *leftBarButtonItem;

/**
 可供自定义的右导航栏按钮
 */
@property (nonatomic, strong) UIBarButtonItem *rightBarButtonItem;

/**
 登录视图
 */
@property (nonatomic, strong) UMSLoginViewController *loginVC;

/**
 关闭登录页面
 */
- (void)close;

@end
