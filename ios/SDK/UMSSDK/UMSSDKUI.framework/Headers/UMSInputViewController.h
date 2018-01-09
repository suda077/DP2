//
//  UMSInputViewController.h
//  UMSSDKUI
//
//  Created by 刘靖煌 on 17/3/14.
//  Copyright © 2017年 mob.com. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol IUMSInputViewControllerDelegate <NSObject>

@optional

- (void)selectFinishWithData:(NSString *)data;

- (void)selectFinishWithData:(NSString *)data type:(id)typetap;

@end

@interface UMSInputViewController : UIViewController

- (instancetype)initWithTitle:(NSString*)title andOldData:(NSString *)oldData;

@property (nonatomic, weak) id<IUMSInputViewControllerDelegate> delegate;

@end
