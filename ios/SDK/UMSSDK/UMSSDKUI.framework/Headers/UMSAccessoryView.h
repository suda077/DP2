//
//  UMSSettingCell.h
//  UMSSDKUI
//
//  Created by 刘靖煌 on 17/3/16.
//  Copyright © 2017年 mob.com. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UMSAccessoryView : UIView

@property (nonatomic, strong) UIButton *arrow;
@property (nonatomic, strong) UILabel *text;
@property (nonatomic, copy) NSString *title;

-(instancetype)initWithTitle:(NSString *)title;

@end
