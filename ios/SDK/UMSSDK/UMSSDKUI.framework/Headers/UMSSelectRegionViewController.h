//
//  UMSSelectRegionViewController.h
//  UMSSDKUI
//
//  Created by 刘靖煌 on 17/2/26.
//  Copyright © 2017年 mob.com. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol IUMSSelectRegionViewControllerDelegate <NSObject>

- (void)selectedAreaCode:(NSString *)areaCode;

@end

@interface UMSSelectRegionViewController : UIViewController

@property (nonatomic, weak) id<IUMSSelectRegionViewControllerDelegate> delegate;

@end
