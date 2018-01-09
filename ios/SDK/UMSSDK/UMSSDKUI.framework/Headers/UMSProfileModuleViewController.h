//
//  UMSProfileModuleViewController.h
//  UMSSDKUI
//
//  Created by 刘靖煌 on 17/3/28.
//  Copyright © 2017年 mob.com. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "UMSBaseViewController.h"

/**
 个人信息模块主视图控制器
 */
@interface UMSProfileModuleViewController : UMSBaseViewController

/**
 可供自定义的左导航栏按钮
 */
@property (nonatomic, strong) UIBarButtonItem *leftBarButtonItem;

/**
 可供自定义的右导航栏按钮
 */
@property (nonatomic, strong) UIBarButtonItem *rightBarButtonItem;

@end
