//
//  UMSProfileViewController.h
//  UMSSDKUI
//
//  Created by 刘靖煌 on 17/2/26.
//  Copyright © 2017年 mob.com. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UMSProfileViewController : UITableViewController

/**
 可供自定义的左导航栏按钮
 */
@property (nonatomic, strong) UIBarButtonItem *leftBarButtonItem;

/**
 可供自定义的右导航栏按钮
 */
@property (nonatomic, strong) UIBarButtonItem *rightBarButtonItem;

@end
