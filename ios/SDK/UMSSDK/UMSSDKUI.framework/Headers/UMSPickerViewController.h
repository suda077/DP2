//
//  UMSPickerViewController.h
//  UMSSDKUI
//
//  Created by 刘靖煌 on 17/2/27.
//  Copyright © 2017年 mob.com. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef enum{
    UMSPickerViewTypeGender = 1,
    UMSPickerViewTypeRegion = 2,
    UMSPickerViewTypeBirthday = 3,
    UMSPickerViewTypeConstellation = 4,
    UMSPickerViewTypeZodiac = 5,
    UMSPickerViewTypeAge = 6,
} UMSPickerViewType;

@protocol IUMSPickerViewControllerDelegate <NSObject>

- (void)selectOKWithData:(id)data;

- (void)selectCancel;

@end

@interface UMSPickerViewController : UIViewController

@property (nonatomic, weak) id<IUMSPickerViewControllerDelegate> delegate;

- (instancetype)initWithType:(UMSPickerViewType)type;

@end
