//
//  UMSAccountBindingViewController.h
//  UMSSDKUI
//
//  Created by 刘靖煌 on 17/3/13.
//  Copyright © 2017年 mob.com. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UMSAccountBindingViewController : UITableViewController

@property (nonatomic, strong) NSArray *supportedPlatform;

- (instancetype)initWithSupportedPlatform:(NSArray *)supportedPlatform;

@end
